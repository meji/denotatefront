import { Post } from "../domain/post";
import { PostDto } from "./post-dto";

export class PostToPostDtoMapper {
  map(post: Post): PostDto {
    return {
      title: post.title,
      brief: post.brief,
      description: post.description,
      img: post.img,
      featured: post.featured,
      author: post.author ? { $oid: post.author } : undefined,
      cats: post.cats
        ? post.cats.map(cat => {
            return { $oid: cat };
          })
        : undefined,
      tags: post.tags
        ? post.tags.map(tag => {
            return { $oid: tag };
          })
        : undefined
    };
  }
}
