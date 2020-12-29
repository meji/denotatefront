import {
  LitElement,
  html,
  customElement,
  property,
  query,
  css
} from "lit-element";
import { general } from "../../../../styles/general";
import { Category } from "../domain/category";
import { CategoryRepositoryFactory } from "../infrastructure/category-repository-factory";

@customElement("category-list-c")
export class CategoryList extends LitElement {
  private categoryRepository = CategoryRepositoryFactory.build();

  @property({ type: Object }) values: Category[];

  public static styles = [general];
  render() {
    return html`
      <h1>Listado de Categorías</h1>
    `;
  }
}
