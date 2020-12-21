import {LitElement, html, customElement} from 'lit-element';

@customElement('tag-page')
export class Tag extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}
