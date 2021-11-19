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

  closest($selector) {
    return $(this.$elem.closest($selector))
  }

  get data() {
    return this.$elem.dataset
  }

  find($selector) {
    return $(this.$elem.querySelector($selector))
  }

  findAll($selector) {
    return this.$elem.querySelectorAll($selector)
  }

  getCoords() {
    return this.$elem.getBoundingClientRect()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$elem.textContent =text
    }
    return this.$elem.textContent.trim()
  }


  css(styles = {}, remove) {
    if (remove) {
      this.$elem.removeAttribute('style')
      return
    }
    Object
        .keys(styles)
        .forEach((key)=> {
          this.$elem.style[key] = styles[key]
        })
  }

  addClass(className) {
    this.$elem.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$elem.classList.remove(className)
    return this
  }

  id() {
    return this.$elem.dataset.id
  }

  focus() {
    this.$elem.focus()
    return this
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

