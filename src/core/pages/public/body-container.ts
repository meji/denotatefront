import { customElement, html, LitElement } from 'lit-element'
import { general } from '../../../styles/general'
import { this_styles } from './body-container-styles'

@customElement('body-container-c')
export class PublicContainer extends LitElement {
  public static styles = [general, this_styles]
  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `
  }
}
