import { LitElement, html, customElement, property } from "lit-element";
import { getId } from "../../../utils/utils";
import { CategoryRepositoryFactory } from "../infrastructure/category-repository-factory";
import { Category } from "../domain/category";
import { general } from "../../../../styles/general";
import { Post } from "../../posts/domain/post";
import { emptyPost } from "../../shared/emptyObjects";
import { PostRepositoryFactory } from "../../posts/infrastructure/post-repository-factory";
import { publicStyles } from "../../../../styles/public";
import { ID } from "../../shared/id/id";
import "../../posts/ui/modulo";

@customElement("category-home-c")
export class CategoryHome extends LitElement {
  categoryRepository = CategoryRepositoryFactory.build();
  postRepository = PostRepositoryFactory.build();
  @property() category: Partial<Category>;
  @property() posts = [emptyPost];
  public static styles = [general, publicStyles];

  render() {
    return html`
      <body-container-c>
        <h1>${this.category.title}</h1>
        <p>${this.category.brief}</p>
        <div class="img-container featured">
          <img
            src="${process.env.API_URI + "/uploads/" + this.category.img}"
            alt="${this.category.title}"
            title="${this.category.title}"
          />
        </div>
        <div class="description">${this.category.description}</div>
        ${this.posts.map(post => {
          return html`
            <post-module-c .post="${post}"></post-module-c>
          `;
        })}
        <slot></slot>
      </body-container-c>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    await new Promise(r => setTimeout(r, 0));
    await this.categoryRepository.getById(getId()).then(response => {
      this.category = response;
      response.posts.map(async post => {
        this.postRepository.getById(post).then(response => {
          this.posts = [...this.posts, response];
          console.log(this.posts);
        });
      });
    });
  }
}
