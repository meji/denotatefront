import {UserDtoToUserMapper} from './user-dto-to-user-mapper';
import {UserRepository} from '../domain/user-repository';
import {UserHttpRepository} from './user-http-repository';

export class UserRepositoryFactory {
  static build(): UserRepository {
    return new UserHttpRepository(new UserDtoToUserMapper());
  }
}
