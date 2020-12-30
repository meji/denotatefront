import { http } from "../../shared/http/http";
import { TagRepository } from "../domain/tag-repository";
import { Post } from "../../posts/domain/post";
import { PostDto } from "../../posts/infrastructure/post-dto";
import { PostDtoToPostMapper } from "../../posts/infrastructure/post-dto-to-post-mapper";

export class TagHttpRepository implements TagRepository {
  constructor(private readonly postDtotoPostMapper: PostDtoToPostMapper) {}
  async findAll(): Promise<string[]> {
    return (await http.get<string[]>(`/tags/`)).data;
  }
  async findByTitle(title: string): Promise<Post[]> {
    const response = await http.get<PostDto[]>(`/posts/bytag/${title}`);
    return response.data.map(postDto => this.postDtotoPostMapper.map(postDto));
  }
}
