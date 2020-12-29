import { LitElement, html, customElement, css } from "lit-element";
import { general } from "../../../../styles/general";
import { this_styles } from "./menu_styles";
import { Router } from "@vaadin/router";

@customElement("admin-menu-c")
export class Home extends LitElement {
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
            <li>
              <span @click=${() => Router.go("/admin/categories")}
                >Categorías</span
              >
            </li>
            <li>
              <span @click=${() => Router.go("/admin/tags")}>Tags</span>
            </li>
            <li>
              <span @click=${() => Router.go("/admin/users")}>Usuarios</span>
            </li>
            <li>
              <span @click=${() => Router.go("/admin/update-site")}
                >Configuración</span
              >
            </li>
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
}
