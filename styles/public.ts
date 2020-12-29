import { css } from "lit-element";

export const publicStyles = css`
  h1 {
    margin-top: var(--l);
  }
  #description {
    font-size: var(--font-size-big);
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
  .modules-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;
    margin: calc(var(--l) * 2) 0;
  }
  @media (max-width: 768px) {
    .modules-container {
      width: 100%;
      grid-template-columns: 1fr;
      grid-column-gap: 0;
      margin: 0;
    }
  }
  .brief {
    font-weight: 800;
    margin: var(--m) 0;
    font-size: var(--font-size-big);
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 2.1rem;
      line-height: 1.2;
    }
  }
`;
