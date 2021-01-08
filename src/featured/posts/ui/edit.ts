import { customElement, html, LitElement, property, query } from 'lit-element'
import { countErrors, notify, serializeForm } from '../../../utils/utils'
import { general } from '../../../styles/general'
import { Post } from '../domain/post'
import { PostRepositoryFactory } from '../infrastructure/post-repository-factory'
import { ImageHttpService } from '../../images/infrastructure/image-http-service'
import { emptyPost } from '../../shared/emptyObjects'
import { Router } from '@vaadin/router'
import { adminStyles } from '../../../styles/admin-styles'
import { Category } from '../../categories/domain/category'
import { CategoryRepositoryFactory } from '../../categories/infrastructure/category-repository-factory'
import { this_styles } from './form-styles'

@customElement('post-form-c')
export class PostForm extends LitElement {
  private postRepository = PostRepositoryFactory.build()
  private categoryRepositoy = CategoryRepositoryFactory.build()
  private imageService = new ImageHttpService()
  @property({ type: Object })
  values: Partial<Post> = Object.create(emptyPost)
  @property({ type: Object })
  initialValues: Partial<Post> = Object.create(emptyPost)
  @property({ type: Boolean }) edit = false
  @property() imgData = ''
  @property({ type: String }) imgName = ''
  @property({ type: String }) id = ''
  @property({ type: Number }) counterUpdated = 0
  @property() catsDisp: Partial<Category>[] = [] as Partial<Category>[]
  @property({ type: String }) validityError = ''

  @query('#switcher') switcher: HTMLElement | undefined

