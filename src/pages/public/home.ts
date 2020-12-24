import { LitElement, html, customElement, property } from "lit-element";
// import { Category } from "../../featured/categories/domain/category";
// import { CategoryRepositoryFactory } from "../../featured/categories/infrastructure/category-repository-factory";

@customElement("home-component")
export class Home extends LitElement {
  // @property({ type: Array }) categories: Category[] | undefined;
  connectedCallback() {
    super.connectedCallback();
    // const categoryRepositoryFactory = CategoryRepositoryFactory.build();
    // categoryRepositoryFactory.findAll().then(response => {
    //   this.categories = response;
    // });
  }
  render() {
    return html`
      <h1>Home</h1>
      <slot></slot>
    `;
  }
}
