import {User} from './user';

export type token = string;

export interface UserService {
  login(user: Partial<User>): Promise<void>;
  logout(): Promise<void>;
  changePassword(data: { oldPswd: string; newPswd: string }): Promise<any>;
  signup(user: Partial<User>): Promise<void>;
  thisIsAdmin(): Promise<Boolean>;
  thisIsLogged(): Promise<Boolean>;
}
