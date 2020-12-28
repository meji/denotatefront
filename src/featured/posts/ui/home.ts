import { LitElement, html, customElement } from "lit-element";

@customElement("post-home-c")
export class PostHome extends LitElement {
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return html`
      <h1>Post Home</h1>
      <slot></slot>
    `;
  }
}
