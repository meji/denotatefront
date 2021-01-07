import { css } from 'lit-element'

export const this_styles = css`
  * {
    box-sizing: border-box;
  }

  wc-carousel-lite {
    width: 100vw;
    height: 300px;
    text-align: center;
    overflow: hidden;
    display: flex;
  }

  .img-container {
    position: relative;
    width: 100vw;
    height: 300px;
  }
  img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
