import { LitElement, html, customElement } from "lit-element";

@customElement("header-c")
export class Header extends LitElement {
  render() {
    return html`
      <header id="header">
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/admin">Admin</a>
            </li>
            <li>
              <a href="/post">Post</a>
            </li>
            <li>
              <a href="/categorias">categorias</a>
            </li>
            <li>
              <a href="/categorias/categoria">categoria</a>
            </li>
            <li>
              <a href="/tags">tags</a>
            </li>
            <li>
              <a href="/tags/tag">tag</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/logout">logout</a>
            </li>
          </ul>
        <nav>
        <slot></slot>
      </header>
    `;
  }
}
