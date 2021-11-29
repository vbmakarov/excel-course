import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribers: ['currentText'],
      ...options
    })
  }


  toHtml() {
    return `<div class="info">fx</div>
            <div class="input" contenteditable="true" spellcheck="false"></div>`
  }

  init() {
    super.init()
    this.$formula = this.root.find('.input')
    this.$on('table select', (cell)=> {
      this.$formula.text(cell.text())
    })
    // this.$on('table input', (text)=> {
    //   this.$formula.text(text)
    // })
    // this.$subscribe((state) => {
    //   this.$formula.text(state.currentText)
    // })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    this.$emit('text in formula', $(event.target).text())
  }

  onKeydown(event) {
    if (event.key == 'Enter') {
      event.preventDefault()
      this.$emit('go to cell', '')
    }
  }
}
