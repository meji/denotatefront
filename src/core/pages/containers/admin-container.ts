import {
  LitElement,
  html,
  customElement,
  css,
  query,
  PropertyValues
} from "lit-element";
import { this_styles } from "./admin-container-styles";
import { this_styles as adminStyles } from "../public/header_style";
import { Router } from "@vaadin/router";

@customElement("admin-container-c")
export class AdminContainer extends LitElement {
  public static styles = [this_styles, adminStyles];
  render() {
    return html`
      <div>
        <main id="maincontainer">
          <header id="headerc">
            <img
              src="/logo.svg"
              alt="logo"
              @click="${() => Router.go("/admin")}"
            />
            <span id="menu-icon" @click="${e => this.handleClick(e)}"
              ><div></div
            ></span>
          </header>
          <div class="menu">
            <admin-menu-c id="menu" />
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </main>
      </div>
    `;
  }

  handleClick = e => {
    const el = e.target.closest("#maincontainer");
    el.classList.toggle("open");
  };

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    let prevHash = window.location.href;
    const ethis = this;
    console.log(this);
    if (window.outerWidth < 1024) {
      window.setInterval(function(e) {
        if (window.location.href != prevHash) {
          prevHash = window.location.href;
          ethis.shadowRoot
            .querySelector("maincontainer")
            .classList.remove("open");
        }
      }, 100);
    }
  }
}
