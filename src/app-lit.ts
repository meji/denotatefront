import { css, customElement, html, LitElement, property } from 'lit-element'
import { theme } from './styles/theme'
import { general } from './styles/general'
import { SiteService } from './featured/site/infrastructure/site-service'
import { Router } from '@vaadin/router'
import './core/index'

@customElement('app-lit')
export class AppLit extends LitElement {
  @property({ type: String }) color = '#4bac95'
  @property({ type: String }) theme = 'light'
  @property({ type: String }) notMessage = ''
  @property({ type: String }) notType = ''

  public static styles = [
    theme,
    general,
    css`
      #wrapper {
        background: var(--background-wrapper);
        background-size: var(--background-wrapper-size);
        min-width: 100%;
        min-height: 100vh;
        overflow: auto;
        font-family: var(--body-font);
      }
      @import url('https://fonts.googleapis.com/css2?family=Cardo&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
    `
  ]

  render() {
    return html`
      <div id="wrapper" class="${this.theme}">
        <notice-c message=${this.notMessage} type=${this.notType}></notice-c>
        <style>
          #wrapper {
            --main-color: ${this.color} !important;
          }
        </style>
        <slot></slot>
      </div>
    `
  }
  async connectedCallback() {
    super.connectedCallback()
    const siteService = new SiteService()
    const site = await siteService.getSite()

    if (site) {
      this.color = site.color
      this.theme = site.theme
    } else {
      Router.go('/newsite')
    }
  }

  _handleChangeTheme = (e: any) => {
    this.theme = e.detail.theme
  }

  _updateNotification = (e: any) => {
    this.notMessage = e.detail.message
    this.notType = e.detail.type
    setTimeout(() => (this.notMessage = ''), 2000)
  }

  async firstUpdated() {
    await new Promise(r => setTimeout(r, 0))
    this.addEventListener('change-theme', this._handleChangeTheme)
    window.addEventListener('notification-event', this._updateNotification)
  }
  disconnectedCallback() {
    this.removeEventListener('change-theme', this._handleChangeTheme)
    window.removeEventListener('notification-event', this._updateNotification)
    super.disconnectedCallback()
  }
}
