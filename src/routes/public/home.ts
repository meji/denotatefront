import { LitElement, html, customElement, property } from 'lit-element';
import { Post } from '../../featured/posts/domain/post';
import { PostRepositoryFactory } from '../../featured/posts/infrastructure/post-repository-factory';

@customElement('home-page')
export class Home extends LitElement {
  @property({ type: Array }) posts: Post[] | undefined;
  render() {
    console.log(this.posts);
    const postRepositoryFactory = PostRepositoryFactory.build();
    postRepositoryFactory.findAll().then(response => {
      this.posts = response;
    });

    return html`
      ${this.posts}
      <p>Hola</p>
      <slot></slot>
    `;
  }
}
