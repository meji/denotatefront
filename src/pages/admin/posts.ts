import { LitElement, html, customElement } from "lit-element";

@customElement("admin-posts-c")
export class AdminPost extends LitElement {
  render() {
    return html`
      <h1>Posts</h1>
      <slot></slot>
    `;
  }
}
