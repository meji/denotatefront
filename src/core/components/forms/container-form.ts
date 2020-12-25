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

  handleSubmit(e: any) {
    e.preventDefault();
    const form = this.shadowRoot!.querySelector("form");
    form!.map((element: HTMLFormElement) => {
      const key: string = element.name;
      const value = element.value;
      this.values = { ...this.values, [key]: value };
    });
    console.log(e.target, form); // successfully logs <form> element
    window.setTimeout(() => {
      console.log(form); // successfully logs <form> element
      form!.reset(); // resets form
    }, 2000);
  }
  @property({ type: Object }) values = {};
  render() {
    return html`
      <form @submit="${(e: any) => this.handleSubmit(e)}>
        <slot></slot>
      </form>
    `;
  }
}
