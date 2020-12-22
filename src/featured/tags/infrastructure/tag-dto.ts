import { OID } from "../../shared/id/id";

export interface TagDto {
  title: string;
  brief?: string;
  description?: string;
  img?: string;
  featured?: boolean;
  posts?: OID[];
}
