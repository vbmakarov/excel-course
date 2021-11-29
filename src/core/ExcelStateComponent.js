import {ExcelComponent} from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }

  initialState(initialState) {
    this.state = {...initialState}
  }

  setState(newState) {
    this.state = {...this.state, ...newState}
    return this.state
  }
}
