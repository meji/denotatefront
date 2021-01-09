import { CategoryRepository } from '../domain/category-repository'
import { CategoryDtoToCategoryMapper } from './category-dto-to-category-mapper'
import { CategoryHttpRepository } from './category-http-repository'
import { CategoryToCategoryDtoMapper } from './category-to-category-dto-mapper'

export class CategoryRepositoryFactory {
  static build(): CategoryRepository {
    return new CategoryHttpRepository(
      new CategoryDtoToCategoryMapper(),
      new CategoryToCategoryDtoMapper()
    )
  }
}
