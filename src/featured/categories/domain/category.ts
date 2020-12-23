import { ID } from "../../shared/id/id";

export interface Category {
  id: string;
  title: string;
  brief?: string;
  description?: string;
  img?: string;
  featured?: boolean;
  posts?: ID[];
  cats?: ID[];
}
