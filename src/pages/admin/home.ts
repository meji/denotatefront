import { LitElement, html, customElement } from "lit-element";

@customElement("admin-home")
export class Home extends LitElement {
  render() {
    return html`
      <admin-menu />
      <slot></slot>
    `;
  }
}
