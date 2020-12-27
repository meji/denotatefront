import { html, css, LitElement, property, customElement } from "lit-element";
import { theme } from "./../styles/theme";
import { general } from "../styles/general";
import "./core/components/index";
import { SiteService } from "./featured/site/infrastructure/site-service";

@customElement("app-lit")
export class AppLit extends LitElement {
  @property({ type: String }) color = "#4bac95";
  @property({ type: String }) theme = "light";

  async connectedCallback() {
    super.connectedCallback();
    const siteService = new SiteService();
    const site = await siteService.getSite();
    this.color = site.color;
    this.theme = site.theme;
  }

  _handleChangeTheme = e => {
    this.theme = e.detail.theme;
  };

  async firstUpdated() {
    await new Promise(r => setTimeout(r, 0));
    this.addEventListener("change-theme", this._handleChangeTheme);
  }
  disconnectedCallback() {
    this.removeEventListener("change-theme", this._handleChangeTheme);
    super.disconnectedCallback();
  }

  public static styles = [
    theme,
    general,
    css`
      #wrapper {
        background: var(--background-wrapper);
        background-size: var(--background-wrapper-size);
        min-width: 100%;
        min-height: 100vh;
        overflow: auto;
        font-family: var(--body-font);
      }
      @import url("https://fonts.googleapis.com/css2?family=Cardo&display=swap");
      @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap");
    `
  ];

  render() {
    return html`
      <div id="wrapper" class="${this.theme}">
        <style>
          #wrapper {
            --main-color: ${this.color} !important;
          }
        </style>
        <slot></slot>
      </div>
    `;
  }
}
