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
    font-family: var(--title-font);
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
  .form-group {
    margin-bottom: var(--l);
  }
  .btn-container {
    overflow: hidden;
  }
  .image-preview-container {
    width: 100%;
    height: 300px;
    margin-bottom: var(--l);
  }
  .image-preview-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
