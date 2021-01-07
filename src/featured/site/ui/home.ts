import { customElement, html, LitElement, property } from 'lit-element'
import { PostRepositoryFactory } from '../../posts/infrastructure/post-repository-factory'
import { Post } from '../../posts/domain/post'
import { general } from '../../../styles/general'
import { publicStyles } from '../../../styles/public'
import { Category } from '../../categories/domain/category'
import { CategoryRepositoryFactory } from '../../categories/infrastructure/category-repository-factory'

@customElement('home-c')
export class HomeComponent extends LitElement {
  postRepository = PostRepositoryFactory.build()
  categoryRepository = CategoryRepositoryFactory.build()
  @property() posts = [] as Post[]
  @property() categories = [] as Category[]
  public static styles = [general, publicStyles]

  render() {
    return html`
      <container-full-c>
        <div class="cats-container" slot="featured">
          <slider-c .elements=${this.categories}></slider-c>
        </div>
        <div class="posts-container">
          ${this.posts.length > 0
            ? html`
                <ul class="modules-container">
                  ${this.posts.map(post => {
                    return html`
                      <li><post-module-c .post="${post}"></post-module-c></li>
                    `
                  })}
                </ul>
              `
            : ''}
        </div>
      </container-full-c>
    `
  }

  async connectedCallback() {
    super.connectedCallback()
    await new Promise(r => setTimeout(r, 0))
    await this.postRepository.findAll().then(response => {
      if (response.length > 0) {
        this.posts = response.filter(post => {
          return post.featured == true
        })
      }
    })
    await this.categoryRepository.findAll().then(response => {
      if (response.length > 0) {
        this.categories = response.filter(cat => {
          return cat.featured == true
        })
      }
    })
  }
}
