import { LitElement, html, customElement } from "lit-element";
import "./header";

@customElement("container-c")
export class Container extends LitElement {
  render() {
    return html`
      <main>
        <header-c></header-c>
        <slot></slot>
      </main>
    `;
  }
}
