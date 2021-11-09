const CODE = {
  A: 65,
  Z: 90
}

function createCell(content) {
  return `<div class="cell" contenteditable="true">${content}</div>`
}

function createColumn(content) {
  return `<div class="column">${content}</div>`
}

function createRow(columns, index = '') {
  return `<div class="row">
            <div class="row__info">
                ${index}
            </div>
            <div class="row__data">
                ${columns}
            </div>
        </div>`
}

function getChar(_, index) {
  return String.fromCharCode(CODE.A + index)
}

export function createTable(rowsCount = 15) {
  const countCodes = CODE.Z - CODE.A + 1
  const rows = []

  const columns = new Array(countCodes)
      .fill(' ')
      .map(getChar)
      .map(createColumn)
      .join('')
  rows.push(createRow(columns))

  const cells = new Array(countCodes)
      .fill('')
      .map(createCell)
      .join('')

  for (let i = 1; i <= rowsCount; i++) {
    rows.push(createRow(cells, i))
  }

  return rows.join('')
}
