import { TagRepository } from "../domain/tag-repository";
import { TagHttpRepository } from "./tag-http-repository";
import { PostDtoToPostMapper } from "../../posts/infrastructure/post-dto-to-post-mapper";

export class TagRepositoryFactory {
  static build(): TagRepository {
    return new TagHttpRepository(new PostDtoToPostMapper());
  }
}
