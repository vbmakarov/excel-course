import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$sel = document.querySelector(selector)
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'Excel')
    const options = {emitter: this.emitter}
    this.components = this.components.map((Component) => {
      const elem = $.create('div', Component.className)
      const component = new Component(elem, options)
      elem.html(component.toHtml())
      $root.append(elem)
      return component;
    })
    return $root
  }

  render() {
    this.$sel.append(this.getRoot().$elem)
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.components.forEach((component) => component.destroy())
  }
}
