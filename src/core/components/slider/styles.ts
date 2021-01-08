import { css } from 'lit-element'

export const this_styles = css`
  * {
    box-sizing: border-box;
  }
  .swiper-container {
    width: 100vw;
    height: 400px;
    overflow: hidden;
  }

  .swiper-slide:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-indexz: 0;
  }

  .img-container {
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    x-index: 0;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .data {
    position: relative;
    z-index: 1;
    width: 400px;
    height: 100%;
    max-width: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: var(--l);
    margin: auto;
    justify-content: center;
    align-items: center;
  }
  .data h2,
  .data p {
    color: rgba(255, 255, 255, 0.85);
    text-align: center;
    margin: 0;
    cursor: pointer;
  }
  .data p {
    color: rgba(255, 255, 255, 0.7);
  }
  .data h2:hover,
  .data p:hover {
    opacity: 0.8;
  }
  .swiper-container .swiper-pagination-bullet-active,
  .swiper-container .swiper-pagination-bullet {
    background: #fff;
  }
  .swiper-button-next:after,
  .swiper-container .swiper-container-rtl .swiper-button-prev:after {
    content: '👉';
    color: #fff;
  }
  .swiper-container .swiper-button-prev:after,
  .swiper-container .swiper-container-rtl .swiper-button-next:after {
    content: '👈';
    color: #fff;
  }
  .swiper-button-next,
  .swiper-button-prev {
    opacity: 0;
  }
  .swiper-container:hover .swiper-button-next,
  .swiper-container:hover .swiper-button-prev {
    opacity: 0.5;
    font-size: 250%;
    margin-top: -10px;
  }
  .swiper-container:hover .swiper-button-next:hover,
  .swiper-container:hover .swiper-button-prev:hover {
    opacity: 0.9;
  }
`
