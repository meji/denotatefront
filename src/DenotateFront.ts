import { html, LitElement } from 'lit-element';
import './routes/public/home';

export class DenotateFront extends LitElement {
  render() {
    return html` <home-page></home-page> `;
  }
}
