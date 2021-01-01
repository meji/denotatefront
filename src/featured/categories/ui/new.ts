import {customElement, html, LitElement, property, query} from 'lit-element';
import {countErrors, serializeForm} from '../../../utils/utils';
import {general} from '../../../styles/general';
import {Category} from '../domain/category';
import {CategoryRepositoryFactory} from '../infrastructure/category-repository-factory';
import {ImageHttpService} from '../../images/infrastructure/image-http-service';
import {emptyCategory} from '../../shared/emptyObjects';
import {Router} from '@vaadin/router';
import {adminStyles} from '../../../styles/admin-styles';

const categoryRepository = CategoryRepositoryFactory.build();

@customElement("category-new-c")
export class CategoryNew extends LitElement {
  private imageService = new ImageHttpService();
  @property({ type: Object })
  values: Partial<Category> = Object.create(emptyCategory);
  @property({ type: Boolean }) edit = false;
  @property() imgData = "";
  @property({ type: String }) imgName = "";
  @property({ type: String }) id = "";
  @property({ type: Number }) counterUpdated = 0;
  @property({ type: String }) validityError = "";
  @query("#switcher") switcher: HTMLElement | undefined;
  public static styles = [general, adminStyles];

  render() {
    return html`
      <h1>Nueva Categoría</h1>
      <form-container-c class="transparent" size="large">
        <form
          @submit="${(e: any) => {
            this.handleSubmit(e);
          }}"
          id="category-form"
        >
          <div class="form-group">
            ${!!this.values.img
              ? html`
                  <p>Imagen destacada:</p>
                  <div class="image-preview-container">
                    <img
                      src="${process.env.API_URI}/uploads/${this.values.img}"
                    />
                  </div>
                  <div class="btn-container">
                    <button-c
                      @click="${() => {
                        this.handleEraseImage();
                      }}"
                      >Borrar imagen</button-c
                    >
                  </div>
                `
              : html`
                  <p>
                    Sube la imagen principal de la categoria
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
            placeholder="Título de la categoría"
            name="title"
            value="${this.values.title}"
            required="true"
          ></input-c>
          <input-c
            id="brief"
            type="text"
            label="Resumen"
            placeholder="Resumen"
            name="brief"
            value="${this.values.brief}"
            required="true"
          ></input-c>
          <input-c
            id="description"
            type="text"
            label="Descripción"
            placeholder="Descripción"
            name="description"
            value="${this.values.description}"
          ></input-c>
          <p>
            <switch-c
              id="switcher"
              round
              label="Destacar"
              name="featured"
              ?checked="${this.values.featured}"
              @input="${(e: any) => this.handleSwitchChange(e)}"
            ></switch-c>
          </p>
          <button-c type="submit" align="right">Enviar</button-c>
        </form>
        <p class="error">${this.validityError}</p>
      </form-container-c>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
  }
  handleSwitchChange = (e: any) => {
    this.values = {
      ...this.values,
      featured: e.target.shadowRoot.host.el().checked
    };
  };

  handleUpdatePictureChange = (e: any) => {
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
        categoryRepository.create(this.values).then(response => {
          Router.go(`/admin/categories/edit?id=${response.id}`);
        });
      });
    }
  };

  handleEraseImage = () => {
    this.values.img = "";
  };
}
