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
import { emptyPost } from "../../shared/emptyObjects";
import { adminStyles } from "../../../../styles/adminStyles";
import { Router } from "@vaadin/router";

@customElement("admin-post-list-c")
export class AdminPostList extends LitElement {
  private postRepository = PostRepositoryFactory.build();

  @property({ type: Object }) values: Partial<Post>[] = [emptyPost];

  public static styles = [general, adminStyles];
  render() {
    return html`
      <div class="admin-heaad-container">
        <div class="title-container">
          <h1>Posts</h1>
        </div>
        <button-c
          size="extrasmall"
          @click="${() => Router.go("/admin/posts/new")}"
          >Nuevo post</button-c
        >
      </div>
      <ul class="admin-list">
        ${this.values.map(
          post =>
            html`
              <li>
                <div class="row">
                  <p>
                    ${post.title}
                  </p>
                  <span class="btn-container">
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Ver descripción"
                      @click="${e =>
                        e.target
                          .closest("li")
                          .querySelector(".description")
                          .classList.toggle("visible")}"
                      >➕</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Editar"
                      @click="${() =>
                        Router.go(`/admin/posts/edit?id=${post.id}`)}"
                      >✏️</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Ver"
                      @click="${() =>
                        Router.go(`/${post.title}?id=${post.id}`)}"
                      >👁️</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="borrar"
                      @click="${e => this._handleDelete(post.id, post.title)}"
                      >🗑️
                    </button-c>
                  </span>
                </div>
                <div class="description">
                  <small>Descripción: </small>
                  ${post.brief}
                </div>
              </li>
            `
        )}
      </ul>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.values = [emptyPost];
    await this.postRepository.findAll().then(response => {
      this.values = response;
    });
  }

  _reload = async () => {
    this.values = await this.postRepository.findAll();
  };

  _handleDelete = async (id, title) => {
    if (window.confirm(`¿Quieres borrar el post ${title} ?`)) {
      this.postRepository
        .delete(id)
        .then()
        .finally(() => this._reload());
    }
  };
}
