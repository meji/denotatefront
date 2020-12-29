import { css } from "lit-element";

export const this_styles = css`
  header {
    display: flex;
    padding: var(--l) var(--xl);
    align-items: center;
    justify-content: flex-start;
  }
  header img {
    cursor: pointer;
    max-width: 250px;
    max-height: 90px;
    position: relative;
    z-index: 1;
  }
  header img.default {
    margin: 0 var(--l) 0 0;
  }
  header img.invert {
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

  #menu-icon {
    display: none;
    justify-self: flex-end;
    width: 30px;
    height: 40px;
    padding: var(--s);
    z-index: 4;
  }
  #menu-icon:after,
  #menu-icon:before,
  #menu-icon div {
    background-color: var(--text-body-color);
    content: "";
    display: block;
    height: 1.5px;
    margin: 10px 0;
    border-radius: 1px;
    transition: var(--transition);
  }

  @media screen and (max-width: 1024px) {
    header {
      justify-content: space-between;
      padding: var(--m);
    }
    nav {
      position: fixed;
      top: 0;
      left: 0;
      background: var(--background-total-color);
      z-index: 0;
      opacity: 0.5;
      transform: translateX(-100%);
      transition: var(--transition);
    }
    nav ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      padding: 0;
    }
    nav ul li {
      display: block;
      font-size: 2.1rem;
      margin-bottom: var(--xl);
    }
    nav ul li span {
      color: var(--text-body-color);
    }

    header img {
      max-width: 180px;
      max-height: 70px;
    }

    #menu-icon {
      display: inline-block;
    }
    #header.open {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100vw;
      box-sizing: border-box;
      padding-bottom: ;
    }

    #header.open nav {
      transform: translateX(0px);
      opacity: 0.92;
    }

    #header.open nav {
      transform: translateX(0px);
      opacity: 0.96;
    }

    #header.open #menu-icon:before {
      transform: translateY(13px) rotate(-225deg);
    }
    #header.open #menu-icon div {
      transform: translateY(0px) rotate(225deg);
    }
    #header.open #menu-icon:after {
      transform: translateY(-10px) rotate(225deg);
    }
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
