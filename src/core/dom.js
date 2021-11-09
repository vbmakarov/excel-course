class Dom {
  constructor(selector) {
    this.$elem = typeof selector === 'string'?
        document.createElement(selector) :
        selector
  }

  html(html) {
    this.$elem.innerHTML = html
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$elem
    }
    if (Element.prototype.append) {
      this.$elem.append(node)
    } else {
      this.$elem.appendChild(node)
    }
    return this;
  }

  on(eventType, callback) {
    this.$elem.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$elem.removeEventListener(eventType, callback)
  }

  clear() {
    this.html('')
    return this
  }
}

export function $(elem) {
  return new Dom(elem)
}

$.create = function(selector, className) {
  const elem = document.createElement(selector)
  if (className) {
    elem.classList.add(className)
  }
  return $(elem)
}

