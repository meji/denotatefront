import { LitElement, html, customElement, property } from "lit-element";
import { general } from "../../../../styles/general";
import { TagRepositoryFactory } from "../infrastructure/tag-repository-factory";
import { getId } from "../../../utils/utils";
import { Post } from "../../posts/domain/post";
import { publicStyles } from "../../../../styles/public";

@customElement("tag-home-c")
export class CategoryList extends LitElement {
  private tagRepository = TagRepositoryFactory.build();

  @property({ type: Object }) posts: Post[];
  @property({ type: String }) tag;

  public static styles = [general, publicStyles];
  render() {
    return html`
      <div>
        <h1>${this.tag.title}</h1>
        ${this.posts.length > 0
          ? html`
              <ul class="modules-container">
                ${this.posts.map(post => {
                  return html`
                    <li><post-module-c .post="${post}"></post-module-c></li>
                  `;
                })}
              </ul>
            `
          : ""}
        <slot></slot>
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    await new Promise(r => setTimeout(r, 0));
    this.tag = getId();
    await this.tagRepository.findByTitle(this.tag).then(response => {
      this.posts = response;
    });
  }
}
