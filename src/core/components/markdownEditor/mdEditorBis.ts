import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query
} from "lit-element";
// import { md } from "./md";
const SimpleMde = require("simplemde");
@customElement("md-editor-bis-c")
export class MdEditor extends LitElement {
  @query("#container") previewcontainer;
  @query("#textarea_id") mdeditor;
  @property({ type: String }) value = "";
  @property({ type: String }) initialValue;
  // @property() rederedValue = md.render(this.value);
  simpleMde;
  async firstUpdated() {
    await new Promise(r => setTimeout(r, 0));
    const properties = {
      element: this.mdeditor,
      spellChecker: false,
      promptURLs: true,
      placeholder: "Let's MarkDown",
      forceSync: true
    };
    this.simpleMde = new SimpleMde(properties);
    setTimeout(() => this.simpleMde.value(this.initialValue), 100);
  }

  _hadleChange = e => {
    this.value = this.simpleMde.value();
  };
  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div @input="${e => this._hadleChange(e)}">
        <textarea id="textarea_id"> </textarea>
      </div>
    `;
  }
}
