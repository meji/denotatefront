import { LitElement, html, customElement, css } from "lit-element";
import { theme } from "../../../styles/theme";
import { general } from "../../../styles/general";

@customElement("special-container-c")
export class SpecialContainer extends LitElement {
  public static styles = [
    general,
    css`
      main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
      }
    `
  ];
  render() {
    return html`
      <main>
        <slot></slot>
      </main>
    `;
  }
}
