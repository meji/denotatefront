import { LitElement, html, customElement, property } from "lit-element";

@customElement("home-c")
export class HomeComponent extends LitElement {
  render() {
    return html`
      <h1>Home</h1>
      <slot></slot>
    `;
  }
}
