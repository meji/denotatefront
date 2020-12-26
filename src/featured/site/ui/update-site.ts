import { LitElement, html, customElement, property } from "lit-element";
import "../../../pages/special/container";
import { serializeForm } from "../../../utils/utils";
import { UserRepositoryFactory } from "../../users/infrastructure/user-repository-factory";
import { SiteService } from "../infrastructure/site-service";

@customElement("update-site-c")
export class NewSite extends LitElement {
  @property({ type: Boolean }) firstStep = true;

  handleSubmitNewSite = async (e: any) => {
    e.preventDefault();
    const siteService = new SiteService();
    const target = e.target;
    const values = serializeForm(target);
    await siteService.createSite(values).then(() => {
      target.reset();
      window.location.href = "/login";
    });
  };

  render() {
    return html`
      <h1>Nuevo Site</h1>
      <form-container-c>
        <form
          @submit="${(e: any) => this.handleSubmitNewSite(e)}"
          id="site-form"
        >
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
          <input-c
            id="color"
            type="text"
            label="Color"
            placeholder="Color"
            name="color"
          ></input-c>
          <button-c type="submit">Enviar</button-c>
        </form>
        <slot></slot>
      </form-container-c>
    `;
  }
}
