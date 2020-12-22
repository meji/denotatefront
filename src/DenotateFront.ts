import { html, css, LitElement, property } from "lit-element";
import "./routes/public/home";

export class DenotateFront extends LitElement {
  render() {
    return html`
      <h2>Contenedor</h2>
      <ul>
        <li>
          <a href="/admin">Admin</a>
        </li>
        <li>
          <a href="/categoria">categoria</a>
        </li>
        <li>
          <a href="/post">post</a>
        </li>
      </ul>
      <slot></slot>
    `;
  }
}
