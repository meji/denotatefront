import { css } from "lit-element";

export const this_styles = css`
  #menu-container {
    min-height: 100vh;
    background: var(--background-color);
    width: 200px;
    padding: var(--l) var(--s);
    border-right: var(--border-form);
    position: fixed;
  }
  #menu-container ul {
    margin: 0;
  }
  h1 {
    margin: var(--m);
    border-bottom: var(--border-form);
    padding-bottom: var(--s);
  }
  ul li {
    margin: 0 0 2px;
  }
  ul li a {
    color: var(--text-lighter-color);
    padding: var(--m);
    display: block;
  }
  ul li a:hover {
    background: var(--background-total-color);
    transition: var(--transition);
    color: var(--main-color);
  }
`;
