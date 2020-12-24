import { LitElement, html, customElement, css, property } from "lit-element";

@customElement("post-page")
export class Post extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String }) title = "Hey there";

  @property({ type: Number }) counter = 5;

  __increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <h1>Post</h1>
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
      <slot></slot>
    `;
  }
}
