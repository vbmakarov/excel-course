import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {$} from '@core/dom';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }
  toHtml() {
    const tableName = this.store.getState().title || defaultTitle
    return `<input type="text" class="input" value = "${tableName}"/>
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">logout</i>
                </div>
            </div>`
  }

  onInput(event) {
    const title = $(event.target).getValue
    this.$dispatch(changeTitle(title))
  }
}
