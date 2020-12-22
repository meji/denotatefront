import { LitElement, html, customElement, property } from "lit-element";
import { Post } from "../../featured/posts/domain/post";
import { PostRepositoryFactory } from "../../featured/posts/infrastructure/post-repository-factory";

@customElement("home-page")
export class Home extends LitElement {
  @property({ type: Array }) posts: Post[] | undefined;
  connectedCallback() {
    super.connectedCallback();
    const postRepositoryFactory = PostRepositoryFactory.build();
    postRepositoryFactory
      .create({
        title: "Esta es un post7668",
        brief: "Esto es un briuef",
        description: "Esta es una descrición",
        img: "Esta es la url de la imagen",
        featured: true
      })
      .then(response => {
        this.posts = [response];
      });
  }
  render() {
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
