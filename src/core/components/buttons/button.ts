import {customElement, html, LitElement, property, query} from 'lit-element';
import {this_styles} from './styles';

@customElement("button-c")
export class Button extends LitElement {
  public static styles = [this_styles];
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
