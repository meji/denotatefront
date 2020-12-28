import { css } from "lit-element";

export const adminStyles = css`
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
  .form-group {
    margin-bottom: var(--l);
  }
  .btn-container,
  ::slotted(.btn-container) {
    overflow: hidden;
  }
  .image-preview-container {
    width: 100%;
    height: 300px;
    margin-bottom: var(--l);
  }
  .image-preview-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    .link {
      cursor: pointer;
      text-decoration: none;
    }
`;
