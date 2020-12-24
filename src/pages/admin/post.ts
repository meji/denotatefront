import {LitElement, html, customElement} from 'lit-element';

@customElement('admin-post')
export class Post extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}
