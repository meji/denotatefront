import { customElement, html, LitElement, property, PropertyValues, query } from 'lit-element'
import { publicStyles } from '../../../styles/public'
import { general } from '../../../styles/general'
import { this_styles } from './styles'
type element = {
  title: string
  img: string
  brief: string
}
// import Swiper JS
import Swiper, { Navigation, Pagination } from 'swiper'
Swiper.use([Navigation, Pagination])

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
      <div class="swiper-container">
        <div class="swiper-wrapper">
          ${this.elements.map((el: element) => {
            return html`
              <div class="swiper-slide">
                <div class="img-container">
                  <img src=${process.env.API_URI + '/uploads/' + el.img} />
                </div>
                <div class="data">
                  <h2>${el.title}</h2>
                  <p>${el.brief}</p>
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
    const swiper = new Swiper(ethis.slider, {
      loop: true,
      pagination: {
        el: ethis.pagination
      },
      navigation: {
        nextEl: ethis.next,
        prevEl: ethis.prev
      }
    })
    return swiper
  }
}
