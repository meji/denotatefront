import { Post } from './post';

export class PostService {
  isPostDuplicated(posts: Post[], postTitle: string) {
    return posts.map(post => post.title).includes(postTitle);
  }
}
