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
import { TagRepositoryFactory } from "../infrastructure/tag-repository-factory";
import { Tag } from "../domain/tag";

@customElement("tag-home-c")
export class CategoryList extends LitElement {
  private tagRepository = TagRepositoryFactory.build();

  @property({ type: Object }) values: Tag;

  public static styles = [general];
  render() {
    return html`
      <h1>Tag</h1>
    `;
  }
}
