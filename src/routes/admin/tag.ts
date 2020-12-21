import {LitElement, html, customElement} from 'lit-element';

@customElement('admin-tag')
export class Tag extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}
