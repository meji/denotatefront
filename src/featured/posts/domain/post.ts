import { ID } from '../../shared/id/id';
import { User } from '../../users/domain/user';

export interface Post {
  title: string;
  brief?: string;
  description?: string;
  img?: string;
  featured?: boolean;
  author: ID;
  cats?: ID[];
  tags?: ID[];
}
