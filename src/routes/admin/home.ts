import {LitElement, html, customElement} from 'lit-element';

@customElement('admin-home')
export class Home extends LitElement {
  render() {
    return html`
      <p>Admin home</p>
      <slot></slot>
    `;
  }
}
