import {
  LitElement,
  html,
  customElement,
  property,
  query,
  PropertyValues
} from "lit-element";
import { PostRepositoryFactory } from "../../../featured/posts/infrastructure/post-repository-factory";
import { Post } from "../../../featured/posts/domain/post";
import { emptyPost } from "../../../featured/shared/emptyObjects";
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
      >${
        this.post.img
          ? html`
              <div class="img-container">
                <img
                  src="${process.env.API_URI + "/uploads/" + this.post.img}"
                  alt="${this.post.title}"
                  title="${this.post.title}"
                />
              </div>
            `
          : null
      }

        </div>
        <h2 class="h4">${this.post.title}</h2>
        <div class="brief">${this.post.brief.substring(1, 70)}...</div>
      </div>
    `;
  }
}
