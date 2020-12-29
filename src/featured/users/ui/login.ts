import { LitElement, html, customElement, query, css } from "lit-element";
import "../../../core/components";
import "../../../core/pages/containers/container";
import { UserHttpService } from "../infrastructure/user-http-service";
import { AuthorizationService } from "../../shared/auth/authorization-service";
import { serializeForm } from "../../../utils/utils";
import { general } from "../../../../styles/general";

@customElement("login-page-c")
export class Home extends LitElement {
  public static styles = [general, css``];
  handleSubmit = async (e: any) => {
    e.preventDefault();
    const userHttpService = new UserHttpService(new AuthorizationService());
    const values = serializeForm(e.target);
    const target = e.target;
    await userHttpService.login(values).then(() => {
      target.reset();
      window.location.href = "/admin";
    });
  };

  render() {
    return html`
      <special-container-c>
        <form-container-c size="medium">
          <form @submit="${(e: any) => this.handleSubmit(e)}" id="login-form">
            <h1 class="center">Login</h1>
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
            <p class="btn-container">
              <button-c type="submit">Enviar</button-c>
            </p>
          </form>
          <slot></slot>
        </form-container-c>
      </special-container-c>
    `;
  }
}
