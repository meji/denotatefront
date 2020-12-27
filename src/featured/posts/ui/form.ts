import { customElement, html, LitElement, property } from "lit-element";
import { serializeForm } from "../../../utils/utils";
import { general } from "../../../../styles/general";
import "../../../utils/uploader";
import "../../../utils/switch";
import { ImageHttpService } from "../../images/infrastructure/image-http-service";
import { PostRepositoryFactory } from "../infrastructure/post-repository-factory";
import { Post } from "../domain/post";

@customElement("post-form-c")
export class PostForm extends LitElement {
  postRepository = PostRepositoryFactory.build();

  private imageService = new ImageHttpService();
  @property({ type: Object }) values: Partial<Post> = {};
  @property({ type: Boolean }) new: false;
  @property() imgData;
  @property({ type: String }) imgName = "";

  connectedCallback() {
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
    }, 1000);
  };
  uploadImage = async () => {
    await this.imageService
      .uploadImage(this.imgData, this.imgName)
      .then(response => {
        this.values.img = response;
      });
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target;
    await this.uploadImage()
      .then(() => {
        const formValues = serializeForm(target);
        this.values = { ...this.values, ...formValues };
        this.postRepository.create(this.values);
      })
      .then(() => {
        this.postRepository.findByTitle(this.title).then(response => {
          window.location.href = `/${this.values.title}?id=${response[0].id}`;
        });
      });
  };

  public static styles = [general];
  render() {
    return html`
      <h1>Post: ${this.values.title}</h1>
      <form-container-c class="transparent" size="large">
        <form @submit="${(e: any) => this.handleSubmit(e)}" id="category-form">
          <div class="form-group">
            <p>
              Sube la imagen principal de la categoria
              <small>(recomendado 1920pxx800px)</small>
            </p>
            <uploader-lab
              @input="${e => this.handleUpdatePictureChange(e)}"
            ></uploader-lab>
          </div>
          <input-c
            id="title"
            type="text"
            label="Título"
            placeholder="Título de la categoría"
            name="title"
          ></input-c>
          <input-c
            id="brief"
            type="text"
            label="Breve descripción"
            placeholder="Breve Descripción"
            name="brief"
          ></input-c>
          <input-c
            id="description"
            type="text"
            label="Descripción corta"
            placeholder="Descripción corta"
            name="description"
          ></input-c>
          <p>
            <switch-c
              round
              label="Destacar"
              name="featured"
              checked=${this.values.featured}
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
