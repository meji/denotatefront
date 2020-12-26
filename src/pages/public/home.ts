import { LitElement, html, customElement, property } from "lit-element";
import "../../core/components/forms/inputs/input-base";

@customElement("home-component")
export class Home extends LitElement {
  connectedCallback() {}
  render() {
    return html`
      <h1>Home</h1>
      <slot></slot>
    `;
  }
}
