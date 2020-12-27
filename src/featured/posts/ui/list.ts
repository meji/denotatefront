import {
  LitElement,
  html,
  customElement,
  property,
  query,
  css
} from "lit-element";
import { serializeForm } from "../../../utils/utils";
import { general } from "../../../../styles/general";
import { Post } from "../domain/post";
import { PostRepositoryFactory } from "../infrastructure/post-repository-factory";

@customElement("post-list-c")
export class PostList extends LitElement {
  private categoryRepository = PostRepositoryFactory.build();

  @property({ type: Object }) values: Post[];

  public static styles = [general];
  render() {
    return html`
      <h1>Listado de Categorías</h1>
    `;
  }
}