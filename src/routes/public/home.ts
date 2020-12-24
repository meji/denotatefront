import { LitElement, html, customElement, property } from "lit-element";
// import { Category } from "../../featured/categories/domain/category";
// import { CategoryRepositoryFactory } from "../../featured/categories/infrastructure/category-repository-factory";

@customElement("home-page")
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
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/logout">logout</a>
        </li>
        <li>
          <a href="/admin">Admin</a>
        </li>
        <li>
          <a href="/categoria">categoria</a>
        </li>
        <li>
          <a href="/categoria/post">Post</a>
        </li>
        <li>
          <a href="/tags/tag">tag</a>
        </li>
      </ul>
      <slot></slot>
    `;
  }
}
