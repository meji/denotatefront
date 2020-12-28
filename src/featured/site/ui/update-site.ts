import {
  LitElement,
  html,
  customElement,
  property,
  query,
  css
} from "lit-element";
import "../../../pages/special/container";
import { serializeForm } from "../../../utils/utils";
import { SiteService } from "../infrastructure/site-service";
import "../../../utils/uploader";
import "../../../utils/switch";
import { general } from "../../../../styles/general";
import { Site } from "../domain/site";
import { emptySite } from "../../shared/emptyObjects";
import { ImageHttpService } from "../../images/infrastructure/image-http-service";
import "../../../core/components/markdownEditor/mdEditorBis";

@customElement("update-site-c")
export class UpdateSite extends LitElement {
  siteService = new SiteService();
  private imageService = new ImageHttpService();
  @property({ type: Object }) values: Partial<Site> = emptySite;
  @property() imgData;
  @property({ type: String }) imgName = "";
  @query("#switcher") switcher;

  async connectedCallback() {
    super.connectedCallback();
    const site = await this.siteService.getSite();
    if (site) {
      this.values = { ...site };
    }
    if (this.values.theme == "dark") {
      this.switcher.shadowRoot
        .querySelector("input")
        .setAttribute("checked", "checked");
    }
  }

  public static styles = [general];
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
                <p>Imagen destacada:</p>
                <div class="image-preview-container">
                  <img
                    src="${process.env.API_URI}/uploads/${this.values.logo}"
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
                  Sube una imagen para el logo
                  <small>(recomendado 250px x 80px)</small>
                </p>
                <uploader-lab
                  @input="${e => this.handleUpdatePictureChange(e)}"
                ></uploader-lab>
              `}
        </div>
        <p>Elige si quieres el tema claro u oscuro</p>
        <p>
          <switch-c
            id="switcher"
            round
            ?label=${this.values.theme == "dark" ? "Oscuro" : "Claro"}
            name="featured"
            ?checked="${this.values.theme == "dark"}"
            @input="${e => this.handleSwitchChange(e)}"
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
          <button-c type="submit" align="right">Enviar</button-c>
        </form>
        <slot></slot>
      </form-container-c>
    `;
  }
  handleUpdatePictureChange = e => {
    const target = e.target;
    setTimeout(() => {
      this.imgData = target.shadowRoot.querySelector("#selectFile").files[0];
      this.imgName = target.shadowRoot.host.fileName[0];
    }, 100);
  };

  handleSwitchChange = e => {
    this.values = {
      ...this.values,
      theme: e.target.shadowRoot.host.el().checked ? "dark" : "light"
    };
    const changeTheme = new CustomEvent("change-theme", {
      detail: { theme: this.values.theme },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeTheme);
  };

  handleColorChange = e => {
    this.values["color"] = e.target.value;
  };
  uploadImage = async () => {
    if (this.imgData && this.imgName) {
      await this.imageService
        .uploadImage(this.imgData, this.imgName)
        .then(response => {
          this.imgData = "";
          this.imgName = "";
          return (this.values.logo = response);
        });
    }
    return;
  };
  handleEraseImage = () => {
    this.values.logo = "";
    this.siteService.updateSite(this.values).then(() => {
      this.requestUpdate();
    });
  };
  handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target;
    await this.uploadImage().then(() => {
      const formValues = serializeForm(target);
      this.values = { ...this.values, ...formValues };
      this.siteService.updateSite(this.values).then(() => {
        this.requestUpdate();
      });
    });
  };
}
