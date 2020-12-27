import { LitElement, html, customElement, css } from "lit-element";
import { general } from "../../../styles/general";

@customElement("admin-menu-c")
export class Home extends LitElement {
  public static styles = [
    general,
    css`
      #menu-container {
        height: 100vh;
        background: var(--background-color);
        width: 200px;
        padding: var(--l) var(--s);
        border-right: var(--border-form);
        position: fixed;
      }
      #menu-container ul {
        margin: 0;
      }
      h1 {
        margin: var(--m);
        border-bottom: var(--border-form);
        padding-bottom: var(--s);
      }
      ul li {
        margin: 0 0 2px;
      }
      ul li a {
        color: var(--text-lighter-color);
        padding: var(--m);
        display: block;
      }
      ul li a:hover {
        background: var(--background-total-color);
        transition: var(--transition);
        color: var(--main-color);
      }
    `
  ];
  render() {
    return html`
      <div id="menu-container">
        <h1>Admin</h1>
        <nav>
          <ul>
            <li>
              <a href="/admin">Posts</a>
            </li>
            <li>
              <a href="/admin/posts/new">New Posts</a>
            </li>
            <li>
              <a href="/admin/categories">Categorías</a>
            </li>
            <li>
              <a href="/admin/categories/new">Categorías new</a>
            </li>
            <li>
              <a href="/admin/tags">Tags</a>
            </li>
            <li>
              <a href="/admin/tags/new">New Tag</a>
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
