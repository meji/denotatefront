import { ID } from "../../shared/id/id";

export interface Tag {
  id: string;
  title: string;
  brief?: string;
  description?: string;
  img?: string;
  featured?: boolean;
  posts?: ID[];
}
