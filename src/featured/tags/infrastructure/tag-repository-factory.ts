import { TagRepository } from "../domain/tag-repository";
import { TagDtoToTagMapper } from "./tag-dto-to-tag-mapper";
import { TagToTagDtoMapper } from "./tag-to-tag-dto-mapper";
import { TagHttpRepository } from "./tag-http-repository";

export class TagRepositoryFactory {
  static build(): TagRepository {
    return new TagHttpRepository(
      new TagDtoToTagMapper(),
      new TagToTagDtoMapper()
    );
  }
}
