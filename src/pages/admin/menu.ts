import { LitElement, html, customElement } from "lit-element";

@customElement("admin-menu-c")
export class Home extends LitElement {
  render() {
    return html`
      <div id="menu-container">
        <nav>
          <ul>
            <li>
              <a href="Todos">Posts</a>
            </li>
            <li>
              <a href="Todos">Categorías</a>
            </li>
            <li>
              <a href="Todos">Usuarios</a>
            </li>
            <li>
              <a href="Todos">Configuración</a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  }
}
