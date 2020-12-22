import { PostRepository } from '../domain/post-repository';
import { PostDtoToPostMapper } from './post-dto-to-post-mapper';
import { PostHttpRepository } from './post-http-repository';
import { PostToPostDtoMapper } from './post-to-post-dto-mapper';

export class PostRepositoryFactory {
  static build(): PostRepository {
    return new PostHttpRepository(
      new PostDtoToPostMapper(),
      new PostToPostDtoMapper()
    );
  }
}
