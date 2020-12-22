import { LitElement, html, customElement } from 'lit-element';

@customElement('home-page')
export class Home extends LitElement {
  render() {
    return html` <slot></slot> `;
  }
}
