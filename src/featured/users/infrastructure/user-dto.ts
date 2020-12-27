import { OID } from "../../shared/id/id";

export interface UserDto {
  _id: OID;
  login: string;
  password: string;
  email: string;
  firstName?: string;
  secondName?: string;
  admin?: boolean;
  posts?: OID[];
}
