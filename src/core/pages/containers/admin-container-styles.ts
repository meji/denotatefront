import { css } from "lit-element";

export const this_styles = css`
  main {
    display: grid;
    grid-template-columns: 225px 1fr;
  }
  .content {
    padding: calc(var(--l) * 2) calc(var(--l) * 2);
  }
  header {
    display: none !important;
  }
  @media screen and (max-width: 1024px) {
    header {
      display: flex !important;
    }
    main {
      grid-template-columns: 1fr;
    }
    .menu {
      transform: translateX(-100vw);
      transition: var(--transition);
      position: fixed;
      top: 0;
      left: 0;
      width: calc(200px);
      background: var(--background-color);
      opacity: 0.95;
    }
    .content {
      padding: var(--m);
    }
    .open .menu {
      transform: translateX(0);
      z-index: 10;
    }
  }
`;
