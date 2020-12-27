import { LitElement, html, customElement, property } from "lit-element";
import "../../../pages/special/container";
import { getId, serializeForm } from "../../../utils/utils";
import { UserRepositoryFactory } from "../../users/infrastructure/user-repository-factory";
import { emptySite, emptyUser } from "../../shared/emptyObjects";
import { general } from "../../../../styles/general";
import { AuthorizationService } from "../../shared/auth/authorization-service";
import { UserHttpService } from "../../users/infrastructure/user-http-service";
import { SiteService } from "../../site/infrastructure/site-service";
import { User } from "../domain/user";

@customElement("user-form-c")
export class EditUser extends LitElement {
  private userService = new UserHttpService(new AuthorizationService());
  private siteService = new SiteService();
  private userRepository = UserRepositoryFactory.build();

  @property() user: Partial<User> = emptyUser;
  @property() password = { oldPswd: "", newPswd: "" };
  @property({ type: String }) id = "";

  async connectedCallback() {
    super.connectedCallback();
    this.id = getId();
    await this.userRepository
      .findUserById(this.id)
      .then(response => (this.user = response));
  }

  handleSubmitChange = async (e: any) => {
    e.preventDefault();
    const values = serializeForm(e.target);
    await this.userRepository
      .update(this.id, { ...this.user, ...values })
      .then(() => {
        this.requestUpdate();
      });
  };

  handleSubmitPassword = async (e: any) => {
    e.preventDefault();
    const values = serializeForm(e.target);
    console.log({ ...this.password, ...values });
    await this.userService
      .changePassword({ ...this.password, ...values })
      .then(response => console.log(response));
  };
  public static style = [general];

  render() {
    return html`
      <h1>Editar usuario</h1>
      <form-container-c class="transparent">
        <form
          @submit="${(e: any) => this.handleSubmitChange(e)}"
          id="update-form"
        >
          <input-c
            id="firstName"
            type="text"
            label="Nombre"
            placeholder="Nombre"
            value="${this.user.firstName}"
            name="firstName"
          ></input-c>
          <input-c
            id="secondName"
            type="text"
            label="Apellidos"
            placeholder="Apellidos"
            name="secondName"
            value="${this.user.secondName}"
          ></input-c>
          <input-c
            id="login"
            type="text"
            label="Login"
            placeholder="Login"
            name="login"
            value="${this.user.login}"
          ></input-c>
          <input-c
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            value="${this.user.email}"
          ></input-c>
          <p class="btn-container" style="overflow: hidden">
            <button-c type="submit" align="right">Actualizar</button-c>
          </p>
        </form>
        <form
          @submit="${(e: any) => this.handleSubmitPassword(e)}"
          id="password-form"
        >
          <p>Actualizar contraseña</p>
          <input-c
            id="password"
            type="password"
            label="Contraseña"
            placeholder="Contraseña"
            name="oldPswd"
          ></input-c>
          <input-c
            id="new-password"
            type="password"
            label="nueva contraseña"
            placeholder="Nueva contraseña"
            name="newPswd"
          ></input-c>
          <p class="btn-container" style="overflow: hidden">
            <button-c type="submit" align="right">Actualizar</button-c>
          </p>
        </form>
      </form-container-c>
    `;
  }
}
