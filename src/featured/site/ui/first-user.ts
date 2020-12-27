import { LitElement, html, customElement, property } from "lit-element";
import "../../../pages/special/container";
import { serializeForm } from "../../../utils/utils";
import { UserRepositoryFactory } from "../../users/infrastructure/user-repository-factory";

@customElement("first-user-c")
export class FirstUser extends LitElement {
  private userRepository = UserRepositoryFactory.build();

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
    await this.userRepository.signup({ ...values, admin: true }).then(() => {
      target.reset();
      window.location.href = "/login";
    });
  };

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
            <button-c type="submit" align="right">Enviar</button-c>
          </form>
        </form-container-c>
      </special-container-c>
    `;
  }
}
