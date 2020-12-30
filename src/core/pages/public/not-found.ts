import { LitElement, html, customElement, css, query } from "lit-element";

@customElement("not-found")
export class NotFound extends LitElement {
  public static styles = css`
    html,
    body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      background: #242424;
      font-family: "Oswald", sans-serif;
      background: -webkit-canvas(noise);
      background: -moz-element(#canvas);
      overflow: hidden;
    }

    html::after {
      content: "";
      background: radial-gradient(circle, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    .center {
      height: 400px;
      width: 500px;
      position: absolute;
      top: calc(50% - 200px);
      left: calc(50% - 250px);
      text-align: center;
    }

    h1,
    p {
      margin: 0;
      padding: 0;
      -webkit-animation: funnytext 4s ease-in-out infinite;
      animation: funnytext 4s ease-in-out infinite;
    }

    h1 {
      font-size: 16rem;
      color: rgba(0, 0, 0, 0.3);
      -webkit-filter: blur(3px);
      filter: blur(3px);
    }

    p {
      font-size: 2rem;
      color: rgba(0, 0, 0, 0.6);
    }

    body::after,
    body::before {
      content: " ";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: -4px;
      height: 4px;
      -webkit-animation: scanline 8s linear infinite;
      animation: scanline 8s linear infinite;
      opacity: 0.33;
      background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5) 90%,
          rgba(0, 0, 0, 0)
        ),
        -webkit-canvas(noise);
      background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5) 90%,
          rgba(0, 0, 0, 0)
        ),
        -moz-element(#canvas);
    }

    body::before {
      -webkit-animation-delay: 4s;
      animation-delay: 4s;
    }

    @-webkit-keyframes scanline {
      0% {
        top: -5px;
      }
      100% {
        top: 100%;
      }
    }
    @keyframes scanline {
      0% {
        top: -5px;
      }
      100% {
        top: 100%;
      }
    }
    @-webkit-keyframes funnytext {
      0% {
        color: rgba(0, 0, 0, 0.3);
        -webkit-filter: blur(3px);
      }
      30% {
        color: rgba(0, 0, 0, 0.5);
        -webkit-filter: blur(1px);
      }
      65% {
        color: rgba(0, 0, 0, 0.2);
        -webkit-filter: blur(5px);
      }
      100% {
        color: rgba(0, 0, 0, 0.3);
        -webkit-filter: blur(3px);
      }
    }
    @keyframes funnytext {
      0% {
        color: rgba(0, 0, 0, 0.3);
        filter: blur(3px);
      }
      30% {
        color: rgba(0, 0, 0, 0.5);
        filter: blur(1px);
      }
      65% {
        color: rgba(0, 0, 0, 0.2);
        filter: blur(5px);
      }
      100% {
        color: rgba(0, 0, 0, 0.3);
        filter: blur(3px);
      }
    }
  `;
  @query("canvas") canvas;

  render() {
    return html`
      <canvas id="canvas" hidden></canvas>
      <div class="center">
        <h1>404</h1>

        <p>PAGE NOT FOUND.</p>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
  }
}
