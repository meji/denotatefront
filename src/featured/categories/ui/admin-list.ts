import {
  LitElement,
  html,
  customElement,
  property,
  query,
  css
} from "lit-element";
import { general } from "../../../../styles/general";
import { CategoryRepositoryFactory } from "../infrastructure/category-repository-factory";
import { Category } from "../domain/category";

@customElement("admin-category-list-c")
export class AdminCategoryList extends LitElement {
  private categoryRepository = CategoryRepositoryFactory.build();

  @property({ type: Object }) values: Category[];

  public static styles = [general];
  render() {
    return html`
      <h1>Listado de Categorys</h1>
    `;
  }
}
