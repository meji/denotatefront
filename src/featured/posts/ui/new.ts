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
import "../../../core/components/markdownEditor/mdEditorBis";
import { adminStyles } from "../../../../styles/adminStyles";

const postRepository = PostRepositoryFactory.build();

@customElement("post-new-c")
export class PostNew extends LitElement {
  private imageService = new ImageHttpService();
  @property({ type: Object })
  values: Partial<Post> = emptyPost;
  @property({ type: Object })
  initialValues: Partial<Post> = emptyPost;
  @property({ type: Boolean }) edit = false;
  @property() imgData;
  @property({ type: String }) imgName = "";
  @property({ type: String }) id = "";
  @property({ type: Number }) counterUpdated = 0;
  @query("#switcher") switcher;
  async connectedCallback() {
    super.connectedCallback();
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
      postRepository.create(this.values).then(response => {
        Router.go(`/admin/posts/edit?id=${response.id}`);
      });
    });
  };

  handleEraseImage = () => {
    this.values.img = "";
  };

  public static styles = [general, adminStyles];
  render() {
    return html`
      <h1>Nuevo Post</h1>
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
            placeholder="Título del post"
            name="title"
            value="${this.values.title}"
          ></input-c>
          <input-c
            id="brief"
            type="text"
            label="Entradilla"
            placeholder="Entradilla"
            name="brief"
            value="${this.values.brief}"
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
          <button-c type="submit" align="right">Enviar</button-c>
        </form>
        <slot></slot>
      </form-container-c>
    `;
  }
}
