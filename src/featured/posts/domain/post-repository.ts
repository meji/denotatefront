import { Post } from "./post";
import { ID } from "../../shared/id/id";
import { Tag } from "../../tags/domain/tag";
import { Category } from "../../../routes/admin/category";

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findByTag(tag: ID): Promise<Post[]>;
  findByCategory(category: ID): Promise<Post[]>;
  findByTitle(title: string): Promise<Post[]>;
  getById(id: ID): Promise<Post>;
  create(post: Post): Promise<Post>;
  // update(post: Post): Promise<Post>;
  // delete(post: Post): Promise<void>;
}
