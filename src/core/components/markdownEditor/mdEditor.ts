import "@github/markdown-toolbar-element";
import { customElement, html, LitElement, property, query } from "lit-element";
import { md } from "./md";

@customElement("md-editor-c")
export class MdEditor extends LitElement {
  @query("#container") mdContainer;
  @property({ type: String }) value = "";
  _hadleChange = e => {
    this.value = e.target.value;
    this.mdContainer.innerHTML = md.render(e.target.value);
  };
  render() {
    return html`
      <markdown-toolbar for="textarea_id">
        <md-bold><button-c size="extrasmall">bold</button-c></md-bold>
        <md-header><button-c size="extrasmall">header</button-c></md-header>
        <md-italic><button-c size="extrasmall">italic</button-c></md-italic>
        <md-quote><button-c size="extrasmall">quote</button-c></md-quote>
        <md-code><button-c size="extrasmall">code</button-c></md-code>
        <md-link><button-c size="extrasmall">link</button-c></md-link>
        <md-image><button-c size="extrasmall">image</button-c></md-image>
        <md-unordered-list
          ><button-c size="extrasmall"
            >unordered-list</button-c
          ></md-unordered-list
        >
        <md-ordered-list
          ><button-c size="extrasmall">ordered-list</button-c></md-ordered-list
        >
        <md-task-list
          ><button-c size="extrasmall">task-list</button-c></md-task-list
        >
        <md-mention><button-c size="extrasmall">mention</button-c></md-mention>
        <md-ref><button-c size="extrasmall">ref</button-c></md-ref>
        <button data-md-button>
          <button-c size="extrasmall">Custom button</button-c>
        </button>
      </markdown-toolbar>
      <div></div>
      <textarea id="textarea_id" @input="${e => this._hadleChange(e)}">
      </textarea>
      <div id="container"></div>
    `;
  }
}
