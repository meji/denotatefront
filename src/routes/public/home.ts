import { LitElement, html, customElement, property } from "lit-element";
import { Post } from "../../featured/posts/domain/post";
import { PostRepositoryFactory } from "../../featured/posts/infrastructure/post-repository-factory";

@customElement("home-page")
export class Home extends LitElement {
  @property({ type: Array }) posts: Post[] | undefined;
  connectedCallback() {
    super.connectedCallback();
    const postRepositoryFactory = PostRepositoryFactory.build();
    postRepositoryFactory.findAll().then(response => {
      this.posts = response;
    });
  }
  render() {
    console.log(this.posts);
    return html`
      ${this.posts?.map(
        post =>
          html`
            <p>nombre: ${post.title}</p>
          `
      )}
      <p>Hola</p>
      <slot></slot>
    `;
  }
}
