import {customElement, html, LitElement, property} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {this_styles} from './input_styles';

@customElement("input-c")
export class Input extends LitElement {
  static styles = [this_styles];
  @property({ type: String }) value = "";
  @property({ type: String }) errMsg = "";
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
          @blur="${(e: any) => {
            this.checkValidity(e.target);
          }}"
        />
        ${this.label
          ? html`
              <label>${this.label}</label>
            `
          : null}
        ${this.errMsg
          ? html`
              <p class="err">${this.errMsg}</p>
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

  checkValidity = (input: HTMLInputElement) => {
    this.errMsg = input.validationMessage ? input.validationMessage : "";
  };
}
