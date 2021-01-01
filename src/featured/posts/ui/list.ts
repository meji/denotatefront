import {customElement, html, LitElement} from 'lit-element';
import {general} from '../../../styles/general';

@customElement("post-list-c")
export class PostList extends LitElement {
  public static styles = [general];
  render() {
    return html`
      <h1>Listado de Categorías</h1>
    `;
  }
}
