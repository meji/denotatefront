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
import { adminStyles } from "../../../../styles/adminStyles";
import { Router } from "@vaadin/router";

@customElement("admin-category-list-c")
export class AdminCategoryList extends LitElement {
  private categoryRepository = CategoryRepositoryFactory.build();

  @property({ type: Object }) values: Partial<Category>[] = [emptyCategory];

  public static styles = [general, adminStyles];
  render() {
    return html`
      <div class="admin-heaad-container">
        <div class="title-container">
          <h1>Categorías</h1>
        </div>
        <button-c
          size="small"
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
                  <p>✔ ${category.title}</p>
                  <span class="btn-container">
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Ver descripción"
                      @click="${e =>
                        e.target
                          .closest("li")
                          .querySelector(".description")
                          .classList.toggle("visible")}"
                      >➕</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Editar"
                      @click="${() =>
                        Router.go(`/admin/categories/edit?id=${category.id}`)}"
                      >✏️</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Ver"
                      @click="${() =>
                        Router.go(`/categorias/category?id=${category.id}`)}"
                      >👁️</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="borrar"
                      @click="${e =>
                        this._handleDelete(category.id, category.title)}"
                      >🗑️
                    </button-c>
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
    this.values = [emptyCategory];
    await this.categoryRepository.findAll().then(response => {
      this.values = response;
    });
  }

  _reload = async () => {
    this.values = await this.categoryRepository.findAll();
  };

  _handleDelete = async (id, title) => {
    if (window.confirm(`¿Quieres borrar la categoría ${title} ?`)) {
      this.categoryRepository
        .delete(id)
        .then()
        .finally(() => this._reload());
    }
  };
}
