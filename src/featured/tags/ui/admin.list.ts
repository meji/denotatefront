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
import { emptyTag } from "../../shared/emptyObjects";
import { adminStyles } from "../../../../styles/adminStyles";
import { Router } from "@vaadin/router";

@customElement("admin-tag-list-c")
export class AdminTagList extends LitElement {
  private tagRepository = TagRepositoryFactory.build();

  @property({ type: Object }) values: Partial<Tag>[] = [emptyTag];

  public static styles = [general, adminStyles];
  render() {
    return html`
      <div class="admin-heaad-container">
        <div class="title-container">
          <h1>Tags</h1>
        </div>
        <button-c
          size="extrasmall"
          @click="${() => Router.go("/admin/tags/new")}"
          >Nuevo tag</button-c
        >
      </div>
      <ul class="admin-list">
        ${this.values.map(
          tag =>
            html`
              <li>
                <div class="row">
                  <p>
                    ${tag.title}
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
                        Router.go(`/admin/tags/edit?id=${tag.id}`)}"
                      >✏️</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="Ver"
                      @click="${() =>
                        Router.go(`/tags/${tag.title}?id=${tag.id}`)}"
                      >👁️</button-c
                    >
                    <button-c
                      size="extrasmall"
                      class="transparent"
                      title="borrar"
                      @click="${e => this._handleDelete(tag.id, tag.title)}"
                      >🗑️
                    </button-c>
                  </span>
                </div>
                <div class="description">
                  <small>Descripción: </small>
                  ${tag.brief}
                </div>
              </li>
            `
        )}
      </ul>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.values = [emptyTag];
    await this.tagRepository.findAll().then(response => {
      this.values = response;
    });
  }

  _reload = async () => {
    this.values = await this.tagRepository.findAll();
  };

  _handleDelete = async (id, title) => {
    if (window.confirm(`¿Quieres borrar la tag ${title} ?`)) {
      this.tagRepository
        .delete(id)
        .then()
        .finally(() => this._reload());
    }
  };
}
