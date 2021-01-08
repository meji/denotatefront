import { customElement, html, LitElement, property } from 'lit-element'
import { Post } from '../../../featured/posts/domain/post'
import { emptyPost } from '../../../featured/shared/emptyObjects'
import { publicStyles } from '../../../styles/public'
import { general } from '../../../styles/general'
import { this_styles } from './styles'
import { Router } from '@vaadin/router'

@customElement('post-module-c')
export class PostHome extends LitElement {
  @property() post: Partial<Post> = emptyPost
  public static styles = [general, publicStyles, this_styles]

  render() {
    return html`
      <div class="module" @click="${() => Router.go(`/post?id=${this.post.id}`)}">
        ${this.post.img
          ? html`
              <div class="img-container">
                <img
                  src="${process.env.API_URI + '/uploads/' + this.post.img}"
                  alt="${this.post.title}"
                  title="${this.post.title}"
                />
              </div>
            `
          : null}
        <h2 class="h4">${this.post.title}</h2>
        <div class="brief">
          ${this.post.brief && this.post.brief.substring(0, 70)}...
        </div>
      </div>
    `
  }
}
