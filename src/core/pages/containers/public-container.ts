import { LitElement, html, customElement, property, css } from "lit-element";
import { UserRepositoryFactory } from "../../../featured/users/infrastructure/user-repository-factory";
import { Commands, Context, Router } from "@vaadin/router";
import { authGuard } from "../../../featured/shared/auth/auth-guard";
import { AuthorizationService } from "../../../featured/shared/auth/authorization-service";

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
    const autorizationSerivce = new AuthorizationService();
    const aut = autorizationSerivce.getToken() != null;
    await this.userRepository
      .findAdmin()
      .then(response => (this.isadmin = response && aut));
  }
}
