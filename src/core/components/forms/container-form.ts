import { LitElement, html, customElement, css, property } from "lit-element";

@customElement("form-c")
export class ContainerForm extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    :root {
      background: red;
    }
  `;

  handleSubmit = (e: any) => {
    e.preventDefault();
    alert("submitted");
  };
  // console.log(e.target, form); // successfully logs <form> element
  // window.setTimeout(() => {
  //   console.log(form); // successfully logs <form> element
  //   form!.reset(); // resets form
  // }, 2000);

  @property({ type: Object }) values = {};
  render() {
    return html`
      <div>
        <form @submit="${(e: any) => this.handleSubmit(e)}">
          <slot></slot>
        </form>
      </div>
    `;
  }
}
