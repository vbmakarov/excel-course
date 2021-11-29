import {isEquals} from '@core/utils';

export class StoreSubcriber {
  constructor(store) {
    this.store = store
    this.unsub = null
    this.prevState = null
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()

    this.unsub = this.store.subscrube((state) => {
      Object.keys(this.prevState).forEach((key) => {
        if (!isEquals(this.prevState[key], state[key])) {
          components.forEach((component) => {
            if (component.subscribers.includes(key)) {
              const change = {[key]: state[key]}
              component.storeChanged(change)
            }
          })
        }
      })
      this.prevState = this.store.getState()
    })
  }

  unsubscribeComponents() {
    this.unsub.unsubscribe()
  }
}
