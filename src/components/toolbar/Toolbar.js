import {createToolbar} from '@/components/toolbar/toolbar.tamplate';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constants';
import * as action from '@/redux/actions';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribers: ['changeStyles'],
      ...options
    })
  }

  prepare() {
    this.initialState(defaultStyles)
  }

  get getTemplate() {
    return createToolbar(this.state)
  }

  init() {
    super.init()
    const state = this.store.getState()
    this.setState(state.changeStyles)
    this.root.html(this.getTemplate)
  }

  toHtml() {
    return this.getTemplate
  }

  storeChanged(styles) {
    this.setState(styles.changeStyles)
    this.root.html(this.getTemplate)
  }

  onClick(event) {
    if ($(event.target).data.type == 'button') {
      const state = JSON.parse($(event.target).data.value)
      const newStyleState = this.setState(state)
      this.$dispatch(action.changeStyles(newStyleState))
      this.$emit('toolbar:set-styles', state)
      this.root.html(this.getTemplate)
    }
  }
}
