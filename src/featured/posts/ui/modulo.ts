import {
  LitElement,
  html,
  customElement,
  property,
  query,
  PropertyValues
} from "lit-element";
import { PostRepositoryFactory } from "../infrastructure/post-repository-factory";
import { Post } from "../domain/post";
import { emptyPost } from "../../shared/emptyObjects";
import { publicStyles } from "../../../../styles/public";
import { general } from "../../../../styles/general";
import { this_styles } from "./moduleStyles";
import { Router } from "@vaadin/router";

@customElement("post-module-c")
export class PostHome extends LitElement {
  @property() post: Partial<Post> = emptyPost;
  public static styles = [general, publicStyles, this_styles];

  render() {
    return html`
      <div
        class="module"
        @click="${() => Router.go(`/${this.post.title}?id=${this.post.id}`)}"
      >
        <div class="img-container">
          <img
            src="${process.env.API_URI + "/uploads/" + this.post.img}"
            alt="${this.post.title}"
            title="${this.post.title}"
          />
        </div>
        <h2 class="h4">${this.post.title}</h2>
        <div class="brief">${this.post.brief.substring(1, 70)}...</div>
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
  }
}
