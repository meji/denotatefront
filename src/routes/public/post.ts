import {LitElement, html, customElement} from 'lit-element';

@customElement('post-page')
export class Post extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}
