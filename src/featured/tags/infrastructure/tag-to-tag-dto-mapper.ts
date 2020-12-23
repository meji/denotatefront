import { TagDto } from "./tag-dto";
import { Tag } from "../domain/tag";

export class TagToTagDtoMapper {
  map(tag: Tag): TagDto {
    return {
      _id: { $oid: tag.id },
      title: tag.title,
      brief: tag.brief,
      description: tag.description,
      img: tag.img,
      featured: tag.featured,
      posts: tag.posts
        ? tag.posts.map(post => {
            return { $oid: post };
          })
        : undefined
    };
  }
}
