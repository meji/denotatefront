import { LitElement } from "lit-element";

class LitElementLight extends LitElement {
  slotMap: object;

  connectedCallback() {
    this.slotMap = Array.from(
      this.renderRoot.querySelectorAll("[slot]")
    ).reduce(
      (map, obj) => ({
        ...map,
        [obj.getAttribute("slot")]: obj
      }),
      {}
    );

    super.connectedCallback();
  }

  protected getSlot(slotName: string): ChildNode {
    return this.slotMap && this.slotMap[slotName];
  }

  createRenderRoot() {
    return this;
  }
}

export { LitElementLight };
