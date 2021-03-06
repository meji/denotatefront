import {ID} from '../../shared/id/id';

export interface Post {
  id: string;
  title: string;
  brief?: string;
  description?: string;
  img?: string;
  featured?: boolean;
  author?: ID;
  cats?: ID[];
  tags?: string[];
}
