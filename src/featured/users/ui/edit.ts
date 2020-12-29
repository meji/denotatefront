import { LitElement, html, customElement, property } from "lit-element";
import "../../../core/pages/containers/container";
import { countErrors, getId, serializeForm } from "../../../utils/utils";
import { UserRepositoryFactory } from "../../users/infrastructure/user-repository-factory";
import { general } from "../../../../styles/general";
import { AuthorizationService } from "../../shared/auth/authorization-service";
import { UserHttpService } from "../../users/infrastructure/user-http-service";
import { User } from "../domain/user";
import { adminStyles } from "../../../../styles/adminStyles";
import { emptyUser } from "../../shared/emptyObjects";

@customElement("user-form-c")
export class EditUser extends LitElement {
  private userService = new UserHttpService(new AuthorizationService());
  private userRepository = UserRepositoryFactory.build();
  @property() user: Partial<User> = emptyUser;
  @property() password = { oldPswd: "", newPswd: "" };
  @property({ type: String }) id = "";
  public static styles = [general, adminStyles];
  @property({ type: String }) validityError = "";

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
            required="true"
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
            required="true"
          ></input-c>
          <input-c
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            value="${this.user.email}"
            required="true"
          ></input-c>
          <p class="error">${this.validityError}</p>
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

  async connectedCallback() {
    super.connectedCallback();
    this.id = getId();
    await this.userRepository
      .findUserById(this.id)
      .then(response => (this.user = response));
  }

  handleSubmitChange = async (e: any) => {
    e.preventDefault();
    this.validityError =
      countErrors(this) > 0
        ? `Revisa los ${countErrors(this)} errores en el formulario`
        : "";
    if (this.validityError === "") {
      const values = serializeForm(e.target);
      await this.userRepository
        .update(this.id, { ...this.user, ...values })
        .then(() => {
          this.requestUpdate();
        });
    }
  };

  handleSubmitPassword = async (e: any) => {
    e.preventDefault();
    const values = serializeForm(e.target);
    await this.userService.changePassword({ ...this.password, ...values });
  };
}
