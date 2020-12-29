import { LitElement, html, customElement, property, css } from "lit-element";
import "../public/header";
import "./body-container";
import { UserRepositoryFactory } from "../../../featured/users/infrastructure/user-repository-factory";
import { Router } from "@vaadin/router";

@customElement("container-c")
export class PublicContainer extends LitElement {
  @property({ type: Boolean }) isadmin;
  userRepository = UserRepositoryFactory.build();
  public static styles = css`
    button-c {
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
  `;
  render() {
    return html`
      <main>
        ${this.isadmin
          ? html`
              <button-c
                id="admin-btn"
                @click="${() => Router.go("/admin")}"
                size="small"
                >Ir al admin</button-c
              >
            `
          : ""}
        <header-c></header-c>
        <body-container-c>
          <slot></slot>
        </body-container-c>
      </main>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.userRepository
      .findAdmin()
      .then(response => (this.isadmin = response));
  }
}
