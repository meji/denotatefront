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
  .img-container.featured {
    width: 100%;
    height: 300px;
    margin-bottom: var(--l);
  }
  .img-container.featured img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--rl);
  }
    .link {
      cursor: pointer;
      text-decoration: none;
    }
    .description a {
      color: var(--main-color);
    }
  }
`;
