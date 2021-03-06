import {customElement, html, LitElement} from 'lit-element';
import {this_styles} from './admin-container-styles';
import {this_styles as adminStyles} from '../public/header_style';
import {Router} from '@vaadin/router';

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
            <span
              id="menu-icon"
              @click="${(e: MouseEvent) => this.handleClick(e)}"
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

  handleClick = (e: any) => {
    const el = e.target!.closest("#maincontainer");
    el.classList.toggle("open");
  };
}
