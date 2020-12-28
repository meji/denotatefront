import { css } from "lit-element";

export const admin = css`
  .admin-heaad-container {
    display: flex;
    justify-content: space-between;
  }
  ul.admin-list {
    max-width: 800px;
  }
  ul.admin-list li .row {
    display: flex;
    justify-content: space-between;
  }
  ul.admin-list li .btn-container {
    opacity: 0;
    transition: var(--transition);
  }
  ul.admin-list li:hover {
    border-bottom: var(--border-form);
  }

  ul.admin-list li:hover .btn-container {
    opacity: 1;
  }
  .description {
    height: 0;
    opacity: 0;
    transition: var(--transition);
  }
  .description.visible {
    height: auto;
    opacity: 1;
    padding: var(--m) 0;
  }
`;
