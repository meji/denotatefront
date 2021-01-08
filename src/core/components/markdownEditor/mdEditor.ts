import { customElement, html, LitElement, property, query } from 'lit-element'
import { this_styles } from './styles'

const SimpleMde = require('simplemde')
@customElement('md-editor-bis-c')
export class MdEditor extends LitElement {
  @query('#container') previewcontainer: HTMLElement | undefined
  @query('#textarea_id') mdeditor: HTMLElement | undefined
  @property({ type: String }) value = ''
  @property({ type: String }) initialValue = ''
  simpleMde: any
  public static styles = [this_styles]
  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css" />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div @input="${() => this._hadleChange()}" @paste="${() => this._hadleChange()}">
        <textarea id="textarea_id"> </textarea>
      </div>
    `
  }
  async firstUpdated() {
    await new Promise(r => setTimeout(r, 0))
    const properties = {
      element: this.mdeditor,
      spellChecker: false,
      promptURLs: true,
      placeholder: "Let's MarkDown",
      forceSync: true
    }
    this.simpleMde = new SimpleMde(properties)
    setTimeout(() => this.simpleMde.value(this.initialValue), 1000)
  }

  _hadleChange = () => {
    this.value = this.simpleMde.value()
  }
}
