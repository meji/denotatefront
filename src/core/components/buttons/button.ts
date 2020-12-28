import {
  LitElement,
  html,
  customElement,
  css,
  property,
  eventOptions,
  query
} from "lit-element";

@customElement("button-c")
export class Button extends LitElement {
  public static styles = css`
    button {
      font-family: var(--body-text-font);
      padding: calc(var(--m)) calc(var(--l) * 2);
      font-size: 100%;
      border: 1px solid var(--main-color);
      border-radius: var(--rm);
      background: var(--background-color);
      color: var(--main-color);
    }
    button:hover span.text {
      //mix-blend-mode: difference;
      color: var(--body-text-color);
      //filter: brightness(0.5);
    }
    button.small {
      padding: var(--s) var(--m);
    }
    button.extrasmall {
      padding: calc(var(--s) / 2) var(--s);
    }
    button:hover {
      color: var(--text-body-color);
      cursor: pointer;
      background: var(--main-color);
    }
    button.right {
      float: right;
    }
    button.transparent {
      border: none;
      background: transparent !important;
      opacity: 0.7;
    }
    button.transparent:hover {
      opacity: 1;
    }
  `;
  @property({ type: Boolean }) submit = false;
  @property({ type: String }) size = "";
  @property({ type: String }) class = "";
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
        class="${this.size} ${this.type} ${this.align} ${this.class}"
        type="${this.submit ? "submit" : "button"}"
        @click="${(e: any) => this.handleClick(e)}"
      >
        <span class="text"><slot></slot></span>
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
