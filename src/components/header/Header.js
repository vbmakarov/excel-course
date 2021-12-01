import {ExcelComponent} from '@core/ExcelComponent';
import {changeDate, changeTitle} from '@/redux/actions';
import {$} from '@core/dom';
import {defaultTitle} from '@/constants';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {removeStorage} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }
  toHtml() {
    const tableName = this.store.getState().title || defaultTitle
    const date = Date.now().toString() || ActiveRoute.param
    this.$dispatch(changeDate(date))
    return `<input type="text" class="input" value = "${tableName}"/>
            <div>
                <div class="button">
                    <i class="material-icons" 
                    data-id = excel:${ActiveRoute.param}>delete</i>
                </div>
                <div class="button">
                    <i class="material-icons" data-id="logout">logout</i>
                </div>
            </div>`
  }

  onInput(event) {
    const title = $(event.target).getValue
    this.$dispatch(changeTitle(title))
  }

  onClick(event) {
    const button = $(event.target).data
    console.log(button.id)
    if (button.id ==='logout') {
      window.location.assign('http://localhost:3000/#')
    } else if (button.id.includes('excel')) {
      const confirm = window.confirm(
          'Вы действительно хотите удалить эту страницу?')
      if (confirm) {
        removeStorage(button.id)
        window.location.assign('http://localhost:3000/#')
      }
    }
  }
}