  public static styles = [general, adminStyles, this_styles]
  render() {
    return html`
      <h1>
        Post: ${this.values.title}
        ${this.id
          ? html`
              <style>
                button-c {
                  float: right;
                }
              </style>
              <button-c
                size="small"
                @click="${() => {
                  Router.go(`/${this.values.title}?id=${this.id}`)
                }}"
                >Ver Post</button-c
              >
            `
          : null}
      </h1>
      <form-container-c class="transparent" size="large">
        <form
          @submit="${(e: any) => {
            this.handleSubmit(e)
          }}"
          id="post-form"
        >
          <div class="form-column-container">
            <div>
              <div class="form-group">
                ${!!this.values.img
                  ? html`
                      <p>Imagen destacada:</p>
                      <div class="image-preview-container">
                        <img src="${process.env.API_URI}/uploads/${this.values.img}" />
                      </div>
                      <div class="btn-container">
                        <button-c
                          @click="${() => {
                            this.handleEraseImage()
                          }}"
                          >Borrar imagen</button-c
                        >
                      </div>
                    `
                  : html`
                      <p>
                        Sube la imagen principal del post
                        <small>(recomendado 1920pxx800px)</small>
                      </p>
                      <uploader-lab
                        @input="${(e: any) => this.handleUpdatePictureChange(e)}"
                      ></uploader-lab>
                    `}
              </div>
              <input-c
                id="title"
                type="text"
                label="Título"
                placeholder="Título del post"
                name="title"
                value="${this.values.title}"
                required="true"
              ></input-c>
              <input-c
                id="brief"
                type="text"
                label="Breve descripción"
                placeholder="Breve Descripción"
                name="brief"
                value="${this.values.brief}"
                required="true"
              ></input-c>
              <md-editor-bis-c
                initialValue="${this.values.description}"
                @input=${(e: any) => {
                  this.values.description = e.target.value
                }}
              ></md-editor-bis-c>
              <p>
                <switch-c
                  id="switcher"
                  round
                  label="Destacar"
                  name="featured"
                  ?checked="${this.values.featured}"
                  @input="${(e: KeyboardEvent) => this.handleSwitchChange(e)}"
                ></switch-c>
              </p>
            </div>
            <div class="form-group categories">
              <h2>Categorías</h2>
              ${this.catsDisp.map(cat => {
                return html`
                  <option-c
                    type="checkbox"
                    .checked=${!!(this.values.cats && this.values.cats.includes(cat.id!))}
                    name="cats"
                    label="${cat.title}"
                    @input="${(e: any) => this.addCategories(e, cat.id!)}"
                  ></option-c>
                `
              })}
              <h2>Tags</h2>
              ${this.values.tags
                ? this.values.tags.map(
                    tag => html`
                      <p>
                        <span class="tag">${tag}</span
                        ><span
                          class="cut"
                          @click=${() => {
                            this.values.tags = this.values.tags!.filter(tagIn => tagIn != tag)
                            this.requestUpdate()
                          }}
                          >✂️</span
                        >
                      </p>
                    `
                  )
                : null}
              <input-c
                label="Tag"
                placeholder="Nueva tag sin espacios"
                @keydown="${(e: KeyboardEvent) => this.handleNewTag(e)}"
              ></input-c>
            </div>
          </div>
          <p class="error">${this.validityError}</p>
          <button-c type="submit" align="right">Actualizar</button-c>
        </form>
      </form-container-c>
    `
  }
  async connectedCallback() {
    super.connectedCallback()
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    this.catsDisp = await this.categoryRepositoy.findAll()
    if (id) {
      this.id = id
      this.values = { ...(await this.postRepository.getById(id)) }
      this.initialValues = { ...this.values }
    }
    if (this.values.featured) {
      this.switcher!.shadowRoot!.querySelector('input')!.setAttribute('checked', 'checked')
    }
  }
  handleSwitchChange = (e: any) => {
    this.values = {
      ...this.values,
      featured: e.target.shadowRoot.host.el().checked
    }
  }

  handleUpdatePictureChange = (e: any) => {
    const target = e.target
    setTimeout(() => {
      this.imgData = target.shadowRoot.querySelector('#selectFile').files[0]
      this.imgName = target.shadowRoot.host.fileName[0]
    }, 100)
  }
  uploadImage = async () => {
    if (this.imgData && this.imgName) {
      await this.imageService.uploadImage(this.imgData, this.imgName).then(response => {
        this.imgData = ''
        this.imgName = ''
        return (this.values.img = response)
      })
    }
    return
  }

  handleSubmit = async (e: any) => {
    e.preventDefault()
    this.validityError =
      countErrors(this) > 0 ? `Revisa los ${countErrors(this)} errores en el formulario` : ''
    if (this.validityError === '') {
      const target = e.taget
      await this.uploadImage().then(() => {
        const formValues = serializeForm(target)
        this.values = { ...this.values, ...formValues }
        if (
          JSON.stringify(this.values) !== JSON.stringify(this.initialValues) ||
          this.values.featured != this.initialValues.featured
        ) {
          this.postRepository.update(this.id, this.values).then(() => {
            this.requestUpdate()
            notify('notification', 'Post modificado', this)
          })
        }
      })
    }
  }

  handleEraseImage = () => {
    this.values.img = ''
    this.postRepository.update(this.id, this.values).then(() => {
      this.requestUpdate()
    })
  }
  addCategories = (e: any, id: string) => {
    if (e.target.shadowRoot.querySelector('input').checked) {
      this.values.cats && !this.values.cats.includes(id)
        ? (this.values.cats = [...this.values.cats, id])
        : (this.values.cats = [id])
    } else {
      this.values.cats && this.values.cats.includes(id)
        ? (this.values.cats = this.values.cats.filter(cat => cat !== id))
        : null
    }
  }
  handleNewTag = async (e: any) => {
    if (e.key == 'Enter') {
      this.values.tags = [...this.values.tags!, e.target.value]
      e.target.shadowRoot.querySelector('input').value = ''
      await this.requestUpdate()
    }
    if (e.key == ' ') {
      this.values.tags = [...this.values.tags!, e.target.value]
      e.target.shadowRoot.querySelector('input').value = ''
      await this.requestUpdate()
    } else if (e.key == ' ') {
      e.target.shadowRoot.querySelector('input').value = ''
      await this.requestUpdate()
    }
  }
}
