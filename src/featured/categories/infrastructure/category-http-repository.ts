import {http} from '../../shared/http/http';
import {ID} from '../../shared/id/id';
import {CategoryRepository} from '../domain/category-repository';
import {CategoryDtoToCategoryMapper} from './category-dto-to-category-mapper';
import {Category} from '../domain/category';
import {CategoryDto} from './category-dto';

export class CategoryHttpRepository implements CategoryRepository {
  constructor(
    private readonly categoryDtoToCategoryMapper: CategoryDtoToCategoryMapper
  ) {}
  async findAll(): Promise<Category[]> {
    const response = await http.get<CategoryDto[]>(`/categories/`);
    return response.data.map(categoryDto =>
      this.categoryDtoToCategoryMapper.map(categoryDto)
    );
  }
  async findByTitle(title: string): Promise<Category[]> {
    const response = await http.get<CategoryDto[]>(
      `/categories/?title=${title}`
    );
    return response.data.map(categoryDto =>
      this.categoryDtoToCategoryMapper.map(categoryDto)
    );
  }
  async getById(id: ID): Promise<Category> {
    const response = await http.get<CategoryDto>(`/categories/${id}`);
    return this.categoryDtoToCategoryMapper.map(response.data);
  }
  async create(category: Partial<Category>): Promise<Category> {
    const categoryIn = await http.post<CategoryDto>("/categories/", category, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return this.categoryDtoToCategoryMapper.map(categoryIn.data);
  }
  async update(id: ID, data: Partial<Category>): Promise<Category> {
    const categoryIn = await http.put<CategoryDto>(`/categories/${id}`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return categoryIn.data._id
      ? this.categoryDtoToCategoryMapper.map(categoryIn.data)
      : this.getById(id);
  }
  async delete(id: ID): Promise<Category> {
    const categoryDeleted = await http.delete<CategoryDto>(`/categories/${id}`);
    return this.categoryDtoToCategoryMapper.map(categoryDeleted.data);
  }
}
