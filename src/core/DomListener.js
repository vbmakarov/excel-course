import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No root provided for DomListener`)
    }
    this.root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach((listener)=>{
      const method = getNameOfListener(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} 
          is not implemented in ${name} Component`)
      }
      this[method] = this[method].bind(this)
      // оболочка для addEventListener
      this.root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener)=>{
      const method = getNameOfListener(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} 
          is not implemented in ${name} Component`)
      }
      // оболочка для addEventListener
      this.root.off(listener, this[method])
    })
  }
}

function getNameOfListener(listener) {
  return 'on'+capitalize(listener)
}
