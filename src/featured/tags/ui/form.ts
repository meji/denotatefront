import { customElement, html, LitElement, property, query } from "lit-element";
import { serializeForm } from "../../../utils/utils";
import { general } from "../../../../styles/general";
import { Tag } from "../domain/tag";
import { TagRepositoryFactory } from "../infrastructure/tag-repository-factory";
import "../../../utils/uploader";
import "../../../utils/switch";
import { ImageHttpService } from "../../images/infrastructure/image-http-service";
import { emptyTag } from "../../shared/emptyObjects";
import { Commands, Context, Router } from "@vaadin/router";

@customElement("tag-form-c")
export class TagForm extends LitElement {
  private tagRepository = TagRepositoryFactory.build();
  private imageService = new ImageHttpService();
  @property({ type: Object })
  values: Partial<Tag> = emptyTag;
  @property({ type: Object })
  initialValues: Partial<Tag> = emptyTag;
  @property({ type: Boolean }) edit = false;
  @property() imgData;
  @property({ type: String }) imgName = "";
  @property({ type: String }) id = "";
  @property({ type: Number }) counterUpdated = 0;
  @query("#switcher") switcher;

  async connectedCallback() {
    super.connectedCallback();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
      this.id = id;
      this.values = { ...(await this.tagRepository.getById(id)) };
      this.initialValues = { ...this.values };
    }
    if (this.values.featured) {
      this.switcher.shadowRoot
        .querySelector("input")
        .setAttribute("checked", "checked");
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
        this.tagRepository.create(this.values).then(() => {
          this.requestUpdate();
        });
      } else if (
        JSON.stringify(this.values) !== JSON.stringify(this.initialValues) ||
        this.values.featured != this.initialValues.featured
      ) {
        this.tagRepository.update(this.id, this.values).then(() => {
          this.requestUpdate();
        });
      }
    });
  };

  handleEraseImage = () => {
    this.values.img = "";
    this.tagRepository.update(this.id, this.values).then(() => {
      this.requestUpdate();
    });
  };

  public static styles = [general];
  render() {
    return html`
      <h1>
        ${this.id ? "Tag: " + this.values.title : "Edición de tag"}
        ${this.id
          ? html`
              <style>
                button-c {
                  float: right;
                }
              </style>
              <button-c
                size="extrasmall"
                @click="${() => {
                  Router.go(`/${this.values.title}?id="${this.id}"`);
                }}"
                >Ver Tag</button-c
              >
            `
          : null}
      </h1>
      <form-container-c class="transparent" size="large">
        <form
          @submit="${(e: any) => {
            e.preventDefault();
            this.handleSubmit(e.target);
          }}"
          id="tag-form"
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
            placeholder="Título de la tag"
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
              id="switcher"
              round
              label="Destacar"
              name="featured"
              ?checked="${this.values.featured}"
              @input="${e => this.handleSwitchChange(e)}"
            ></switch-c>
          </p>
          <button-c type="submit" align="right">Enviar</button-c>
        </form>
        <slot></slot>
      </form-container-c>
    `;
  }
}