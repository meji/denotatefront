import {customElement, html, LitElement, property} from 'lit-element';
import {general} from '../../../styles/general';
import {Category} from '../domain/category';

@customElement("category-list-c")
export class CategoryList extends LitElement {
  @property({ type: Object }) values: Category[] = [];

  public static styles = [general];
  render() {
    return html`
      <h1>Listado de Categorías</h1>
    `;
  }
}
