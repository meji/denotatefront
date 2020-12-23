import { CategoryDto } from "./category-dto";
import { Category } from "../domain/category";

export class CategoryToCategoryDtoMapper {
  map(category: Category): CategoryDto {
    return {
      _id: { $oid: category.id },
      title: category.title,
      brief: category.brief,
      description: category.description,
      img: category.img,
      featured: category.featured,
      cats: category.cats
        ? category.cats.map(cat => {
            return { $oid: cat };
          })
        : undefined,
      posts: category.posts
        ? category.posts.map(post => {
            return { $oid: post };
          })
        : undefined
    };
  }
}
