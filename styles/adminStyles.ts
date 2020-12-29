import { css } from "lit-element";

export const adminStyles = css`
  ::slotted(h1),
  h1 {
    margin-top: 0;
  }
  .admin-heaad-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 100%;
  }
  h1 {
    max-width: 100%;
  }
  ul.admin-list {
    max-width: 1024px;
  }
  ul.admin-list li .row {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    min-height: 20px;
  }
  ul.admin-list li .btn-container {
    opacity: 0;
    transition: var(--transition);
  }
  ul.admin-list li .row:hover {
    border-bottom: var(--border-form);
  }

  ul.admin-list li .row:hover .btn-container {
    opacity: 1;
  }
  .description {
    height: 0;
    opacity: 0;
    transition: var(--transition);
    overflow: hidden;
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
  }
  .link {
    cursor: pointer;
    text-decoration: none;
  }
  @media screen and (max-width: 1024px) {
    ul.admin-list li .row {
      border-bottom: var(--border-form);
    }
    ul.admin-list li .btn-container {
      opacity: 1;
    }
    ul.admin-list li .row {
      display: grid;
      grid-template-columns: 1fr;
    }
    h1 {
      font-size: 2.1rem;
      line-height: 1.2;
    }
  }
`;
