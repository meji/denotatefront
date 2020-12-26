import { LitElement, html, customElement, css } from "lit-element";
import "./menu";

@customElement("admin-container-c")
export class AdminContainer extends LitElement {
  public static styles = css`
    main {
      display: grid;
      grid-template-columns: 225px 1fr;
    }
    .content {
      padding: var(--l) calc(var(--l) * 2);
    }
  `;
  render() {
    return html`
      <main>
        <div class="menu">
          <admin-menu-c id="menu" />
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </main>
    `;
  }
}
