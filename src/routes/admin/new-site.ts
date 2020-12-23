import { LitElement, html, customElement } from "lit-element";

@customElement("new-site")
export class NewSite extends LitElement {
  render() {
    return html`
      <p>New Site</p>
      <slot></slot>
    `;
  }
}
