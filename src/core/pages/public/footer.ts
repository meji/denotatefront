import { css, customElement, html, LitElement } from 'lit-element'
import { Router } from '@vaadin/router'

@customElement('footer-c')
export class Footer extends LitElement {
  public static styles = css`
    #footer {
      width: 100%;
      margin: 0;
      border-top: var(--border-form);
      padding: var(--xl);
      background: var(--background-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    }
    #footer * {
      font-family: var(--title-font);
    }
    #footer .link {
      cursor: pointer;
    }
  `

  render() {
    return html`
      <footer id="footer">
        <p>
          Denotate® 2021 Todos los derechos reservados |
          <span class="link" @click=${() => Router.go('/admin')}>Administración</span>
        </p>
      </footer>
    `
  }
}
