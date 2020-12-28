import { LitElement, html, customElement, property } from "lit-element";
import { getId } from "../../../utils/utils";
import { CategoryRepositoryFactory } from "../infrastructure/category-repository-factory";
import { Category } from "../domain/category";
import { general } from "../../../../styles/general";
import { Post } from "../../posts/domain/post";
import { emptyPost } from "../../shared/emptyObjects";

@customElement("category-home-c")
export class CategoryHome extends LitElement {
  categoryRepository = CategoryRepositoryFactory.build();
  @property() category: Partial<Category>;
  @property() posts: Partial<Post>[] = [emptyPost];
  public static styles = [general];

  render() {
    return html`
      <body-container-c>
        <h1>${this.category.title}</h1>
        <p>${this.category.brief}</p>
        <div class="description">${this.category.description}</div>
        ${this.posts.map(post => {
          html`
            <post-module-c .post="${post}"></post-module-c>
          `;
        })}
        <slot></slot>
      </body-container-c>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.categoryRepository.getById(getId()).then(response => {
      this.category = response;
    });
  }
}
