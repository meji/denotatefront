import { html, css, LitElement, property, customElement } from "lit-element";
import "./routes/public/home";

@customElement("app-lit")
export class AppLit extends LitElement {
  render() {
    return html`
      <h2>Contenedor</h2>
      <slot></slot>
    `;
  }
}
