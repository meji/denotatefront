import {customElement, html, LitElement, property, query} from 'lit-element';
import {countErrors, serializeForm} from '../../../utils/utils';
import {general} from '../../../styles/general';
import {Post} from '../domain/post';
import {PostRepositoryFactory} from '../infrastructure/post-repository-factory';
import {ImageHttpService} from '../../images/infrastructure/image-http-service';
import {emptyPost} from '../../shared/emptyObjects';
import {adminStyles} from '../../../styles/admin-styles';
import {Category} from '../../categories/domain/category';
import {CategoryRepositoryFactory} from '../../categories/infrastructure/category-repository-factory';
import {this_styles} from './form-styles';

const postRepository = PostRepositoryFactory.build();

@customElement("post-new-c")
export class PostNew extends LitElement {
  private imageService = new ImageHttpService();
  private categoryRepositoy = CategoryRepositoryFactory.build();
  @property()
  values: Partial<Post> = Object.create(emptyPost);
  @property({ type: Boolean }) edit = false;
  @property() imgData;
  @property({ type: String }) imgName = "";
  @property({ type: String }) id = "";
  @property({ type: Number }) counterUpdated = 0;
  @property() catsDisp: Partial<Category>[] = [null];
  @property({ type: String }) validityError = "";
  @property({ type: String }) tag;

  @query("#switcher") switcher;

  public static styles = [general, adminStyles, this_styles];
  render() {
    return html`
      <h1>Nuevo Post</h1>
      <div class="form-special-container">
        <form-container-c class="transparent" size="extralarge">
          <form
            @submit="${(e: any) => {
              this.handleSubmit(e);
            }}"
            id="post-form"
          >
            <div class="form-column-container">
              <div>
                <div class="form-group">
                  ${!!this.values.img
                    ? html`
                        <p>Imagen destacada:</p>
                        <p>
                          <img
                            src="${process.env.API_URI}/uploads/${this.values
                              .img}"
                          />
                        </p>
                        <button-c
                          @click="${() => {
                            this.handleEraseImage();
                          }}"
                          >Borrar imagen</button-c
                        >
                      `
                    : html`
                        <p>
                          Sube la imagen principal del post
                          <small>(recomendado 1920pxx800px)</small>
                        </p>
                        <uploader-lab
                          @input="${e => this.handleUpdatePictureChange(e)}"
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
                  label="Entradilla"
                  placeholder="Entradilla"
                  name="brief"
                  value="${this.values.brief}"
                  required="true"
                ></input-c>
                <md-editor-bis-c
                  @input=${e => {
                    this.values.description = e.target.value;
                  }}
                ></md-editor-bis-c>
                <p>
                  <switch-c
                    id="switcher"
                    round
                    label="Destacar"
                    name="featured"
                    ?checked="${this.values.featured}"
                    @input="${e => this.handleSwitchChange(e)}"
                  ></switch-c>
                </p>
              </div>
              <div class="form-group categories">
                <h2>Categorías</h2>
                ${this.catsDisp.map(cat => {
                  return html`
                    <option-c
                      type="checkbox"
                      .checked=${false}
                      name="cats"
                      label="${cat.title}"
                      @input="${e => this.addCategories(e, cat.id)}"
                    ></option-c>
                  `;
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
                              this.values.tags = this.values.tags.filter(
                                tagIn => tagIn != tag
                              );
                              this.requestUpdate();
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
                  @keydown="${e => this.handleNewTag(e)}"
                ></input-c>
              </div>
            </div>

            <button-c type="submit" align="right">Enviar</button-c>
          </form>
          <p class="error">${this.validityError}</p>
        </form-container-c>
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    this.values = new Object(emptyPost);
    this.catsDisp = await this.categoryRepositoy.findAll();
  }
  handleSwitchChange = e => {
    this.values = {
      ...this.values,
      featured: e.target.shadowRoot.host.el().checked
    };
  };

  handleUpdatePictureChange = e => {
    const target = e.target;
    setTimeout(() => {
      this.imgData = target.shadowRoot.querySelector("#selectFile").files[0];
      this.imgName = target.shadowRoot.host.fileName[0];
    }, 100);
  };
  uploadImage = async () => {
    if (this.imgData && this.imgName) {
      await this.imageService
        .uploadImage(this.imgData, this.imgName)
        .then(response => {
          this.imgData = "";
          this.imgName = "";
          return (this.values.img = response);
        });
    }
    return;
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    this.validityError =
      countErrors(this) > 0
        ? `Revisa los ${countErrors(this)} errores en el formulario`
        : "";
    if (this.validityError === "") {
      const target = e.target;
      await this.uploadImage().then(() => {
        const formValues = serializeForm(target);
        this.values = { ...this.values, ...formValues };
        postRepository.create(this.values).then(response => {
          window.location.href = `/post?id=${response.id}`;
        });
      });
    }
  };

  handleEraseImage = () => {
    this.values.img = "";
  };

  addCategories = (e, id) => {
    if (e.target.shadowRoot.querySelector("input").checked) {
      this.values.cats && !this.values.cats.includes(id)
        ? (this.values.cats = [...this.values.cats, id])
        : (this.values.cats = [id]);
    } else {
      this.values.cats && this.values.cats.includes(id)
        ? (this.values.cats = this.values.cats.filter(cat => cat !== id))
        : null;
    }
  };
  handleNewTag = async e => {
    if (e.key == "Enter") {
      e.preventDefault();
      this.values.tags = [...this.values.tags, e.target.value];
      e.target.shadowRoot.querySelector("input").value = "";
      await this.requestUpdate();
    } else if (e.key == " ") {
      e.target.shadowRoot.querySelector("input").value = "";
      await this.requestUpdate();
    }
  };
}
