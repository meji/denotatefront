import { http } from "../../shared/http/http";
import { ID } from "../../shared/id/id";
import { TagRepository } from "../domain/tag-repository";
import { TagDtoToTagMapper } from "./tag-dto-to-tag-mapper";
import { TagToTagDtoMapper } from "./tag-to-tag-dto-mapper";
import { Tag } from "../domain/tag";
import { TagDto } from "./tag-dto";

export class TagHttpRepository implements TagRepository {
  constructor(
    private readonly tagDtoToTagMapper: TagDtoToTagMapper,
    private readonly tagToTagDtoMapper: TagToTagDtoMapper
  ) {}
  async findAll(): Promise<Tag[]> {
    const response = await http.get<TagDto[]>(`/tags/`);
    return response.data.map(tagDto => this.tagDtoToTagMapper.map(tagDto));
  }
  async findByTitle(title: string): Promise<Tag[]> {
    const response = await http.get<TagDto[]>(`/tags/?title=${title}`);
    return response.data.map(tagDto => this.tagDtoToTagMapper.map(tagDto));
  }
  async getById(id: ID): Promise<Tag> {
    const response = await http.get<TagDto>(`/tags/${id}`);
    return this.tagDtoToTagMapper.map(response.data);
  }
  async create(tag: Partial<Tag>): Promise<Tag> {
    const tagIn = await http.post<TagDto>("/tags/", tag, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return this.tagDtoToTagMapper.map(tagIn.data);
  }
  async update(id: ID, data: Partial<Tag>): Promise<Tag> {
    const tagIn = await http.put<TagDto>(`/tags/${id}`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return this.tagDtoToTagMapper.map(tagIn.data);
  }
  async delete(id: ID): Promise<Tag> {
    const tagDeleted = await http.delete<TagDto>(`/tags/${id}`);
    return this.tagDtoToTagMapper.map(tagDeleted.data);
  }
}
