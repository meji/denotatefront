import { css } from "lit-element";

export const this_styles = css`
  .module {
    width: 100%;
  }
  .module:hover {
    cursor: pointer;
  }
  p {
    font-size: 80%;
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
  h2 {
    margin: var(--m) 0 0 !important;
  }
  @media (max-width: 768px) {
    .module .img-container {
      height: 200px;
    }
  }
`;
