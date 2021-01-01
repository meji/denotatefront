import {customElement, html, LitElement, property} from 'lit-element';
import {PostRepositoryFactory} from '../../../featured/posts/infrastructure/post-repository-factory';
import {Post} from '../../../featured/posts/domain/post';
import {general} from '../../../styles/general';
import {publicStyles} from '../../../styles/public';
import {emptyPost} from '../../../featured/shared/emptyObjects';

@customElement("home-c")
export class HomeComponent extends LitElement {
  postRepository = PostRepositoryFactory.build();
  @property() post: Partial<Post> = emptyPost;
  @property() posts = [] as Post[];
  public static styles = [general, publicStyles];

  render() {
    return html`
      <div>
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
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    await new Promise(r => setTimeout(r, 0));
    await this.postRepository.findAll().then(response => {
      if (response.length > 0) {
        this.posts = response.filter(post => {
          return post.featured == true;
        });
      }
    });
  }
}
