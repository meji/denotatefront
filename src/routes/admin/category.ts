import {LitElement, html, customElement} from 'lit-element';

@customElement('admin-category')
export class Category extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}
