import { ID } from "../../shared/id/id";

export interface User {
  id: ID;
  login: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  admin?: boolean;
  posts?: ID[];
}
