import { User } from "./user";
import { ID } from "../../shared/id/id";
type token = string;

export interface UserRepository {
  signup(user: Partial<User>): Promise<token>;
  findUserById(id: ID): Promise<User>;
  findAllUsers(): Promise<User[]>;
  update(user: Partial<User>): Promise<User>;
  delete(id: ID): Promise<User>;
  findAdmin(): Promise<boolean>;
}
