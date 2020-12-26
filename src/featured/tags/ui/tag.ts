import { LitElement, html, customElement } from "lit-element";

@customElement("tag-page")
export class TagPage extends LitElement {
  render() {
    return html`
      <h1>Tag</h1>
      <slot></slot>
    `;
  }
}
