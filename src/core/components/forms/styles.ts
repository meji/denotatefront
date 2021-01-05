import { css } from 'lit-element'

export const this_styles = css`
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 90%;
    margin: 0 0 var(--xl);
    background: var(--background-total-color);
    border-radius: var(--rl);
    padding: var(--xl) var(--l);
  }
  .form-container form,
  ::slotted(form) {
    width: 100%;
  }
  .medium {
    width: 400px;
  }
  .large {
    width: 800px;
  }
  .small {
    width: 400px;
  }
  .transparent {
    background: transparent;
    padding: 0;
  }
  ::slotted(.btn-container),
  .btn-container {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1024px) {
    .form-container {
      width: 90vw !important;
      margin: var(--m) auto;
    }
  }
`
