import { Tag } from "./tag";
import { ID } from "../../shared/id/id";

export interface TagRepository {
  findAll(): Promise<Tag[]>;
  findByTitle(title: string): Promise<Tag[]>;
  getById(id: ID): Promise<Tag>;
  create(post: Partial<Tag>): Promise<Tag>;
  update(id: ID, data: Partial<Tag>): Promise<Tag>;
  delete(id: ID): Promise<Tag>;
}
