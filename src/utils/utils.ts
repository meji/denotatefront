import { ID } from "../featured/shared/id/id";

export const serializeForm = (form: HTMLFormElement) => {
  var obj = {};
  var formData = new FormData(form);
  for (let key of formData.keys()) {
    // @ts-ignore
    obj[key] = formData.get(key);
  }
  return obj;
};

export const getId = (): ID => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

export const countErrors = (e: HTMLElement): number => {
  let counter = 0;
  e.shadowRoot.querySelectorAll("input-c").forEach(e => {
    if (e.shadowRoot.querySelector("input").validationMessage) {
      counter++;
    }
  });
  return counter;
};
