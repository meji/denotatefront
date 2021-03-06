import { PostRepository } from "../domain/post-repository";
import { PostDtoToPostMapper } from "./post-dto-to-post-mapper";
import { PostToPostDtoMapper } from "./post-to-post-dto-mapper";
import { Post } from "../domain/post";
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
  async create(post: Partial<Post>): Promise<Post> {
    const postIn = await http.post<PostDto>(
      "/posts/",
      this.postToPostDtoMapper.mapPartial(post),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return this.postDtoToPostMapper.map(postIn.data);
  }
  async update(id: ID, data: Partial<Post>): Promise<Post> {
    const postIn = await http.put<PostDto>(
      `/posts/${id}`,
      this.postToPostDtoMapper.mapPartial(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const response = this.postDtoToPostMapper.map(postIn.data);
    return response.id ? response : this.getById(id);
  }
  async delete(id: ID): Promise<Post> {
    const postDeleted = await http.delete<PostDto>(`/posts/${id}`);
    return this.postDtoToPostMapper.map(postDeleted.data);
  }
}
