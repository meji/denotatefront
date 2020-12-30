import { Post } from "../../posts/domain/post";

export interface TagRepository {
  findAll(): Promise<string[]>;
  findByTitle(title: string): Promise<Post[]>;
}
