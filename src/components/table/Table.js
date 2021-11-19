import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resize} from '@/components/table/table.resizer';
import {shouldResize, isCell} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {range} from '@core/utils';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHtml() {
    return createTable(50)
  }

  init() {
    super.init()
    const $cell = this.root.find('[data-id = "0:1"]')
    this.selectCell($cell)
    this.$on('text in formula', (text)=>{
      this.selection.current.text(text)
    })
    this.$on('go to cell', ()=>{
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resize(event, this.root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (!event.shiftKey) {
        this.selection.select($target)
      } else {
        const target = ($target.id().split(':'))
        const current = (this.selection.current.id().split(':'))

        const cols = (range(target[0], current[0]))
        const rows = (range(target[1], current[1]))

        const ids = cols.reduce((acc, elem)=> {
          return acc.concat(rows.map((unit, i)=> {
            return `${elem}:${unit+1}`
          }))
        }, [])

        console.log(ids)

        const cells = ids.map((elem, index) =>{
          return this.root.find(`[data-id="${elem}"]`)
        })
        this.selection.selectGroup(cells)
      }
    }
  }

  onKeydown(event) {
    const arr = ['Tab',
      'ArrowRight',
      'ArrowLeft',
      'Enter',
      'ArrowDown',
      'ArrowUp']
    if (!event.shiftKey && arr.indexOf(event.key) !== -1) {
      const nextCell = this.selection.nextCell(event, this.root)
      console.log(nextCell)
      this.$emit('table select', nextCell)
    }
  }

  onInput(event) {
    this.selection.current.text(event.target.textContent)
    this.$emit('table input', event.target.textContent)
  }
}

