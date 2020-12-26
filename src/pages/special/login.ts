import { LitElement, html, customElement, query } from "lit-element";
import "../../core/components";

import { Commands, Context } from "@vaadin/router";
import { UserHttpService } from "../../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../../featured/shared/auth/authorization-service";
import { LitElementLight } from "../../featured/shared/lit-light-element/lit-light-element";
import { serializeForm } from "../../utils/utils";

@customElement("login-page-c")
export class Home extends LitElementLight {
  handleSubmit = async (e: any) => {
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
      <form-container-c>
        <form @submit="${(e: any) => this.handleSubmit(e)}" id="login-form">
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
      </form-container-c>
    `;
  }
}
