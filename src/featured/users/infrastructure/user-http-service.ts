import {User} from '../domain/user';
import {UserService} from '../domain/user-service';
import {http} from '../../shared/http/http';
import {AuthorizationService} from '../../shared/auth/authorization-service';

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
    this.authorizationService.removeToken();
  }
  async signup(user: Partial<User>): Promise<void> {
    const token = (
      await http.post("/users/", user, {
        headers: {
          "Content-Type": "application/json"
        }
      })
    ).data.token;
    this.authorizationService.setToken(token);
  }

  async changePassword(data: {
    oldPswd: string;
    newPswd: string;
  }): Promise<User> {
    return (
      await http.put("/users/pswd", data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
    ).data.message;
  }

  async thisIsAdmin(): Promise<boolean> {
    return http
      .get("/users/thisisadmin")
      .then(response => !!response.data)
      .catch((e: Error) => {
        console.log(e.message);
        return false;
      });
  }
  async thisIsLogged(): Promise<boolean> {
    return http
      .get("/users/thisislogged")
      .then(response => !!response.data)
      .catch((e: Error) => {
        console.log(e.message);
        return false;
      });
  }
}
