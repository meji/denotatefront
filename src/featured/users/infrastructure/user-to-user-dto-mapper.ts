import { UserDto } from "./user-dto";
import { User } from "../domain/user";

export class UserToUserDtoMapper {
  map(user: User): UserDto {
    return {
      _id: { $oid: user.id },
      login: user.login,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      secondName: user.secondName,
      admin: user.admin,
      posts: user.posts
        ? user.posts.map(post => {
            return { $oid: post };
          })
        : undefined
    };
  }
}
