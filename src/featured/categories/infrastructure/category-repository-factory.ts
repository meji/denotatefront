import {CategoryRepository} from '../domain/category-repository';
import {CategoryDtoToCategoryMapper} from './category-dto-to-category-mapper';
import {CategoryHttpRepository} from './category-http-repository';

export class CategoryRepositoryFactory {
  static build(): CategoryRepository {
    return new CategoryHttpRepository(new CategoryDtoToCategoryMapper());
  }
}
