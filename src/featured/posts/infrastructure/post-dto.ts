import { OID } from "../../shared/id/id";

export interface PostDto {
  title: string;
  brief?: string;
  description?: string;
  img?: string;
  featured?: boolean;
  author?: OID;
  cats?: OID[];
  tags?: OID[];
}
