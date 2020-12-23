import { UserRepository } from "../domain/user-repository";
import { UserDtoToUserMapper } from "./user-dto-to-user-mapper";
import { UserToUserDtoMapper } from "./user-to-user-dto-mapper";
import { User } from "../domain/user";
import { UserDto } from "./user-dto";
import { http } from "../../shared/http/http";
import { ID } from "../../shared/id/id";
type token = string;

export class UserHttpRepository implements UserRepository {
  constructor(
    private readonly userDtoToUserMapper: UserDtoToUserMapper,
    private readonly userToUserDtoMapper: UserToUserDtoMapper
  ) {}

  async findAllUsers(): Promise<User[]> {
    const response = await http.get<UserDto[]>(`/users/`);
    return response.data.map(userDto => this.userDtoToUserMapper.map(userDto));
  }

  async findUserById(id: ID): Promise<User> {
    const response = await http.get<UserDto>(`/users/${id}`);
    return this.userDtoToUserMapper.map(response.data);
  }

  async signup(user: Partial<User>): Promise<token> {
    const userIn = await http.post<token>("/users/", user, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return userIn.data;
  }

  async update(user: Partial<User>): Promise<User> {
    const response = await http.put<UserDto>("/users/", user, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return this.userDtoToUserMapper.map(response.data);
  }

  async delete(id: ID): Promise<User> {
    const userDeleted = await http.delete<UserDto>(`/users/${id}`);
    return this.userDtoToUserMapper.map(userDeleted.data);
  }
}
