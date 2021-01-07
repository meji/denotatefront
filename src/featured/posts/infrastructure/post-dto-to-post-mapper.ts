import { Post } from '../domain/post'
import { PostDto } from './post-dto'

export class PostDtoToPostMapper {
  map(postDto: PostDto): Post {
    return {
      id: postDto._id.$oid,
      title: postDto.title,
      brief: postDto.brief,
      description: postDto.description,
      img: postDto.img,
      featured: postDto.featured,
      author: postDto.author ? postDto.author.$oid : undefined,
      cats: postDto.cats ? postDto.cats.map(cat => cat.$oid) : undefined,
      tags: postDto.tags
    }
  }
}
