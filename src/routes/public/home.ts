import { LitElement, html, customElement } from 'lit-element';

@customElement('home-page')
export class Home extends LitElement {
  render() {
    return html`
      <p>Hola</p>
      <a href="hola">category</a>
      <a href="tag/hola">tag</a>
      <a href="categoria/post">post</a>
      <a href="admin">admin</a>
      <slot></slot>
    `;
  }
}
