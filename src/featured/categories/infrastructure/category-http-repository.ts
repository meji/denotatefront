import { http } from "../../shared/http/http";
import { ID } from "../../shared/id/id";
import { CategoryRepository } from "../domain/category-repository";
import { CategoryDtoToCategoryMapper } from "./category-dto-to-category-mapper";
import { CategoryToCategoryDtoMapper } from "./category-to-category-dto-mapper";
import { Category } from "../domain/category";
import { CategoryDto } from "./category-dto";

export class CategoryHttpRepository implements CategoryRepository {
  constructor(
    private readonly categoryDtoToCategoryMapper: CategoryDtoToCategoryMapper,
    private readonly categoryToCategoryDtoMapper: CategoryToCategoryDtoMapper
  ) {}
  async findAll(): Promise<Category[]> {
    const response = await http.get<CategoryDto[]>(`/category/`);
    return response.data.map(categoryDto =>
      this.categoryDtoToCategoryMapper.map(categoryDto)
    );
  }
  async findByTitle(title: string): Promise<Category[]> {
    const response = await http.get<CategoryDto[]>(`/category/?title=${title}`);
    return response.data.map(categoryDto =>
      this.categoryDtoToCategoryMapper.map(categoryDto)
    );
  }
  async getById(id: ID): Promise<Category> {
    const response = await http.get<CategoryDto>(`/category/${id}`);
    return this.categoryDtoToCategoryMapper.map(response.data);
  }
  async create(category: Category): Promise<Category> {
    const categoryDtoIn = this.categoryToCategoryDtoMapper.map(category);
    const categoryIn = await http.post<CategoryDto>(
      "/category/",
      categoryDtoIn,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return this.categoryDtoToCategoryMapper.map(categoryIn.data);
  }
  async update(id: ID, data: Partial<Category>): Promise<Category> {
    const categoryIn = await http.put<CategoryDto>(`/category/${id}`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return this.categoryDtoToCategoryMapper.map(categoryIn.data);
  }
  async delete(id: ID): Promise<Category> {
    const categoryDeleted = await http.delete<CategoryDto>(`/category/${id}`);
    return this.categoryDtoToCategoryMapper.map(categoryDeleted.data);
  }
}
