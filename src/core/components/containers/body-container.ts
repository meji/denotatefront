import { LitElement, html, customElement } from "lit-element";
import "../../../pages/public/header";
import { general } from "../../../../styles/general";
import { this_styles } from "./body-container-styles";

@customElement("body-container-c")
export class PublicContainer extends LitElement {
  public static styles = [general, this_styles];
  render() {
    return html`
      <di class='container'>
        <slot></slot>
      </div>
    `;
  }
}
