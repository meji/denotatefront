import { css } from 'lit-element'

export const this_styles = css`
  .notice.active {
    opacity: 0.8;
    top: 0;
  }
  .notice {
    top: -200px;
    opacity: 0;
    display: flex;
    margin: 0;
    position: fixed;
    width: 100vw;
    padding: var(--m) var(--l);
    background: var(--main-color);
    color: var(--background-color);
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    left: 0;
    box-sizing: border-box;
    z-index: 10000000;
    font-family: var(--title-font);
  }
`
