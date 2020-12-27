import { LitElement, html, customElement } from "lit-element";

@customElement("users-new-c")
export class UsersNew extends LitElement {
  render() {
    return html`
      <main>
        <slot></slot>
      </main>
    `;
  }
}
