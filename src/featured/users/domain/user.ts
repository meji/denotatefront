import { ID } from "../../shared/id/id";

export interface User {
  id: ID;
  login: string;
  password: string;
  email: string;
  firstName?: string;
  secondName?: string;
  admin?: boolean;
  posts?: ID[];
}
