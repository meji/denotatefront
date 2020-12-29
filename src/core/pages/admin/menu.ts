import { LitElement, html, customElement, css } from "lit-element";
import { general } from "../../../../styles/general";
import { this_styles } from "./menu_styles";

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
              <a href="/admin">Posts</a>
            </li>
            <li>
              <a href="/admin/categories">Categorías</a>
            </li>
            <li>
              <a href="/admin/tags">Tags</a>
            </li>
            <li>
              <a href="/admin/users">Usuarios</a>
            </li>
            <li>
              <a href="/admin/update-site">Configuración</a>
            </li>
            <li>
              <a href="logout">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  }
}
