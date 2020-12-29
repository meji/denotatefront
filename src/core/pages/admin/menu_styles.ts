import { css } from "lit-element";

export const this_styles = css`
  #menu-container {
    min-height: 100vh;
    background: var(--background-color);
    width: 200px;
    padding: var(--l) var(--s);
    border-right: var(--border-form);
    position: fixed;
    font-family: var(--title-font);
  }
  #menu-container ul {
    margin: 0;
  }
  h1.h4 {
    margin: var(--m) 0 var(--m) var(--m);
    border-bottom: var(--border-form);
    padding-bottom: var(--s);
  }
  ul li {
    margin: 0 0 2px;
  }
  ul li a {
    color: var(--text-form-color);
    padding: var(--m);
    display: block;
    font-family: var(--title-font);
  }
  ul li a:hover {
    background: var(--background-total-color);
    transition: var(--transition);
    color: var(--main-color);
  }
  img {
    margin: var(--m) auto var(--xl);
    display: block;
  }
`;
