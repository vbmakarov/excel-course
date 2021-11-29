import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resize} from '@/components/table/table.resizer';
import {shouldResize, isCell} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {range} from '@core/utils';
import * as action from '@/redux/actions.js'
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

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
    const state = (this.store.getState())
    return createTable(50, state)
  }

  init() {
    super.init()
    const $cell = this.root.find('[data-id = "0:1"]')
    this.selectCell($cell)

    this.$on('text in formula', (text)=>{
      this.selection.current.attr('data-value', text)
          .text(parse(text))
      this.updateTextStore(text)
    })

    this.$on('go to cell', ()=>{
      this.selection.current.focus()
    })

    this.$on('toolbar:set-styles', (styles)=> {
      this.selection.applyStyles(styles)
      this.selection.lastSelectedElems.forEach((elem) => {
        this.$dispatch(action.applyStyles({[elem.id()]: styles}))
      })
    })
  }

  selectCell($cell) {
    console.log($cell)
    this.selection.select($cell)
    this.$emit('table select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    console.log(styles)
    if (Object.keys(styles).length !== 0) {
      this.$dispatch(action.changeStyles({...defaultStyles, ...styles}))
    } else {
      this.$dispatch(action.changeStyles(defaultStyles))
    }
  }

  async resizeTable(event, root) {
    try {
      const data = await resize(event, root)
      this.$dispatch(action.tableResize(data))
    } catch (e) {
      console.log(e)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event, this.root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (!event.shiftKey) {
        this.selectCell($target)
        this.$dispatch($target)
      } else {
        const target = ($target.id().split(':'))
        const current = this.selection.current.id().split(':')
        const cols = (range(target[0], current[0]))
        const rows = (range(target[1], current[1]))

        const ids = cols.reduce((acc, elem)=> {
          return acc.concat(rows.map((unit, i)=> {
            return `${elem}:${unit+1}`
          }))
        }, [])
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

  updateTextStore(text) {
    this.$dispatch(action.changeText({
      id: this.selection.current.id(),
      value: text
    }))
  }
  onInput(event) {
    // this.selection.current.text(event.target.textContent)
    // this.$emit('table input', event.target.textContent)
    this.updateTextStore($(event.target).text())
  }
}

