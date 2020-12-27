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
  public static styles = css`
    button {
      font-family: var(--body-text-font);
      padding: calc(var(--m)) calc(var(--l) * 2);
      font-size: 100%;
      background: var(--main-color);
      border: 1px solid var(--main-color);
      color: var(--text-body-color);
      border-radius: var(--rm);
    }
    button.small {
      padding: var(--s) var(--m);
    }
    button.extrasmall {
      padding: calc(var(--s) / 2) var(--s);
    }
    button:hover {
      background: var(--background-color);
      color: var(--main-color);
      cursor: pointer;
    }
    button.right {
      float: right;
    }
  `;
  @property({ type: Boolean }) submit = false;
  @property({ type: String }) size = "";
  @property({ type: String }) type = "";
  @property({ type: String }) align = "";

  @query("button")
  el!: Element;

  handleClick(event: Event) {
    const form = this.closestElement("form");
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
        class="${this.size} ${this.type} ${this.align}"
        type="${this.submit ? "submit" : "button"}"
        @click="${(e: any) => this.handleClick(e)}"
      >
        <slot></slot>
      </button>
    `;
  }

  private closestElement(
    selector: any,
    base = this,
    __Closest = (el: any, found = el && el.closest(selector)): any =>
      !el || el === document || el === window
        ? null
        : found
        ? found
        : __Closest(el.getRootNode().host)
  ) {
    return __Closest(base);
  }
}
