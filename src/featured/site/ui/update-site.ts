import { css, customElement, html, LitElement, property, query } from 'lit-element'
import { notify, serializeForm } from '../../../utils/utils'
import { SiteService } from '../infrastructure/site-service'
import { general } from '../../../styles/general'
import { Site } from '../domain/site'
import 'color-picker-element'
import { emptySite } from '../../shared/emptyObjects'
import { ImageHttpService } from '../../images/infrastructure/image-http-service'
import { adminStyles } from '../../../styles/admin-styles'

@customElement('update-site-c')
export class UpdateSite extends LitElement {
  siteService = new SiteService()
  private imageService = new ImageHttpService()
  @property({ type: Object }) values: Partial<Site> = emptySite
  @property() imgData = ''
  @property({ type: String }) imgName = ''
  @query('#switcher') switcher: HTMLElement | undefined

  async connectedCallback() {
    super.connectedCallback()
    const site = await this.siteService.getSite()
    if (site) {
      this.values = { ...site }
    }
    if (this.values.theme == 'dark') {
      this.switcher!.shadowRoot!.querySelector('input')!.setAttribute('checked', 'checked')
    }
  }

  public static styles = [
    general,
    adminStyles,
    css`
      .image-preview-container {
        height: 80px;
        padding: var(--s);
        border: var(--border-form);
        width: fit-content;
        max-width: 240px;
      }
      .image-preview-container img {
        width: auto;
        height: auto;
        object-fit: scale-down;
        max-width: 100%;
        max-height: 100%;
        margin: 0 auto;
        display: block;
      }
    `
  ]
  render() {
    return html`
      <h1>Actualizar datos del site</h1>
      <form-container-c class="transparent">
        <p>Elige un color para el site</p>

        <color-picker
          value="${this.values.color}"
          id="picker"
          @input="${(e: any) => this.handleColorChange(e)}"
          formats="hex,rgb"
          selectedformat="hex"
        ></color-picker>
        <div class="form-group">
          ${!!this.values.logo
            ? html`
                <p>Logotipo:</p>
                <div class="image-preview-container">
                  <img src="${process.env.API_URI}/uploads/${this.values.logo}" />
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
                  Sube una imagen para el logo
                  <small>(recomendado 250px x 80px)</small>
                </p>
                <uploader-lab
                  @input="${(e: any) => this.handleUpdatePictureChange(e)}"
                ></uploader-lab>
              `}
        </div>
        <p>Elige si quieres el tema claro u oscuro</p>
        <p>
          <switch-c
            id="switcher"
            round
            ?label=${this.values.theme == 'dark' ? 'Oscuro' : 'Claro'}
            name="featured"
            ?checked="${this.values.theme == 'dark'}"
            @input="${(e: any) => this.handleSwitchChange(e)}"
          ></switch-c>
        </p>
        <form @submit="${(e: any) => this.handleSubmit(e)}" id="site-form">
          <input-c
            id="title"
            type="text"
            label="Título"
            placeholder="Título del sitio"
            name="title"
            value="${this.values.title}"
          ></input-c>
          <input-c
            id="brief"
            type="text"
            label="Descripción"
            placeholder="Pequeña descripción"
            name="brief"
            value="${this.values.brief}"
          ></input-c>
          <button-c type="submit" align="right">Actualizar</button-c>
        </form>
        <slot></slot>
      </form-container-c>
    `
  }
  handleUpdatePictureChange = (e: any) => {
    const target = e.target
    setTimeout(() => {
      this.imgData = target.shadowRoot.querySelector('#selectFile').files[0]
      this.imgName = target.shadowRoot.host.fileName[0]
    }, 100)
  }

  handleSwitchChange = (e: any) => {
    this.values = {
      ...this.values,
      theme: e.target.shadowRoot.host.el().checked ? 'dark' : 'light'
    }
    const changeTheme = new CustomEvent('change-theme', {
      detail: { theme: this.values.theme },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(changeTheme)
  }

  handleColorChange = (e: any) => {
    this.values.color = e.target.value
  }
  uploadImage = async () => {
    if (this.imgData && this.imgName) {
      await this.imageService.uploadImage(this.imgData, this.imgName).then(response => {
        this.imgData = ''
        this.imgName = ''
        return (this.values.logo = response)
      })
    }
    return
  }
  handleEraseImage = () => {
    this.values.logo = ''
    this.siteService.updateSite(this.values).then(() => {
      this.requestUpdate()
    })
  }
  handleSubmit = async (e: any) => {
    e.preventDefault()
    const target = e.target
    await this.uploadImage().then(() => {
      const formValues = serializeForm(target)
      this.values = { ...this.values, ...formValues }
      this.siteService.updateSite(this.values).then(() => {
        notify('notification', 'Configuración actualizada', this)
        window.location.href = '/admin/update-site'
      })
    })
  }
}
