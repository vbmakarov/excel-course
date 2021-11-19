export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    console.log(this.listeners[event])
    this.listeners[event].forEach((listener) =>{
      console.log(listener)
      listener(...args)
    })
    return true
  }

  subscribe(event, func) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(func)
    return ()=> {
      this.listeners[event] = this.listeners[event].filter((listener) => {
        return listener !== func
      })
    }
  }
}
