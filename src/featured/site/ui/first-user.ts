import { LitElement, html, customElement, property } from "lit-element";
import "../../../pages/special/container";
import { serializeForm } from "../../../utils/utils";
import { UserRepositoryFactory } from "../../users/infrastructure/user-repository-factory";
import { SiteService } from "../infrastructure/site-service";
import { emptySite } from "../../shared/emptyObjects";
import { general } from "../../../../styles/general";
import { AuthorizationService } from "../../shared/auth/authorization-service";

@customElement("first-user-c")
export class FirstUser extends LitElement {
  private userRepository = UserRepositoryFactory.build();
  private siteService = new SiteService();
  private autorizationService = new AuthorizationService();

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
    await this.userRepository
      .signup({ ...values, admin: true })
      .then(response => {
        this.siteService.createSite(emptySite);
        this.autorizationService.setToken(response);
        window.location.href = "/admin/update-site";
      });
  };
  public static style = [general];

  render() {
    return html`
      <special-container-c>
        <h1>Usuario Admin</h1>
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
            <p class="btn-container" style="overflow: hidden">
              <button-c type="submit" align="right">Enviar</button-c>
            </p>
          </form>
        </form-container-c>
      </special-container-c>
    `;
  }
}
