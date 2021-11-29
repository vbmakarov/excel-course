export class TableSelection {
  static className = 'selected'

  constructor() {
    this.lastSelectedElems = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.lastSelectedElems.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  clear() {
    if (this.lastSelectedElems) {
      this.lastSelectedElems.forEach((elem) => {
        elem.removeClass(TableSelection.className)
      })
      this.lastSelectedElems = []
    }
  }

  selectGroup($group = []) {
    this.clear()
    this.lastSelectedElems = $group
    this.lastSelectedElems.forEach((elem)=>{
      elem.addClass(TableSelection.className)
    })
  }

  nextCell(event, $root) {
    const current = this.current.data.id.split(':')
    let newIndexCell = null
    let newCellId = null
    switch (event.key) {
      case 'Tab':
      case 'ArrowRight':
        newIndexCell = +current[0] + 1
        newCellId = newIndexCell + ':' + current[1]; break;
      case 'ArrowLeft':
        newIndexCell = +current[0] > 0 ? +current[0] - 1 : current[0]
        newCellId = newIndexCell + ':' + current[1]; break;
      case 'Enter':
      case 'ArrowDown':
        newIndexCell = +current[1] + 1
        newCellId = current[0]+ ':' + newIndexCell; break;
      case 'ArrowUp':
        newIndexCell = +current[1] > 1 ? +current[1] - 1 : current[1]
        newCellId = current[0]+ ':' + newIndexCell; break;
    }
    const cell = $root.find(`[data-id="${newCellId}"]`)
    this.select(cell)
    return cell
  }

  applyStyles(style) {
    this.lastSelectedElems.forEach(($el) => $el.css(style))
  }
}

