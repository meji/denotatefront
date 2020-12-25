import {
  LitElement,
  html,
  customElement,
  css,
  property,
  eventOptions,
  query
} from "lit-element";
import { classMap } from "lit-html/directives/class-map";

@customElement("button-c")
export class Button extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    :root {
      background: green;
      color: #fff;
    }
  `;
  @property({ type: Boolean }) submit = false;
  @property({ type: String }) size = "";
  @property({ type: String }) type = "";

  @query("button")
  el!: Element;

  handleClick(event: Event) {
    const form = this.el.closest("form");
    if (form && this.type == "submit") {
      event.preventDefault();
      const fakeSubmit = document.createElement("button");
      fakeSubmit.type = "submit";
      fakeSubmit.style.display = "none";
      form.appendChild(fakeSubmit);
      fakeSubmit.click();
      fakeSubmit.remove();
    }
  }

  render() {
    return html`
      <button
        class="${this.size} ${this.type}"
        type="${this.submit ? "submit" : "button"}"
        @click="${(e: any) => this.handleClick(e)}"
      >
        <slot></slot>
      </button>
    `;
  }
}
