import { LitElement, html, customElement } from "lit-element";

@customElement("category-page")
export class Category extends LitElement {
  render() {
    return html`
      <h1>Categoría</h1>
      <slot></slot>
    `;
  }
}
