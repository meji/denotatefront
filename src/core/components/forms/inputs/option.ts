import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
  PropertyValues
} from "lit-element";
import { this_styles } from "./option_styles";

@customElement("option-c")
export class Option extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: String }) name = "";
  @property({ type: String }) label = "";
  @property({ type: String }) type = "";
  public static styles = [this_styles];
  @query("input")
  el!: Element;
  render() {
    return html`
      <div class="option-item">
        <label class="form-check-label">
          <input
            class="input-element ${this.type}-button__input"
            type="${this.type}"
            name="${this.name}"
            ?checked=${this.checked}
          />
          <span class="${this.type}-button__control"></span>
          <span class="${this.type}-button__label">${this.label}</span>
        </label>
      </div>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
  }
}
