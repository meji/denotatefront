import { LitElement, html, customElement, property } from "lit-element";
import "../../../pages/special/container";
import { countErrors, serializeForm } from "../../../utils/utils";
import { UserRepositoryFactory } from "../infrastructure/user-repository-factory";
import { general } from "../../../../styles/general";

@customElement("user-new-c")
export class NewUser extends LitElement {
  private userRepository = UserRepositoryFactory.build();
  public static style = [general];
  @property({ type: String }) validityError = "";

  render() {
    return html`
      <h1>Nuevo usuario</h1>
      <form-container-c class="transparent">
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
            required="true"
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
            required="true"
          ></input-c>
          <input-c
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            required="true"
          ></input-c>
          <input-c
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            required="true"
          ></input-c>
          <p class="btn-container" style="overflow: hidden">
            <button-c type="submit" align="right">Enviar</button-c>
          </p>
          <p class="error">${this.validityError}</p>
        </form>
      </form-container-c>
    `;
  }

  handleSubmitRegister = async (e: any) => {
    e.preventDefault();
    this.validityError =
      countErrors(this) > 0
        ? `Revisa los ${countErrors(this)} errores en el formulario`
        : "";
    if (this.validityError === "") {
      e.preventDefault();
      const target = e.target;
      const values = serializeForm(target);
      await this.userRepository
        .newUser({ ...values, admin: false })
        .then(response => {
          window.location.href = `/admin/users/edit?id=${response}`;
        });
    }
  };
}
