import { LitElement, html, customElement } from "lit-element";

@customElement("tag-list-c")
export class TagPageIndex extends LitElement {
  render() {
    return html`
      <h1>Tag Home</h1>
      <slot></slot>
    `;
  }
}
