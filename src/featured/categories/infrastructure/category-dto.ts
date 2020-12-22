import { OID } from "../../shared/id/id";

export interface CategoryDto {
  title: string;
  brief?: string;
  description?: string;
  img?: string;
  featured?: boolean;
  posts?: OID[];
  cats?: OID[];
}
