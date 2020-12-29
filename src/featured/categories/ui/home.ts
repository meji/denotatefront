import { LitElement, html, customElement, property } from "lit-element";
import { getId } from "../../../utils/utils";
import { CategoryRepositoryFactory } from "../infrastructure/category-repository-factory";
import { Category } from "../domain/category";
import { general } from "../../../../styles/general";
import { PostRepositoryFactory } from "../../posts/infrastructure/post-repository-factory";
import { publicStyles } from "../../../../styles/public";

@customElement("category-home-c")
export class CategoryHome extends LitElement {
  categoryRepository = CategoryRepositoryFactory.build();
  postRepository = PostRepositoryFactory.build();
  @property() category: Partial<Category>;
  @property() posts = [];
  public static styles = [general, publicStyles];

  render() {
    return this.category && this.category.title
      ? html`
          <div>
            <h1>${this.category.title}</h1>
            ${this.category.img
              ? html`
                  <div class="img-container featured">
                    <img
                      src="${process.env.API_URI +
                        "/uploads/" +
                        this.category.img}"
                      alt="${this.category.title}"
                      title="${this.category.title}"
                    />
                  </div>
                `
              : null}
            <div class="brief">${this.category.brief}</div>
            <div class="description">${this.category.description}</div>
            ${this.posts.length > 0
              ? html`
                  <ul class="modules-container">
                    ${this.posts.map(post => {
                      return html`
                        <li><post-module-c .post="${post}"></post-module-c></li>
                      `;
                    })}
                  </ul>
                `
              : ""}
            <slot></slot>
          </div>
        `
      : null;
  }

  async connectedCallback() {
    super.connectedCallback();
    await new Promise(r => setTimeout(r, 0));
    await this.categoryRepository.getById(getId()).then(response => {
      this.category = response;
      if (response.posts.length > 0) {
        response.posts.map(async post => {
          this.postRepository.getById(post).then(response => {
            this.posts = [...this.posts, response];
          });
        });
      }
    });
  }
}
