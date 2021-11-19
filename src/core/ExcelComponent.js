import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emmit = options.emitter
    this.unsubscribes = []
    this.prepare()
  }

  prepare() {}

  toHtml() {
    return '';
  }

  init() {
    this.initDomListeners()
  }

  $emit(event, ...args) {
    this.emmit.emit(event, ...args)
  }

  $on(event, ...args) {
    const unsub = this.emmit.subscribe(event, ...args)
    this.unsubscribes.push(unsub)
  }

  remove() {
    this.removeDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribes.forEach((unsub) => unsub())
  }
}
