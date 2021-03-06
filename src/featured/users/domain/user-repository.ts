import { User } from './user'
import { ID } from '../../shared/id/id'

export interface UserRepository {
  findUserById(id: ID): Promise<User>
  findAllUsers(): Promise<User[]>
  update(id: ID, user: Partial<User>): Promise<User>
  delete(id: ID): Promise<User>
  findAdmin(): Promise<boolean>
  newUser(user: Partial<User>): Promise<any>
}
