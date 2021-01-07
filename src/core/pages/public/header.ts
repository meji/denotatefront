import { customElement, html, LitElement, property, query } from 'lit-element'
import { CategoryRepositoryFactory } from '../../../featured/categories/infrastructure/category-repository-factory'
import { Category } from '../../../featured/categories/domain/category'
import { Router } from '@vaadin/router'
import { SiteService } from '../../../featured/site/infrastructure/site-service'
import { emptyCategory, emptySite } from '../../../featured/shared/emptyObjects'
import { general } from '../../../styles/general'
import { this_styles } from './header_style'

@customElement('header-c')
export class Header extends LitElement {
  private categoryRepository = CategoryRepositoryFactory.build()
  siteService = new SiteService()

  public static styles = [general, this_styles]
  @property() categories: Partial<Category>[] = [emptyCategory]
  @property() site = emptySite
  @property({ type: Boolean }) transparent: boolean = false
  @query('#header') headerElement: HTMLElement | undefined

  render() {
    return this.site
      ? html`
          <header id="header" class=${this.transparent ? 'transparent' : ''}>
            <img
              src=${this.site.logo
                ? process.env.API_URI + '/uploads/' + this.site.logo
                : '/logo.svg'}
              alt="logo"
              @click="${() => Router.go('/')}"
              class="${this.site.logo == '' ? 'default' : 'custom'} ${!this.site.logo
                ? this.site.theme != 'dark'
                  ? 'invert'
                  : ''
                : ''} "
            />
            <nav>
              <ul>
                ${this.categories.map(
                  category =>
                    html`
                      <li>
                        <span
                          class="link"
                          title="Ver"
                          @click="${() =>
                            Router.go(`/categorias/${category.title}?id=${category.id}`)}"
                          >${category.title}</span
                        >
                      </li>
                    `
                )}
              </ul>
            </nav>
            <span id="menu-icon"><div></div></span>
          </header>
        `
      : null
  }

  async connectedCallback() {
    super.connectedCallback()
    this.categories = [emptyCategory]
    await this.categoryRepository.findAll().then(response => {
      this.categories = response
    })
    await this.siteService.getSite().then(response => {
      response ? (this.site = response) : null
    })
    this.headerElement!.querySelector('#menu-icon')!.addEventListener('click', () => {
      this.shadowRoot!.querySelector('header')!.classList.toggle('open')
    })
    let prevHash = window.location.href
    const ethis = this
    if (window.outerWidth < 1024) {
      window.setInterval(function() {
        if (window.location.href != prevHash) {
          prevHash = window.location.href
          ethis.shadowRoot!.querySelector('header')!.classList.remove('open')
        }
      }, 100)
    }
    window.addEventListener('scroll', () => {
      window.scrollY > 0
        ? ethis.shadowRoot!.querySelector('header')!.classList.add('scroll')
        : ethis.shadowRoot!.querySelector('header')!.classList.remove('scroll')
    })
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    const ethis = this
    window.removeEventListener('scroll', () => {
      window.scrollY > 0
        ? ethis.shadowRoot!.querySelector('header')!.classList.add('scroll')
        : ethis.shadowRoot!.querySelector('header')!.classList.remove('scroll')
    })
  }
}
