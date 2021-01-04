export const serializeForm = (form: HTMLFormElement) => {
  var obj = {}
  var formData = new FormData(form)
  for (let key of formData.keys()) {
    // @ts-ignore
    obj[key] = formData.get(key)
  }
  return obj
}

export const getId = (): any => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('id')
}

export const getAdminUrl = (): string => {
  const path = window.location.href
  const hash = window.location.href.split('?id=')
  const id = hash[hash.length - 1]
  if (path.includes('/categorias/')) {
    return '/admin/categories/edit' + '?id=' + id
  } else if (path.includes('/post')) {
    return '/admin/posts/edit' + '?id=' + id
  }
  return '/admin'
}

export const countErrors = (e: HTMLElement): number => {
  let counter = 0
  e.shadowRoot!.querySelectorAll('input-c').forEach(e => {
    if (e.shadowRoot!.querySelector('input')!.validationMessage) {
      counter++
    }
  })
  return counter
}

export const setTitleDescription = (title: string, description: string) => {
  document.title = title
  let allMetaElements = document.getElementsByTagName('meta')
  for (var i = 0; i < allMetaElements.length; i++) {
    if (allMetaElements[i].getAttribute('name') == 'description') {
      allMetaElements[i].setAttribute('content', description)
      break
    }
  }
}

export const notify = (type: string, message: string, e?: HTMLElement | null) => {
  const ev = new CustomEvent('notification-event', {
    detail: { message: message, type: type },
    bubbles: true,
    composed: true
  })
  return e ? e.dispatchEvent(ev) : document.body.querySelector('div')!.dispatchEvent(ev)
}
