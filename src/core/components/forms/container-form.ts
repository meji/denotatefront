import { LitElement, html, customElement, css, property } from "lit-element";

@customElement("form-container-c")
export class ContainerForm extends LitElement {
  public static styles = css`
    .form-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      max-width: 90%;
      margin: 0 0 var(--xl);
      background: var(--background-total-color);
      border-radius: var(--rl);
      padding: var(--xl) var(--l);
    }
    .medium {
      width: 400px;
    }
    .large {
      width: 800px;
    }
    .small {
      width: 400px;
    }
    .transparent {
      background: transparent;
      padding: 0;
    }
    ::slotted(.btn-container),
    .btn-container {
      margin-bottom: 0;
    }
  `;
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
