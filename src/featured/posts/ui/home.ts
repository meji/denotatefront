import { LitElement, html, customElement, property } from "lit-element";
import { PostRepositoryFactory } from "../infrastructure/post-repository-factory";
import { getId } from "../../../utils/utils";
import { Post } from "../domain/post";
import { ID } from "../../shared/id/id";
import { emptyPost } from "../../shared/emptyObjects";

@customElement("post-home-c")
export class PostHome extends LitElement {
  postRepository = PostRepositoryFactory.build();
  @property() post: Partial<Post> = emptyPost;

  render() {
    return html`
      <body-container-c>
        <h1>${this.post.title}</h1>
        <p>${this.post.brief}</p>
        <div>${this.post.description}</div>
        <slot></slot>
      </body-container-c>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    const id = getId();
    console.log("id", id);
    console.log(id);
    if (id) {
      await this.postRepository.getById(id).then(response => {
        console.log(response);
        this.post = response;
        console.log(this.post);
      });
    }
  }
}
