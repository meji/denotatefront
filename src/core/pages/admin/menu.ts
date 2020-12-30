import { LitElement, html, customElement, css, property } from "lit-element";
import { general } from "../../../../styles/general";
import { this_styles } from "./menu_styles";
import { Router } from "@vaadin/router";
import { UserHttpService } from "../../../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../../../featured/shared/auth/authorization-service";

@customElement("admin-menu-c")
export class Home extends LitElement {
  @property() admin: boolean;
  userService = new UserHttpService(new AuthorizationService());
  public static styles = [general, this_styles];
  render() {
    return html`
      <div id="menu-container">
        <img src="/logo.svg" />
        <h1 class="h4">Admin</h1>
        <nav>
          <ul>
            <li>
              <span @click=${() => Router.go("/admin")}>Posts</span>
            </li>
            </li>
            <li>
              <span @click=${() => Router.go("/admin/tags")}>Tags</span>
            </li>
            ${
              this.admin
                ? html`
                    <li>
                      <span @click=${() => Router.go("/admin/categories")}
                        >Categorías</span
                      >
                    </li>

                    <li>
                      <span @click=${() => Router.go("/admin/users")}
                        >Usuarios</span
                      >
                    </li>
                    <li>
                      <span @click=${() => Router.go("/admin/update-site")}
                        >Configuración</span
                      >
                    </li>
                  `
                : null
            }
            <li class="special">
              <span @click=${() => Router.go("logout")}>🏃 Logout</span>
            </li>
            <li>
              <span class="special" @click=${() => Router.go("/")}
                >🌐 Volver a la web</span
              >
            </li>
          </ul>
        </nav>
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    this.admin = await this.userService.thisIsAdmin();
  }
}
