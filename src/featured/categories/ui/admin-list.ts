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
import { emptyCategory } from "../../shared/emptyObjects";
import { admin } from "../../../../styles/admin";
import { Router } from "@vaadin/router";

@customElement("admin-category-list-c")
export class AdminCategoryList extends LitElement {
  private categoryRepository = CategoryRepositoryFactory.build();

  @property({ type: Object }) values: Partial<Category>[] = [emptyCategory];

  public static styles = [general, admin];
  render() {
    return html`
      <div class="admin-heaad-container">
        <div class="title-container">
          <h1>Categorías</h1>
        </div>
        <button-c
          size="extrasmall"
          @click="${() => Router.go("/admin/categories/new")}"
          >Nueva categoría</button-c
        >
      </div>
      <ul class="admin-list">
        ${this.values.map(
          category =>
            html`
              <li>
                <div class="row">
                  <p>
                    ${category.title}
                  </p>
                  <span class="btn-container">
                    <button-c
                      size="extrasmall"
                      @click="${e =>
                        e.target
                          .closest("li")
                          .querySelector(".description")
                          .classList.toggle("visible")}"
                      >detalles</button-c
                    >
                    <button-c
                      size="extrasmall"
                      @click="${() =>
                        Router.go(`/admin/categories/edit?id=${category.id}`)}"
                      >Editar</button-c
                    >
                    <button-c
                      size="extrasmall"
                      @click="${() =>
                        Router.go(
                          `/categorias/${category.title}?id=${category.id}`
                        )}"
                      >Ver</button-c
                    >
                  </span>
                </div>
                <div class="description">
                  <small>Descripción: </small>
                  ${category.brief}
                </div>
              </li>
            `
        )}
      </ul>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.categoryRepository.findAll().then(response => {
      this.values = response;
    });
  }
}
