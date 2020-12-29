import { css } from "lit-element";

export const this_styles = css`
  .module {
    margin-bottom: var(--xl);
    width: 100%;
  }

  .module * {
    font-size: 100%;
  }
  .module .brief {
    margin: 0;
  }
  .module:hover {
    cursor: pointer;
  }
  .img-container {
    width: 100%;
    height: 150px;
  }
  .img-container img {
    border-radius: var(--rs);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .module h2 {
    font-size: 110%;
  }
  h2 {
    margin: var(--m) 0 0 !important;
  }
  @media (max-width: 768px) {
    .module .img-container {
      height: 200px;
    }
  }
`;
