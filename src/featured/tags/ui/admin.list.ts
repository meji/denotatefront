import {
  LitElement,
  html,
  customElement,
  property,
  query,
  css
} from "lit-element";
import { general } from "../../../../styles/general";
import { TagRepositoryFactory } from "../infrastructure/tag-repository-factory";
import { Tag } from "../domain/tag";

@customElement("admin-tag-list-c")
export class AdminTagList extends LitElement {
  private tagRepository = TagRepositoryFactory.build();

  @property({ type: Object }) values: Tag[];

  public static styles = [general];
  render() {
    return html`
      <h1>Listado de Tags</h1>
    `;
  }
}
