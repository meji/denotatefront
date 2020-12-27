import { UserDto } from "./user-dto";
import { User } from "../domain/user";

export class UserDtoToUserMapper {
  map(userDto: UserDto): User {
    return {
      id: userDto._id.$oid,
      login: userDto.login,
      password: userDto.password,
      email: userDto.email,
      firstName: userDto.firstName,
      secondName: userDto.secondName,
      admin: userDto.admin,
      posts: userDto.posts
        ? userDto.posts.map(postdto => postdto.$oid)
        : undefined
    };
  }
}
