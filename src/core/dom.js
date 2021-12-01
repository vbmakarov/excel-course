class Dom {
  constructor(selector) {
    this.$elem = typeof selector === 'string' ?
        document.querySelector(selector) :
        selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$elem.innerHTML = html
      return this
    }
    return this.$elem.outerHTML.trim()
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

  attr(name, value) {
    if (value) {
      this.$elem.setAttribute(name, value)
      return this
    }
    return this.$elem.getAttribute(name)
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

  get getValue() {
    return this.$elem.value
  }

  text(text) {
    if (typeof text !== 'undefined') {
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

  getStyles(styles =[]) {
    return styles.reduce((obj, s) => {
      if (this.$elem.style[s]) {
        obj[s] = this.$elem.style[s]
      }
      return obj
    }, {})
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

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

