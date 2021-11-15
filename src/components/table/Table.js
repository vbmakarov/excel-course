import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resize} from '@/components/table/table.resizer';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHtml() {
    return createTable(50)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resize(event, this.root)
    }
  }
}
