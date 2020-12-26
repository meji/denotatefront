export const serializeForm = (form: HTMLFormElement) => {
  var obj = {};
  var formData = new FormData(form);
  for (let key of formData.keys()) {
    // @ts-ignore
    obj[key] = formData.get(key);
  }
  return obj;
};
