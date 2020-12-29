import {
  LitElement,
  html,
  customElement,
  property,
  query,
  PropertyValues
} from "lit-element";
import { PostRepositoryFactory } from "../infrastructure/post-repository-factory";
import { getId } from "../../../utils/utils";
import { Post } from "../domain/post";
import { ID } from "../../shared/id/id";
import { emptyPost } from "../../shared/emptyObjects";
import { md } from "../../../core/components/markdownEditor/md";
import { publicStyles } from "../../../../styles/public";
import { general } from "../../../../styles/general";

@customElement("post-home-c")
export class PostHome extends LitElement {
  postRepository = PostRepositoryFactory.build();
  @property() post: Partial<Post> = emptyPost;
  @property() description;
  @query("#description") descriptionc;
  public static styles = [general, publicStyles];

  render() {
    return html`
      <div>
        <h1>${this.post.title}</h1>
        ${this.post.img
          ? html`
              <div class="img-container featured">
                <img
                  src="${process.env.API_URI + "/uploads/" + this.post.img}"
                  alt="${this.post.title}"
                  title="${this.post.title}"
                />
              </div>
              <div class="brief">${this.post.brief}</div>
            `
          : null}
        <div id="description"></div>
        <slot></slot>
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    const id = getId();
    if (id) {
      await this.postRepository
        .getById(id)
        .then(response => {
          this.post = response;
        })
        .then(() => {
          this.descriptionc.innerHTML = md.render(this.post.description);
        });
    }
  }
}
