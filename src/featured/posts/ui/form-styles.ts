import { css } from "lit-element";

export const this_styles = css`
  .form-column-container {
    display: grid;
    grid-template-columns: 1fr 173px;
    width: 100%;
    column-gap: 40px;
  }

  .categories option-c {
    display: block;
    margin-bottom: var(--m);
  }

  .tag {
    padding: var(--s);
    font-family: var(--title-font);
    border-radius: var(--rm);
    background: var(--form-background-color);
    margin: 0 var(--s) var(--s) 0;
  }
  .cut:hover {
    transform: rotate(180deg);
    transition: var(--transition);
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    .form-column-container {
      grid-template-columns: 1fr;
    }
  }
`;
