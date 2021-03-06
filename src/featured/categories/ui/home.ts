import { customElement, html, LitElement, property, query } from 'lit-element'
import { getId, setTitleDescription } from '../../../utils/utils'
import { CategoryRepositoryFactory } from '../infrastructure/category-repository-factory'
import { Category } from '../domain/category'
import { general } from '../../../styles/general'
import { PostRepositoryFactory } from '../../posts/infrastructure/post-repository-factory'
import { publicStyles } from '../../../styles/public'
import { Router } from '@vaadin/router'
import { emptyCategory } from '../../shared/emptyObjects'
import { Post } from '../../posts/domain/post'
import { md } from '../../../core/components/markdownEditor/md'

@customElement('category-home-c')
export class CategoryHome extends LitElement {
  categoryRepository = CategoryRepositoryFactory.build()
  postRepository = PostRepositoryFactory.build()
  @property() category: Partial<Category> = emptyCategory
  @property() posts = [] as Post[]
  @query('#description') descriptionc: HTMLElement | undefined
  public static styles = [general, publicStyles]

  render() {
    return this.category && this.category.title
      ? html`
          <div>
            <h1>${this.category.title}</h1>
            ${this.category.img
              ? html`
                  <div class="img-container featured">
                    <img
                      src="${process.env.API_URI + '/uploads/' + this.category.img}"
                      alt="${this.category.title}"
                      title="${this.category.title}"
                    />
                  </div>
                `
              : null}
            <div class="brief">${this.category.brief}</div>
            <div id="description"></div>
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
            <slot></slot>
          </div>
        `
      : null
  }

  async connectedCallback() {
    super.connectedCallback()
    await new Promise(r => setTimeout(r, 0))
    const id = getId()
    !id
      ? Router.go('/not-found')
      : await this.categoryRepository
          .getById(id)
          .then(response => {
            this.category = response
            setTitleDescription(response.title, response.brief ? response.brief : '')
            if (response.posts && response.posts.length > 0) {
              response.posts!.map(async post => {
                this.postRepository.getById(post).then(response => {
                  this.posts = [...this.posts, response]
                })
              })
            }
            return response
          })
          .then(response => {
            this.descriptionc!.innerHTML = md.render(response.description)
          })
  }
}
