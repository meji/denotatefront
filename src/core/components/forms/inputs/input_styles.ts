import { css } from "lit-element";

export const this_styles = css`
  * {
    box-sizing: border-box;
    font-family: var(--body-text-font);
  }
  .form-group {
    position: relative;
    margin: 0 0 var(--l);
  }
  input.outline {
    border: 1px solid --var(main-color);
    border-radius: 5px;
  }
  label {
    position: absolute;
    font-size: 1rem;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: transparent;
    padding: 0 0.3rem;
    margin: 0 0.5rem;
    transition: 0.1s ease-out;
    transform-origin: left top;
    pointer-events: none;
    font-family: var(--title-font);
  }
  input {
    font-size: 1rem;
    outline: none;
    border: none;
    border-radius: 0;
    padding: 1rem 0.6rem;
    color: var(--text-form-color);
    transition: 0.1s ease-out;
    border: var(--border-form);
    background: var(--form-background-color);
    cursor: text;
    margin-left: auto;
    width: 100%;
    margin-right: auto;
  }
  input:focus {
    border-color: var(--main-color);
  }
  input:focus + label {
    color: var(--main-color);
    top: 0;
    transform: translateY(-50%) scale(0.9);
    background: var(--form-background-color);
    padding: 0 2px;
    border-radius: var(--rl);
  }
  input:not(:placeholder-shown) + label {
    top: 0;
    transform: translateY(-50%) scale(0.9);
  }
  input:focus:not(.outline) ~ label,
  input:not(:placeholder-shown):not(.outline) ~ label {
    padding-left: 0px;
  }
  input:disabled,
  input:disabled ~ .label {
    opacity: 0.5;
  }
  .err {
    margin: 0;
    color: red;
    font-size: 11px;
    font-family: Helvetica, Arial, Sans Serif;
  }
`;
