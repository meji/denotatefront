import { LitElement, html, customElement, query } from "lit-element";
import "../../core/components/index";
import "../../core/components/forms/container-form";
import "../../core/components/forms/inputs/input-base";
import "../../core/components/buttons/button";

import { Commands, Context } from "@vaadin/router";
import { UserHttpService } from "../../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../../featured/shared/auth/authorization-service";

var serializeForm = function(form: HTMLFormElement) {
  var obj = {};
  var formData = new FormData(form);
  for (let key of formData.keys()) {
    // @ts-ignore
    obj[key] = formData.get(key);
  }
  return obj;
};

@customElement("login-page-c")
export class Home extends LitElement {
  handleSublmit = async (e: any) => {
    e.preventDefault();
    const userHttpService = new UserHttpService(new AuthorizationService());
    const values = serializeForm(e.target);
    const target = e.target;
    await userHttpService.login(values).then(() => {
      target.reset();
      window.location.href = "/";
    });
  };

  render() {
    return html`
      <h1>Login</h1>
      <form @submit='${(e: any) => this.handleSublmit(e)}' id='login-form'>
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
      </form>
      <slot></slot>
    `;
  }
}
