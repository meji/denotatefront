import {css} from 'lit-element';

export const this_styles = css`
    button {
      font-family: var(--title-font);
      padding: calc(var(--m)) calc(var(--l) * 2);
      font-size: var(--base-font-size);
      border: 1px solid var(--main-color);
      border-radius: var(--rm);
      background: var(--background-color);
      color: var(--main-color);
    }
    button:hover span.text {
      //mix-blend-mode: difference;
      color: var(--body-text-color);
      //filter: brightness(0.5);
    }
    button.small {
      padding: var(--s) var(--m);
    }
    button.extrasmall {
      padding: calc(var(--s) / 2) var(--s);
    }
    button:hover {
      color: var(--text-body-color);
      cursor: pointer;
      background: var(--main-color);
    }
    button.right {
      float: right;
    }
    button.transparent {
      border: none;
      background: transparent !important;
      opacity: 0.7;
    }
    button.transparent:hover {
      opacity: 1;
    }
  `;
