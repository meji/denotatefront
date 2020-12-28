import { css } from "lit-element";

export const theme = css`
  #wrapper {
    --main-color: #ff016c;
    --body-font: "Cardo", Helvetica, Sans Serif;
    --title-font: "Josefin Sans", Helvetica, Sans Serif;
    --base-font-size: 16px;
    --font-size-small: 0.8rem;
    --font-size-big: 20px;
    --line-height: 1.4;

    --base-p: 0.25rem;
    --s: calc(var(--base-p) * 2.5);
    --m: calc(var(--base-p) * 4);
    --l: calc(var(--base-p) * 6);
    --xl: calc(var(--base-p) * 8);

    --rs: 2px;
    --rm: 4px;
    --rl: 6px;

    --border-form-focus: 1px solid #a60146;
    --border-form-error: 1px solid red;
    --border-form-ok: 1px solid green;
    --color-ok: green;

    --transition: 0.5s;
    --transition-slow: 1s;
    --transition-fast: 0.25s;
    --transition-ultra-fast: 0.2s;

    --box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    --background-wrapper-size: var(--dot-space) var(--dot-space);
    --dot-size: 1px;
    --dot-space: 18px;
    --dot-difference: calc(var(--dot-space) - var(--dot-size));
  }

  #wrapper.dark {
    --on-primary-color: #fff;
    --text-body-color: #fff;
    --text-title-color: #fff;
    --text-form-color: #efefef;
    --text-lighter-color: #666;
    --label-color: var(--text-lighter-color);
    --label-focused-color: #ccc;
    --form-background-color: rgb(0, 0, 0);
    --background-color: #222;
    --background-total-color: #000;
    --text-error: #ff0000;
    --form-md-background: #333;
    --form-dark-background: #444;
    --border-form: 1px solid #333;
    --border-box: 1px solid #222;
    --bg-overlay: rgba(255, 255, 255, 0.4);
    --box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
    --icon-color: var(--main-color);
    --background-wrapper: linear-gradient(
          90deg,
          var(--background-color) var(--dot-difference),
          transparent 1%
        )
        center,
      linear-gradient(
          var(--background-color) var(--dot-difference),
          transparent 1%
        )
        center,
      #666666;
  }

  #wrapper.light {
    /*Colors*/
    --on-primary-color: #fff;
    --on-total-color: #000000;
    --secondary-color: #ff016c;
    --terciary-color: orange;
    --text-body-color: #333;
    --text-title-color: #333;
    --text-form-color: #444;
    --text-lighter-color: #777;
    --text-error: #ff0000;
    --label-color: var(--text-lighter-color);
    --label-focused-color: #aaa;
    --form-background-color: #fff;
    --background-color: #f0f0f0;
    --background-total-color: #fff;
    --form-md-background: #fcfcfc;
    --form-dark-background: #ddd;
    --border-form: 1px solid #dddddd;
    --border-box: 1px solid #efefef;
    --bg-overlay: rgba(0, 0, 0, 0.6);
    --box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    --icon-color: var(--main-color);
    --background-wrapper: linear-gradient(
          90deg,
          var(--background-color) var(--dot-difference),
          transparent 1%
        )
        center,
      linear-gradient(
          var(--background-color) var(--dot-difference),
          transparent 1%
        )
        center,
      #bbbbbb;
  }
`;
