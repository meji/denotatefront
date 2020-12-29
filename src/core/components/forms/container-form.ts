import { LitElement, html, customElement, css, property } from "lit-element";
import { this_styles } from "./container-form-styles";

@customElement("form-container-c")
export class ContainerForm extends LitElement {
  public static styles = [this_styles];
  @property({ type: String }) size = "medium";
  @property({ type: String }) class = "";

  render() {
    return html`
      <div class="form-container ${this.size} ${this.class}">
        <slot></slot>
      </div>
    `;
  }
}
