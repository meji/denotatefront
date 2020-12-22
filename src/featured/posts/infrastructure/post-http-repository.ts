import { PostRepository } from '../domain/post-repository';
import { PostDtoToPostMapper } from './post-dto-to-post-mapper';
import { PostToPostDtoMapper } from './post-to-post-dto-mapper';
import { Post } from '../domain/post';
import { Tag } from '../../tags/domain/tag';
import { Category } from '../../../routes/admin/category';
import { ID } from '../../shared/id/id';
import { http } from '../../shared/http/http';
import { PostDto } from './post-dto';

export class PostHttpRepository implements PostRepository {
  constructor(
    private readonly postDtoToPostMapper: PostDtoToPostMapper,
    private readonly postToPostDtoMapper: PostToPostDtoMapper
  ) {}
  async findAll(): Promise<Post[]> {
    const response = await http.get<PostDto[]>(`/posts/`);
    return response.data.map(postDto => this.postDtoToPostMapper.map(postDto));
  }
  // async findByTag(tag: Tag): Promise<Post[]> {}
  // async findByCategory(category: Category): Promise<Post[]> {}
  // async getById(id: ID): Promise<Post> {}
  // async getByName(name: string): Promise<Post> {}
  // async create(post: Post): Promise<Post> {}
  // async update(post: Post): Promise<Post> {}
  // async delete(post: Post): Promise<void> {}
}
