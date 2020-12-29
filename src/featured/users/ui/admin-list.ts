import {
  LitElement,
  html,
  customElement,
  property,
  query,
  css
} from "lit-element";
import { general } from "../../../../styles/general";
import { UserRepositoryFactory } from "../infrastructure/user-repository-factory";
import { User } from "../domain/user";
import { emptyUser } from "../../shared/emptyObjects";
import { adminStyles } from "../../../../styles/adminStyles";
import { Router } from "@vaadin/router";

@customElement("admin-user-list-c")
export class AdminUserList extends LitElement {
  private userRepository = UserRepositoryFactory.build();

  @property({ type: Object }) values: Partial<User>[] = [emptyUser];

  public static styles = [general, adminStyles];
  render() {
    return html`
      <div class="admin-heaad-container">
        <div class="title-container">
          <h1>Users</h1>
        </div>
        <button-c
          size="extrasmall"
          @click="${() => Router.go("/admin/users/new")}"
          >Nuevo usuario</button-c
        >
      </div>
      <ul class="admin-list">
        ${this.values.map(
          user =>
            html`
              <li>
                <div class="row">
                  <p>
                    ${user.firstName} ${user.secondName}
                  </p>
                  <span class="btn-container">
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Ver descripción"
                      @click="${e =>
                        e.target
                          .closest("li")
                          .querySelector(".description")
                          .classList.toggle("visible")}"
                      >➕</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Editar"
                      @click="${() =>
                        Router.go(`/admin/users/edit?id=${user.id}`)}"
                      >✏️</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Ver"
                      @click="${() =>
                        Router.go(
                          `/usuarios/${user.firstName}${user.secondName}?id=${user.id}`
                        )}"
                      >👁️</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="borrar"
                      @click="${e =>
                        this._handleDelete(
                          user.id,
                          user.firstName + " " + user.secondName
                        )}"
                      >🗑️
                    </button-c>
                  </span>
                </div>
                <div class="description">
                  <small>Datos: </small>
                  <p>Email: ${user.email}</p>
                  <p>Login: ${user.login}</p>
                </div>
              </li>
            `
        )}
      </ul>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.values = [emptyUser];
    await this.userRepository.findAllUsers().then(response => {
      this.values = response;
    });
  }

  _reload = async () => {
    this.values = await this.userRepository.findAllUsers();
  };

  _handleDelete = async (id, title) => {
    if (window.confirm(`¿Quieres borrar el usuario ${title} ?`)) {
      this.userRepository
        .delete(id)
        .then()
        .finally(() => this._reload());
    }
  };
}
