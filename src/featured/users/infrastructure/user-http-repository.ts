import { UserRepository } from '../domain/user-repository'
import { UserDtoToUserMapper } from './user-dto-to-user-mapper'
import { User } from '../domain/user'
import { UserDto } from './user-dto'
import { http } from '../../shared/http/http'
import { ID } from '../../shared/id/id'

export class UserHttpRepository implements UserRepository {
  constructor(private readonly userDtoToUserMapper: UserDtoToUserMapper) {}

  async findAllUsers(): Promise<User[]> {
    const response = await http.get<UserDto[]>(`/users/all`)
    return response.data.map(userDto => this.userDtoToUserMapper.map(userDto))
  }

  async findUserById(id: ID): Promise<User> {
    const response = await http.get<UserDto>(`/users/${id}`)
    return this.userDtoToUserMapper.map(response.data)
  }

  async findAdmin(): Promise<boolean> {
    const response = await http.get(`/users/isadmin`)
    return response.data
  }

  async update(id: ID, user: Partial<User>): Promise<User> {
    const response = await http.put<UserDto>(`/users/${id}`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data._id ? this.userDtoToUserMapper.map(response.data) : this.findUserById(id)
  }

  async delete(id: ID): Promise<User> {
    const userDeleted = await http.delete<UserDto>(`/users/${id}`)
    return this.userDtoToUserMapper.map(userDeleted.data)
  }
  async newUser(user: Partial<User>): Promise<{}> {
    const response = await http
      .post('/users/new', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(e => e)
    console.log(response)
    return response
  }
}
