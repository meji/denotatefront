import {
  LitElement,
  html,
  customElement,
  property,
  query,
  css
} from "lit-element";
import { general } from "../../../../styles/general";
import { PostRepositoryFactory } from "../infrastructure/post-repository-factory";
import { Post } from "../domain/post";

@customElement("admin-post-list-c")
export class AdminPostList extends LitElement {
  private categoryRepository = PostRepositoryFactory.build();

  @property({ type: Object }) values: Post[];

  public static styles = [general];
  render() {
    return html`
      <h1>Listado de Posts</h1>
    `;
  }
}
