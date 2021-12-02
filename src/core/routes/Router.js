import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';

export class Route {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()
    const param = ActiveRoute.parent()
    const Page = !param || param==='dashboard'?
        this.routes.dashboard : this.routes[param]
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
