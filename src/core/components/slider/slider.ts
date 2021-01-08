import { customElement, html, LitElement, property, PropertyValues, query } from 'lit-element'
import { publicStyles } from '../../../styles/public'
import { general } from '../../../styles/general'
import { this_styles } from './styles'
type element = {
  title: string
  img: string
  brief: string
  id: string
}
import Swiper from 'swiper/bundle'
import { Router } from '@vaadin/router'

@customElement('slider-c')
export class Slider extends LitElement {
  public static styles = [general, publicStyles, this_styles]
  @property() elements: element[] = []
  @query('.swiper-container') slider!: HTMLElement
  @query('.swiper-pagination') pagination!: HTMLElement
  @query('.swiper-button-next') next!: HTMLElement
  @query('.swiper-button-prev') prev!: HTMLElement

  render() {
    return html`
      <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
      <div class="swiper-container">
        <div class="swiper-wrapper">
          ${this.elements.map((el: element) => {
            return html`
              <div class="swiper-slide">
                <div class="img-container">
                  <img src=${process.env.API_URI + '/uploads/' + el.img} />
                </div>
                <div class="data">
                  <h2 @click=${() => Router.go('/categorias/' + el.title + '?id=' + el.id)}>
                    ${el.title}
                  </h2>
                  <p @click=${() => Router.go('/categorias/' + el.title + '?id=' + el.id)}>
                    ${el.brief}
                  </p>
                </div>
              </div>
            `
          })}
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    const ethis = this
    setTimeout(() => {
      new Swiper(ethis.slider, {
        autoplay: true,
        loop: true,
        pagination: {
          el: ethis.pagination
        },
        navigation: {
          nextEl: ethis.next,
          prevEl: ethis.prev
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      })
    }, 2000)
  }
}
