import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query
} from "lit-element";
import { md } from "./md";
const SimpleMde = require("simplemde");
@customElement("md-editor-bis-c")
export class MdEditorBis extends LitElement {
  @query("#container") previewcontainer;
  @query("#textarea_id") mdeditor;
  @property({ type: String }) value = "";

  async firstUpdated() {
    await new Promise(r => setTimeout(r, 0));
    const properties = { element: this.mdeditor };
    const simpleMde = new SimpleMde(properties);
  }

  _hadleChange = e => {
    this.value = e.target.value;
    this.previewcontainer.innerHTML = md.render(e.target.value);
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
      <textarea id="textarea_id" @input="${e => this._hadleChange(e)}">
      </textarea>
      <div id="container"></div>
    `;
  }
}
