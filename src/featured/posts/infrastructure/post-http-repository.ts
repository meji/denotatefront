import { PostRepository } from "../domain/post-repository";
import { PostDtoToPostMapper } from "./post-dto-to-post-mapper";
import { PostToPostDtoMapper } from "./post-to-post-dto-mapper";
import { Post } from "../domain/post";
import { Tag } from "../../tags/domain/tag";
import { Category } from "../../../routes/admin/category";
import { ID } from "../../shared/id/id";
import { http } from "../../shared/http/http";
import { PostDto } from "./post-dto";

export class PostHttpRepository implements PostRepository {
  constructor(
    private readonly postDtoToPostMapper: PostDtoToPostMapper,
    private readonly postToPostDtoMapper: PostToPostDtoMapper
  ) {}
  async findAll(): Promise<Post[]> {
    const response = await http.get<PostDto[]>(`/posts/`);
    return response.data.map(postDto => this.postDtoToPostMapper.map(postDto));
  }
  async findByTag(tag: ID): Promise<Post[]> {
    const response = await http.get<PostDto[]>(`/posts/?tag=${tag}`);
    return response.data.map(postDto => this.postDtoToPostMapper.map(postDto));
  }
  async findByCategory(category: ID): Promise<Post[]> {
    const response = await http.get<PostDto[]>(`/posts/?cat=${category}`);
    return response.data.map(postDto => this.postDtoToPostMapper.map(postDto));
  }
  async findByTitle(title: string): Promise<Post[]> {
    const response = await http.get<PostDto[]>(`/posts/?title=${title}`);
    return response.data.map(postDto => this.postDtoToPostMapper.map(postDto));
  }
  async getById(id: ID): Promise<Post> {
    const response = await http.get<PostDto>(`/posts/${id}`);
    return this.postDtoToPostMapper.map(response.data);
  }
  async create(post: Post): Promise<Post> {
    const postDtoIn = this.postToPostDtoMapper.map(post);
    const postIn = await http.post<PostDto>("/posts/", postDtoIn, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return this.postDtoToPostMapper.map(postIn.data);
  }
  async update(id: ID, data: Partial<Post>): Promise<Post> {
    const postIn = await http.put<PostDto>(`/posts/${id}`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(postIn, postIn);
    return this.postDtoToPostMapper.map(postIn.data);
  }
  // async delete(post: Post): Promise<void> {}
}
