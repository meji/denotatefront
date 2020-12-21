import {LitElement, html, customElement} from 'lit-element';

@customElement('category-page')
export class Category extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}
