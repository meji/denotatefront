import {customElement, html, LitElement, property, PropertyValues, query} from 'lit-element';
import {publicStyles} from '../../../styles/public';
import {general} from '../../../styles/general';
import {this_styles} from './styles';

@customElement('notice-c')
export class Notice extends LitElement {
  @property({
    type: String,
    hasChanged(newVal: string, oldVal: string) {
      if (newVal != oldVal) {
        return true
      } else {
        return false
      }
    }
  })
  message: String = ''
  @property({ type: String }) type: string = ''
  @query('.notice') noticep: HTMLElement | undefined

  public static styles = [general, publicStyles, this_styles]

  render() {
    return html`
      <div>
        <p class="${this.type} notice">
          ${this.message}
        </p>
      </div>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties)
    this.noticep!.classList.remove('active')
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    const ethis = this
    this.noticep!.classList.add('active')
    setTimeout(function() {
      ethis.noticep!.classList.remove('active')
    }, 2000)
  }
}
