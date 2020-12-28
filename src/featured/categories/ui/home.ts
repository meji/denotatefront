import { LitElement, html, customElement } from "lit-element";

@customElement("category-home-c")
export class CategoryHome extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return html`
      <h1>Categoría Home</h1>

      <slot></slot>
    `;
  }
}
