import { TagDto } from "./tag-dto";
import { Tag } from "../domain/tag";

export class TagDtoToTagMapper {
  map(tagDto: TagDto): Tag {
    return {
      id: tagDto._id.$oid,
      title: tagDto.title,
      brief: tagDto.brief,
      description: tagDto.description,
      img: tagDto.img,
      featured: tagDto.featured,
      posts: tagDto.posts ? tagDto.posts.map(post => post.$oid) : undefined
    };
  }
}
