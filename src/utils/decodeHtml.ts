export const decodeHTML = function (html: string) {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }