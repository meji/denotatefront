import { customElement, html, LitElement, property, query } from 'lit-element'
import { PostRepositoryFactory } from '../infrastructure/post-repository-factory'
import { getId } from '../../../utils/utils'
import { Post } from '../domain/post'
import { emptyPost } from '../../shared/emptyObjects'
import { md } from '../../../core/components/markdownEditor/md'
import { publicStyles } from '../../../styles/public'
import { general } from '../../../styles/general'
import { Router } from '@vaadin/router'
import { CategoryRepositoryFactory } from '../../categories/infrastructure/category-repository-factory'
import { Category } from '../../categories/domain/category'

@customElement('post-home-c')
export class PostHome extends LitElement {
  postRepository = PostRepositoryFactory.build()
  categoryRepository = CategoryRepositoryFactory.build()
  @property() post: Partial<Post> = emptyPost
  @property() description = ''
  @property() cats: Category[] = []
  @query('#description') descriptionc: HTMLElement | undefined
  public static styles = [general, publicStyles]

  render() {
    return html`
      <div>
        <h1>${this.post.title}</h1>
        ${this.post.img
          ? html`
              <div class="img-container featured">
                <img
                  src="${process.env.API_URI + '/uploads/' + this.post.img}"
                  alt="${this.post.title}"
                  title="${this.post.title}"
                />
              </div>
              <div class="brief">${this.post.brief}</div>
            `
          : null}
        <div id="description"></div>
        ${this.post.tags
          ? html`
              <h4>Tags:</h4>
              ${this.post.tags.map(tag => {
                return html`
                  <span class="tag" @click="${() => Router.go(`/tag?id=${tag}`)}">🏷️ ${tag}</span>
                `
              })}
            `
          : null}
      </div>
    `
  }
  async connectedCallback() {
    super.connectedCallback()
    const id = getId()
    !id ? Router.go('/not-found') : null
    if (id) {
      await this.postRepository
        .getById(id)
        .then(response => {
          this.post = response
          response.cats &&
            response.cats.map(cat => {
              this.categoryRepository.getById(cat).then(response => this.cats.push(response))
            })
        })
        .then(() => {
          this.descriptionc!.innerHTML = md.render(this.post.description)
        })
    }
  }
}
