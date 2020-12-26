import { html, css, LitElement, property, customElement } from "lit-element";
import { theme } from "./../styles/theme";
import { general } from "../styles/general";
import "./core/components/index";

@customElement("app-lit")
export class AppLit extends LitElement {
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
    `
  ];

  render() {
    return html`
      <div id="wrapper" class="dark">
        <slot></slot>
      </div>
    `;
  }
}
