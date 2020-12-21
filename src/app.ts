import {LitElement, html, customElement} from 'lit-element';
import './routes/public/home';
@customElement('app-lit')
export class App extends LitElement {
  render() {
    return html`
      <home-page />
    `;
  }
}
