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

@customElement("admin-user-list-c")
export class AdminUserList extends LitElement {
  private userRepository = UserRepositoryFactory.build();

  @property({ type: Object }) values: User[];

  public static styles = [general];
  render() {
    return html`
      <h1>Listado de Users</h1>
    `;
  }
}
