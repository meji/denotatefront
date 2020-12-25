import { LitElement, html, customElement } from "lit-element";
import "../../core/components/forms/inputs/input-base";

@customElement("category-page")
export class Category extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return html`
      <h1>Categoría</h1>
      <input-base-c
        id="example"
        label="label"
        type="text"
        .outline=${false}
      ></input-base-c>
      <slot></slot>
    `;
  }
}
