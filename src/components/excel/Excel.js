import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$sel = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'Excel')
    this.components = this.components.map((Component) => {
      const elem = $.create('div', Component.className)
      const component = new Component(elem)
      // DEBUG
      if (component.name) {
        console.log(component.name)
        window['c' + component.name] = component
      }
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
}
