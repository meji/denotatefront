import { Category } from "./category";
import { ID } from "../../shared/id/id";

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findByTitle(title: string): Promise<Category[]>;
  getById(id: ID): Promise<Category>;
  create(post: Category): Promise<Category>;
  update(id: ID, data: Partial<Category>): Promise<Category>;
  delete(id: ID): Promise<Category>;
}
