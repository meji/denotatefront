import { LitElement, html, customElement } from "lit-element";

@customElement("users-list-c")
export class UsersList extends LitElement {
  render() {
    return html`
      <main>
        <slot></slot>
      </main>
    `;
  }
}
