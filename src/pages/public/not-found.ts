import {LitElement, html, customElement} from 'lit-element';

@customElement('not-found')
export class NotFound extends LitElement {
  render() {
    return html`
      <h1>La página que buscas no existe</h1>
    `;
  }
}
