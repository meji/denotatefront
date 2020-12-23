import { User } from "../domain/user";
import { token, UserService } from "../domain/user-service";
import { http } from "../../shared/http/http";
import { AuthorizationService } from "../../shared/auth/authorization-service";

export class UserHttpService implements UserService {
  constructor(private readonly authorizationService: AuthorizationService) {}

  async login(user: Partial<User>): Promise<void> {
    const token = (
      await http.post("/users/login", user, {
        headers: {
          "Content-Type": "application/json"
        }
      })
    ).data.token;
    this.authorizationService.setToken(token);
  }
  async logout(): Promise<void> {
    await http.get("/users/logout");
    this.authorizationService.removeToken();
  }
  async changePassword(data: {
    oldPswd: string;
    newPswd: string;
  }): Promise<User> {
    return (await http.put("/users/pswd", data)).data;
  }
}
