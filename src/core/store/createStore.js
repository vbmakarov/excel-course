export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer(initialState, {type: '__INIT__'})
  let listeners = []

  return {
    subscrube(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach((fn) => {
        fn(state)
      })
    },
    getState() {
      // обернули в json чтобы в классе
      // StoreSubcriber переменная prevState не превращалась в измененный state
      return JSON.parse(JSON.stringify(state))
    }
  }
}

// export class Store {
//   constructor(rootReducer, initialState = {}) {
//     this.rootReducer = rootReducer
//     this.state = this.rootReducer(initialState, {type: '__INIT__'})
//     this.listeners = []
//   }
//
//   subscribe(fn) {
//     this.listeners.push(fn)
//     return {
//       unsubscribe(fn) {
//         this.listeners.filter((l) => l !== fn)
//       }
//     }
//   }
//
//   dispatch(action) {
//     this.state = this.rootReducer(this.state, action)
//     this.listeners.forEach((listener) => {
//       listener(this.state)
//     })
//   }
//
//   getState() {
//     return this.state
//   }
// }


