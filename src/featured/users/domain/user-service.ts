import { User } from "./user";
export type token = string;

export interface UserService {
  login(user: Partial<User>): Promise<void>;
  logout(): Promise<void>;
  changePassword(data: { oldPswd: string; newPswd: string }): Promise<User>;
}
