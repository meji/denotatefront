import { customElement, html, LitElement, property, query } from "lit-element";
import { serializeForm } from "../../../utils/utils";
import { general } from "../../../../styles/general";
import { Post } from "../domain/post";
import { PostRepositoryFactory } from "../infrastructure/post-repository-factory";
import "../../../utils/uploader";
import "../../../utils/switch";
import { ImageHttpService } from "../../images/infrastructure/image-http-service";
import { emptyPost } from "../../shared/emptyObjects";
import { Commands, Context, Router } from "@vaadin/router";
import "../../../core/components/markdownEditor/mdEditor";
import { adminStyles } from "../../../../styles/adminStyles";
import { Category } from "../../categories/domain/category";
import { CategoryRepositoryFactory } from "../../categories/infrastructure/category-repository-factory";
import "../../../core/components/forms/inputs/option";

@customElement("post-form-c")
export class PostForm extends LitElement {
  private postRepository = PostRepositoryFactory.build();
  private categoryRepositoy = CategoryRepositoryFactory.build();
  private imageService = new ImageHttpService();
  @property({ type: Object })
  values: Partial<Post> = Object.create(emptyPost);
  @property({ type: Object })
  initialValues: Partial<Post> = Object.create(emptyPost);
  @property({ type: Boolean }) edit = false;
  @property() imgData;
  @property({ type: String }) imgName = "";
  @property({ type: String }) id = "";
  @property({ type: Number }) counterUpdated = 0;
  @property() catsDisp: Partial<Category>[] = [null];
  @query("#switcher") switcher;

  public static styles = [general, adminStyles];
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
                  Router.go(`/${this.values.title}?id=${this.id}`);
                }}"
                >Ver Post</button-c
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
          id="post-form"
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
                    Sube la imagen principal de la post
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
            placeholder="Título de la post"
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
          <md-editor-bis-c
            initialValue="${this.values.description}"
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
          <button-c type="submit" align="right">Enviar</button-c>
        </form>
        <div class="form-group categories">
          ${this.catsDisp.map(cat => {
            return html`
              <option-c
                type="checkbox"
                .checked=${!!(
                  this.values.cats && this.values.cats.includes(cat.id)
                )}
                name="cats"
                label="${cat.title}"
                @input="${e => this.addCategories(e, cat.id)}"
              ></option-c>
            `;
          })}
        </div>
      </form-container-c>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.catsDisp = await this.categoryRepositoy.findAll();
    if (id) {
      this.id = id;
      this.values = { ...(await this.postRepository.getById(id)) };
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
          this.imgData = "";
          this.imgName = "";
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
      if (
        JSON.stringify(this.values) !== JSON.stringify(this.initialValues) ||
        this.values.featured != this.initialValues.featured
      ) {
        this.postRepository.update(this.id, this.values).then(() => {
          this.requestUpdate();
        });
      }
    });
  };

  handleEraseImage = () => {
    this.values.img = "";
    this.postRepository.update(this.id, this.values).then(() => {
      this.requestUpdate();
    });
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
}
