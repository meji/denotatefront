import { ID } from '../../shared/id/id';

export interface Category {
  title: string;
  brief?: string;
  description?: string;
  img?: string;
  featured?: boolean;
  posts?: ID[];
  categories?: Category[];
}
