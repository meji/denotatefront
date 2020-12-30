import { LitElement, html, customElement, property, css } from "lit-element";
import { UserRepositoryFactory } from "../../../featured/users/infrastructure/user-repository-factory";
import { Commands, Context, Router } from "@vaadin/router";
import { authGuard } from "../../../featured/shared/auth/auth-guard";
import { AuthorizationService } from "../../../featured/shared/auth/authorization-service";
import { UserHttpService } from "../../../featured/users/infrastructure/user-http-service";
import { getAdminUrl } from "../../../utils/utils";
import { SiteService } from "../../../featured/site/infrastructure/site-service";

@customElement("container-c")
export class PublicContainer extends LitElement {
  @property({ type: Boolean }) islogged;
  @property({ type: String }) theme;

  userService = new UserHttpService(new AuthorizationService());
  public static styles = css`
    button-c {
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
    .body {
      background: var(--background-total-color);
      padding: var(--xl) var(--m);
      padding-top: 140px;
    }
  `;
  render() {
    return html`
      <main class="${this.theme}">
        ${this.islogged
          ? html`
              <button-c
                id="admin-btn"
                @click="${() => {
                  this.handleAdmin();
                }}"
                size="small"
                >Admin</button-c
              >
            `
          : ""}
        <header-c></header-c>
        <div class="body">
          <body-container-c>
            <slot></slot>
          </body-container-c>
        </div>
        <footer-c></footer-c>
      </main>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    this.islogged = await this.userService.thisIsLoggged();
    const siteService = new SiteService();
    const site = await siteService.getSite();
    if (site) {
      this.theme = site.theme;
    }
  }

  handleAdmin = () => {
    Router.go(getAdminUrl());
    this.requestUpdate();
  };
}
