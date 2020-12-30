import { css } from "lit-element";

export const this_styles = css`
  .option-item {
    display: inline-block;
    margin-right: var(--s);
  }
  .option-item label {
    color: var(--font-body-color);
    font-size: 100%;
    display: flex;
    align-items: center;
    font-family: var(--title-font);
  }
  .radio-button__control {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 6px;
    vertical-align: middle;
    background-color: var(--form-md-background);
    border: 2px solid var(--form-md-background);
    border-radius: 100%;
  }
  .radio-button__input {
    opacity: 0;
    position: absolute;
  }
  .radio-button__input:checked + .radio-button__control {
    background: var(--background-color);
  }
  .radio-button__input:checked + .radio-button__control:after {
    content: "";
    display: block;
    position: absolute;
    top: 6px;
    left: 6px;
    width: 12px;
    height: 12px;
    background-color: var(--main-color);
    border-radius: 100%;
  }

  .radio-button__label,
  .checkbox-button__label {
    display: inline-block;
    vertical-align: middle;
  }

  .checkbox-button__label {
    width: calc(100% - 35px);
  }
  .checkbox-button__control {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 6px;
    vertical-align: top;
    background-color: var(--form-md-background);
    border: 2px solid var(--form-md-background);
    border-radius: 4px;
  }
  .checkbox-button__input {
    opacity: 0;
    position: absolute;
  }
  .checkbox-button__input:checked + .checkbox-button__control {
    background: var(--background-color) url("/check.svg") no-repeat center
      center;
  }
  .checkbox-button__input:checked + .checkbox-button__control:after {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: 3px;
    width: 12px;
    height: 12px;
    background-size: 100%;
  }
`;
