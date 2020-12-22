import { Post } from './post';
import { ID } from '../../shared/id/id';
import { Tag } from '../../tags/domain/tag';
import { Category } from '../../../routes/admin/category';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  // findByTag(tag: Tag): Promise<Post[]>;
  // findByCategory(category: Category): Promise<Post[]>;
  // getById(id: ID): Promise<Post>;
  // getByName(name: string): Promise<Post>;
  // create(post: Post): Promise<Post>;
  // update(post: Post): Promise<Post>;
  // delete(post: Post): Promise<void>;
}
