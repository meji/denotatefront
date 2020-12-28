import {
  LitElement,
  html,
  customElement,
  property,
  query,
  PropertyValues
} from "lit-element";
import { PostRepositoryFactory } from "../infrastructure/post-repository-factory";
import { Post } from "../domain/post";
import { emptyPost } from "../../shared/emptyObjects";
import { publicStyles } from "../../../../styles/public";
import { general } from "../../../../styles/general";

@customElement("post-module-c")
export class PostHome extends LitElement {
  postRepository = PostRepositoryFactory.build();
  @property() post: Partial<Post> = emptyPost;
  public static styles = [general, publicStyles];

  render() {
    return html`
      <div class="module">
        <img
          src="${process.env.API_URI + this.post.img}"
          alt="${this.post.title}"
          title="${this.post.title}"
        />
        <h2>${this.post.title}</h2>
        <p>${this.post.brief}</p>
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
  }
}
