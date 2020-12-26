import { customElement, html, LitElement, property } from "lit-element";
import { serializeForm } from "../../../utils/utils";
import { general } from "../../../../styles/general";
import { Category } from "../domain/category";
import { CategoryRepositoryFactory } from "../infrastructure/category-repository-factory";
import "../../../utils/uploader";
import "../../../utils/switch";
import { ImageHttpService } from "../../images/infrastructure/image-http-service";
import { emptyCategory } from "../../shared/emptyObjects";

@customElement("category-form-c")
export class CategoryForm extends LitElement {
  private categoryRepository = CategoryRepositoryFactory.build();
  private imageService = new ImageHttpService();
  @property({ type: Object })
  values: Partial<Category> = emptyCategory;
  @property({ type: Object })
  initialValues: Partial<Category> = emptyCategory;
  @property({ type: Boolean }) edit = false;
  @property() imgData;
  @property({ type: String }) imgName = "";
  @property({ type: String }) id = "";
  @property({ type: Number }) counterUpdated = 0;

  async connectedCallback() {
    super.connectedCallback();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
      this.id = id;
      this.values = { ...(await this.categoryRepository.getById(id)) };
      this.initialValues = { ...this.values };
    }
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
          return (this.values.img = response);
        });
    }
    return;
  };

  handleSubmit = async (e: any) => {
    const target = e;
    await this.uploadImage().then(() => {
      const formValues = serializeForm(target);
      this.values = { ...this.values, ...formValues };
      if (this.id === undefined) {
        this.categoryRepository.create(this.values).then(() => {
          this.requestUpdate();
        });
      } else if (
        JSON.stringify(this.values) !== JSON.stringify(this.initialValues)
      ) {
        this.categoryRepository.update(this.id, this.values).then(() => {
          this.requestUpdate();
        });
      }
    });
  };

  handleEraseImage = () => {
    this.values.img = "";
    this.categoryRepository.update(this.id, this.values).then(() => {
      this.requestUpdate();
    });
  };

  public static styles = [general];
  render() {
    return html`
      <h1>
        ${this.id ? "Categoría: " + this.values.title : "Edición de categoría"}
      </h1>
      <form-container-c class="transparent" size="large">
        <form
          @submit="${(e: any) => {
            e.preventDefault();
            this.handleSubmit(e.target);
          }}"
          id="category-form"
        >
          <div class="form-group">
            ${!!this.values.img
              ? html`
                  <p>Imagen destacada:</p>
                  <p>
                    <img
                      src="${process.env.API_URI}/uploads/${this.values.img}"
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
                    Sube la imagen principal de la categoria
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
            placeholder="Título de la categoría"
            name="title"
            value="${this.values.title}"
          ></input-c>
          <input-c
            id="brief"
            type="text"
            label="Breve descripción"
            placeholder="Breve Descripción"
            name="brief"
            value="${this.values.brief}"
          ></input-c>
          <input-c
            id="description"
            type="text"
            label="Descripción corta"
            placeholder="Descripción corta"
            name="description"
            value="${this.values.description}"
          ></input-c>
          <p>
            <switch-c
              round
              label="Destacar"
              name="featured"
              ?checked=${this.values.featured}
              @blur="${e => this.handleSwitchChange(e)}"
            ></switch-c>
          </p>
          <button-c type="submit" align="right">Enviar</button-c>
        </form>
        <slot></slot>
      </form-container-c>
    `;
  }
}
