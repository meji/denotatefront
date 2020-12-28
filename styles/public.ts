import { css } from "lit-element";

export const publicStyles = css`
  h1 {
    margin-top: var(--l);
  }
  #description * {
    font-size: 20px;
  }
  #description img {
    max-width: 100%;
    margin: var(--m) auto;
    display: block;
  }
  :host {
    --background-wrapper: var(--bakground-color);
  }
`;
