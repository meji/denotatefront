import { LitElement, html, customElement } from "lit-element";
import "./header";
import { LitElementLight } from "../../featured/shared/lit-light-element/lit-light-element";

@customElement("container-c")
export class Container extends LitElementLight {
  render() {
    return html`
      <main>
        <header-c></header-c>
        <slot></slot>
      </main>
    `;
  }
}
