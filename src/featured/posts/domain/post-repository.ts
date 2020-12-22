import { Post } from "./post";
import { ID } from "../../shared/id/id";
import { PostDto } from "../infrastructure/post-dto";

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findByTag(tag: ID): Promise<Post[]>;
  findByCategory(category: ID): Promise<Post[]>;
  findByTitle(title: string): Promise<Post[]>;
  getById(id: ID): Promise<Post>;
  create(post: Post): Promise<Post>;
  update(id: ID, data: Partial<Post>): Promise<Post>;
  // delete(post: Post): Promise<void>;
}
