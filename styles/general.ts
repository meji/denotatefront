import { css } from "lit-element";

export const general = css`
  * {
    font-family: var(--body-font);
    font-size: 16px;
    color: var(--text-body-color);
  }
  a {
    text-decoration: none;
    color: var(--main-color);
  }
  a:hover {
    cursor: pointer;
  }
  h1 {
    font-size: 150%;
    margin: 0 0 var(--l);
    font-family: var(--title-font);
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--title-font) !important;
  }

  p {
    margin-bottom: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5 {
    margin: 3rem 0 1.38rem;
    font-weight: 600;
    line-height: 1.3;
  }

  h1,
  .h1 {
    margin-top: 0;
    font-size: 3.052rem;
  }

  h2,
  .h2 {
    font-size: 2.441rem;
  }

  h3,
  .h3 {
    font-size: 1.953rem;
  }

  h4,
  .h4 {
    font-size: 1.563rem;
  }

  h5,
  .h5 {
    font-size: 1.25rem;
  }

  small,
  .text_small {
    font-size: 0.8rem;
  }

  form {
    width: 100%;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  ul li {
    list-style-type: none;
  }
  .link {
    cursor: pointer;
    text-decoration: none;
  }
`;
