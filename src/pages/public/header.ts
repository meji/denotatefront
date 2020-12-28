import { LitElement, html, customElement, property } from "lit-element";
import { CategoryRepositoryFactory } from "../../featured/categories/infrastructure/category-repository-factory";
import { Category } from "../../featured/categories/domain/category";
import { Router } from "@vaadin/router";
import { SiteService } from "../../featured/site/infrastructure/site-service";
import { emptyCategory } from "../../featured/shared/emptyObjects";
import { general } from "../../../styles/general";
import { this_styles } from "./header_style";

@customElement("header-c")
export class Header extends LitElement {
  private categoryRepository = CategoryRepositoryFactory.build();
  siteService = new SiteService();

  public static styles = [general, this_styles];
  @property() categories: Partial<Category>[] = [emptyCategory];
  @property() site;

  render() {
    return html`
      <header id="header">
        <nav>
          <img src=${
            this.site.logo ? process.env.API_URI + this.site.logo : "/logo.svg"
          } alt='logo' @click='${() => Router.go("/")}'
          class='${
            !this.site.logo ? "default" : "custom"
          } ${(this.site.theme = "light" ? "default" : "custom")} '
          />
          <ul>
            ${this.categories.map(
              category =>
                html`
                  <li>
                    <span
                      class="link"
                      title="Ver"
                      @click="${() =>
                        Router.go(
                          `/categorias/${category.title}?id=${category.id}`
                        )}"
                      >${category.title}</span
                    >
                  </li>
                `
            )}
          </ul>
        <nav>
        <slot></slot>
      </header>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.categories = [emptyCategory];
    await this.categoryRepository.findAll().then(response => {
      this.categories = response;
    });
    await this.siteService.getSite().then(response => {
      this.site = response;
    });
  }
}
