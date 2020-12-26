import { LitElement, html, customElement, css, property } from "lit-element";

@customElement("form-container-c")
export class ContainerForm extends LitElement {
  public static styles = css`
    :host {
      display: block;
      max-width: 90%;
      margin: 0;
      background: var(--form-background-color);
      border-radius: var(--rl);
      padding: var(--l);
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
  `;
  @property({ type: String }) size = "medium";

  render() {
    return html`
      <div class="form-container ${this.size}">
        <slot></slot>
      </div>
    `;
  }
}
