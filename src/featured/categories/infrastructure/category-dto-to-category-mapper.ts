import { CategoryDto } from "./category-dto";
import { Category } from "../domain/category";

export class CategoryDtoToCategoryMapper {
  map(categoryDto: CategoryDto): Category {
    return {
      title: categoryDto.title,
      brief: categoryDto.brief,
      description: categoryDto.description,
      img: categoryDto.img,
      featured: categoryDto.featured,
      cats: categoryDto.cats
        ? categoryDto.cats.map(cat => cat.$oid)
        : undefined,
      posts: categoryDto.posts
        ? categoryDto.posts.map(post => post.$oid)
        : undefined
    };
  }
}
