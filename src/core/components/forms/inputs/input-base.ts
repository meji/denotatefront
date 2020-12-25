import { LitElement, html, customElement, css, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

@customElement("input-c")
export class Input extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }
    .form-group {
      position: relative;
      margin: 1rem 0;
    }
    input.outline {
      border: 1px solid --var(main-color);
      border-radius: 5px;
    }
    label {
      position: absolute;
      font-size: 1rem;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      color: gray;
      padding: 0 0.3rem;
      margin: 0 0.5rem;
      transition: 0.1s ease-out;
      transform-origin: left top;
      pointer-events: none;
    }
    input {
      font-size: 1rem;
      outline: none;
      border: none;
      border-radius: 0px;
      padding: 1rem 0.6rem;
      color: #333333;
      transition: 0.1s ease-out;
      border-bottom: 1px solid #333333;
      background: transparent;
      cursor: text;
      margin-left: auto;
      width: 95%;
      margin-right: auto;
    }
    input:focus {
      border-color: #b949d5;
    }
    input:focus + label {
      color: #b949d5;
      top: 0;
      transform: translateY(-50%) scale(0.9);
    }
    input:not(:placeholder-shown) + label {
      top: 0;
      transform: translateY(-50%) scale(0.9);
    }
    input:focus:not(.outline) ~ label,
    input:not(:placeholder-shown):not(.outline) ~ label {
      padding-left: 0px;
    }
    input:disabled,
    input:disabled ~ .label {
      opacity: 0.5;
    }
  `;
  @property({ type: String }) value = "";
  @property({ type: String }) name = "";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) label = "";
  @property({ type: String }) type = "";
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) size = "";
  @property({ type: Boolean }) outline = true;

  render() {
    return html`
      <div class="form-group">
        <input
          class=${classMap({
            outline: this.outline,
            size: this.size
          })}
          autocomplete="off"
          type=${this.type}
          value=${this.value}
          .placeholder="${this.placeholder}"
          .name="${this.name}"
          .disabled="${this.disabled}"
          .required="${this.required}"
          @input="${(e: any) => this.handleChange(e)}"
          @keyup="${(e: any) => this.handleChange(e)}"
          @keypress="${(e: any) => this.handleKeyPress(e)}"
        />
        ${this.label
          ? html`
              <label>${this.label}</label>
            `
          : null}
      </div>
    `;
  }

  private handleKeyPress = (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const fakeSubmit = document.createElement("button");
      fakeSubmit.type = "submit";
      fakeSubmit.style.display = "none";
      this.closestElement("form").appendChild(fakeSubmit);
      fakeSubmit.click();
      fakeSubmit.remove();
    }
  };
  private handleChange = (e: any) => {
    const { value, name } = this;
    const el = this.closestElement("form");
    this.renderInputOutsideShadowRoot(el, name, value);
    this.value = e.target.value;
    this.name = e.target.name;
  };
  private renderInputOutsideShadowRoot(
    container: HTMLElement,
    name: string,
    value: string | null
  ) {
    let input = container.querySelector(
      "input.hidden-input.input-" + this.name
    ) as HTMLInputElement | null;
    if (!input) {
      input = container.ownerDocument.createElement("input");
      input.type = "hidden";
      input.classList.add("hidden-input");
      input.classList.add("input-" + this.name);
      input.name = name;
      input.value = value || "";
      container.appendChild(input);
    } else {
      input.value = value || "";
    }
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
