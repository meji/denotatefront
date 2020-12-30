import { css } from "lit-element";

export const this_styles = css`
  .form-column-container {
    display: grid;
    grid-template-columns: 1fr 150px;
    width: 100%;
    column-gap: 40px;
  }

  .categories option-c{
    display: block;
    margin-bottom: var(--m)
  }

  @media screen and (max-width: 1024px){
    .form-column-container {
      grid-template-columns: 1fr;
    }
`;
