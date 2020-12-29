import { LitElement, html, customElement, property, css } from "lit-element";
import "../../../core/pages/containers/container";
import { serializeForm } from "../../../utils/utils";
import { UserRepositoryFactory } from "../infrastructure/user-repository-factory";
import { SiteService } from "../../site/infrastructure/site-service";
import { emptySite } from "../../shared/emptyObjects";
import { general } from "../../../../styles/general";
import { AuthorizationService } from "../../shared/auth/authorization-service";
import { UserHttpService } from "../infrastructure/user-http-service";
import { Router } from "@vaadin/router";

@customElement("first-user-c")
export class FirstUser extends LitElement {
  private userService = new UserHttpService(new AuthorizationService());
  private siteService = new SiteService();
  private userRepository = UserRepositoryFactory.build();
  public static styles = [
    css`
      p {
        max-width: 400px;
        margin: var(--l) 0;
        text-align: center;
        color: var(--text-lighter-color);
      }
      .logo {
        margin: calc(var(--xl) * 2) auto var(--l);
      }
    `,
    general
  ];
  render() {
    return html`
      <special-container-c>
        <img class="logo" src="logo.svg" alt="logo" />
        <h1>Usuario Admin</h1>
        <div>
          <p class="h5">
            Es necesario crear un nuevo usuario para poder administrar el CMS.
            Este es el único usuario que puede crear categorías y otros
            usuarios.
          </p>
        </div>
        <form-container-c>
          <form
            @submit="${(e: any) => this.handleSubmitRegister(e)}"
            id="register-form"
          >
            <input-c
              id="firstName"
              type="text"
              label="Nombre"
              placeholder="Nombre"
              name="firstName"
            ></input-c>
            <input-c
              id="secondName"
              type="text"
              label="Apellidos"
              placeholder="Apellidos"
              name="secondName"
            ></input-c>
            <input-c
              id="login"
              type="text"
              label="Login"
              placeholder="Login"
              name="login"
            ></input-c>
            <input-c
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              name="email"
            ></input-c>
            <input-c
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              name="password"
            ></input-c>
            <p class="btn-container" style="overflow: hidden; margin-bottom:0">
              <button-c type="submit" align="right">Enviar</button-c>
            </p>
          </form>
        </form-container-c>
      </special-container-c>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    if (await this.userRepository.findAdmin()) {
      window.location.href = "/";
    }
  }

  handleSubmitRegister = async (e: any) => {
    e.preventDefault();
    const target = e.target;
    const values = serializeForm(target);
    await this.userService.signup({ ...values, admin: true }).then(response => {
      this.siteService.createSite(emptySite);
      Router.go("/admin/update-site");
    });
  };
}
