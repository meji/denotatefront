import { css, customElement, html, LitElement, property } from 'lit-element'
import { Router } from '@vaadin/router'
import { AuthorizationService } from '../../../featured/shared/auth/authorization-service'
import { UserHttpService } from '../../../featured/users/infrastructure/user-http-service'
import { getAdminUrl } from '../../../utils/utils'

@customElement('container-full-c')
export class PublicContainerFull extends LitElement {
  @property({ type: Boolean }) islogged = false

  userService = new UserHttpService(new AuthorizationService())
  public static styles = css`
    button-c {
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
    main {
      background: var(--background-total-color);
    }
    .body {
      background: var(--background-total-color);
      padding: var(--xl) var(--m);
    }
  `
  render() {
    return html`
      <main>
        ${this.islogged
          ? html`
              <button-c
                id="admin-btn"
                @click="${() => {
                  this.handleAdmin()
                }}"
                size="small"
                >Admin</button-c
              >
            `
          : ''}
        <header-c transparent=${true}></header-c>
        <slot name="featured"></slot>
        <div class="body">
          <body-container-c>
            <slot></slot>
          </body-container-c>
        </div>
        <footer-c></footer-c>
      </main>
    `
  }
  async connectedCallback() {
    super.connectedCallback()
    this.islogged = await this.userService.thisIsLogged()
  }

  handleAdmin = () => {
    Router.go(getAdminUrl())
    this.requestUpdate()
  }
}
