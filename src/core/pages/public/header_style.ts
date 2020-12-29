import { css } from "lit-element";

export const this_styles = css`
  nav {
    display: flex;
    padding: var(--l) var(--xl);
    align-items: flex-end;
    justify-content: flex-start;
  }
  nav img {
    cursor: pointer;
    max-width: 250px;
    max-height: 90px;
  }
  nav img.default {
    margin: 0 var(--l) 0 0;
  }
  nav img.invert {
    filter: invert(1);
  }
  nav ul li {
    position: relative;
    display: inline-block;
    margin: 0 0 0 var(--xl);
  }

  nav ul li span {
    font-family: var(--title-font) !important;
    text-transform: capitalize;
    position: relative;
    outline: 0;
  }

  nav ul li span:hover {
    color: var(--main-color);
  }

  nav ul li span:hover:after {
    content: "";
    width: 100%;
    height: 2px;
    background: var(--main-color);
    display: block;
    margin-top: 5px;
    position: absolute;
    animation: 0.5s in-out forwards;
  }
  @keyframes in-out {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
