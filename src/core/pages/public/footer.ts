import {
  LitElement,
  html,
  customElement,
  property,
  query,
  css
} from "lit-element";

@customElement("footer-c")
export class Footer extends LitElement {
  public static styles = css`
    #footer {
      width: 100%;
      margin: 0;
      border-top: var(--border-form);
      padding: var(--xl);
      background: var(--background-color);
    }
  `;

  render() {
    return html`
      <footer id="footer">
        <p>Denotate® 2021 Todos los derechos reservados</p>
      </footer>
    `;
  }
}
