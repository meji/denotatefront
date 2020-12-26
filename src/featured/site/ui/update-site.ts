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
import "color-picker-element";
import { general } from "../../../../styles/general";

@customElement("update-site-c")
export class NewSite extends LitElement {
  @property({ type: Object }) values = {};

  handleSubmitNewSite = async (e: any) => {
    e.preventDefault();
    const siteService = new SiteService();
    const target = e.target;
    const formValues = serializeForm(target);
    this.values = { ...this.values, ...formValues };
    if (await siteService.getSite()) {
      await siteService.updateSite(this.values).then(() => {
        location.reload();
      });
    } else {
      await siteService.createSite(this.values).then(() => {
        location.reload();
      });
    }
  };
  handleColorChange = e => {
    this.values["color"] = e.target.value;
  };

  public static styles = [general];
  render() {
    return html`
      <h1>Actualizar datos del site</h1>
      <form-container-c class="transparent">
        <p>Elige un color para el site</p>
        <color-picker
          id="picker"
          @input="${(e: any) => this.handleColorChange(e)}"
          formats="hex,rgb"
          selectedformat="hex"
        ></color-picker>
        <form
          @submit="${(e: any) => this.handleSubmitNewSite(e)}"
          id="site-form"
        >
          <p>Elige si quieres el tema claro u oscuro</p>
          <p>
            <label
              ><input type="radio" name="theme" value="dark" />Oscuro</label
            >
            <label
              ><input type="radio" name="theme" value="light" />Claro</label
            >
          </p>
          <input-c
            id="title"
            type="text"
            label="Título"
            placeholder="Título del sitio"
            name="title"
          ></input-c>
          <input-c
            id="brief"
            type="text"
            label="Descripción"
            placeholder="Pequeña descripción"
            name="brief"
          ></input-c>
          <input-c
            id="logo"
            type="text"
            label="Logo"
            placeholder="Logo"
            name="logo"
          ></input-c>
          <button-c type="submit" align="right">Enviar</button-c>
        </form>
        <slot></slot>
      </form-container-c>
    `;
  }
}
