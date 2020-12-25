import { LitElement, html, customElement } from "lit-element";
import "../../core/components/index";
import "../../core/components/forms/container-form";
import "../../core/components/forms/inputs/input-base";
import "../../core/components/buttons/button";

import { Commands, Context } from "@vaadin/router";
import { UserHttpService } from "../../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../../featured/shared/auth/authorization-service";

@customElement("login-page-c")
export class Home extends LitElement {
  handleSublmit = (e: any) => {
    //   const userHttpService = new UserHttpService(new AuthorizationService())
    // const values = this.shadowRoot.querySelector(form-c).values
    //   await userHttpService.login({ login: "jmmeji", password: "1234" }).then(()=>window.location.href="/")
    console.log(e.target!.values);
  };

  render() {
    return html`
      <h1>Login</h1>
      <form onsubmit="#">
        <input-c
          id="login"
          type="text"
          label="user"
          placeholder="user"
          name="login"
        ></input-c>
        <input-c
          id="password"
          type="password"
          label="password"
          placeholder="password"
          name="password"
        ></input-c>
        <button-c type="submit">Enviar</button-c>
      </form>
      <slot></slot>
    `;
  }
}
