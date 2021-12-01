import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubcriber} from '@core/StoreSubcriber';

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.storeSubscriber = new StoreSubcriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'Excel')
    const options = {
      emitter: this.emitter,
      store: this.store
    }
    this.components = this.components.map((Component) => {
      const elem = $.create('div', Component.className)
      const component = new Component(elem, options)
      elem.html(component.toHtml())
      $root.append(elem)
      return component;
    })
    return $root
  }

  init() {
    this.storeSubscriber.subscribeComponents(this.components)
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.storeSubscriber.unsubscribeComponents()
    this.components.forEach((component) => component.destroy())
  }
}
