import { ID } from '../../shared/id/id';

export interface User {
  login: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  admin?: boolean;
  posts?: ID[];
}
export interface UserWithoutPass {
  login: string;
  password?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  admin?: boolean;
  posts?: ID[];
}
