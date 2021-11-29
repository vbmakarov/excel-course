import {parse} from '@core/parse';

const CODE = {
  A: 65,
  Z: 90
}

function getNormalizeStyle(str, toCamelCase = false) {
  // if (camelCase) {
  //   position = str.search(/-+/)
  // }
  const position = str.search(/[A-Z]+/)
  const result = str.slice(0, position) + '-' +
      str[position].toLowerCase() + str.slice(position + 1)
  return result
}

function getStylesStr(state, id, index) {
  let styleStr = ''
  const applyStyles = state.applyStyles[id]? state.applyStyles[id]: ''
  const width = state.colstate[index]? state.colstate[index]: ''
  if (applyStyles) {
    Object.keys(applyStyles).forEach((style)=>{
      styleStr+= getNormalizeStyle(style) + ':' + applyStyles[style] + ';'
    })
  }
  if (width) {
    styleStr += 'width: ' + width[index] + ';'
  }
  return styleStr
}

function createCell(row, index, state = {}) {
  const id = `${index}:${row}`
  const data = state.dataState
  const styles = getStylesStr(state, id, index)

  return `<div class="cell" contenteditable="true" data-type="cell"
  data-index = ${index}
  data-id = ${id} ${styles? 'style=' + styles: ''} 
  data-value = ${data[id]?data[id] : ''}>
    ${data[id]?parse(data[id]) : ''}</div>`
}

function createColumn(content, index, width={}) {
  return `<div class="column" data-resizer = "reizer" data-index = 
${index} ${width[index]?'style=width:' + width[index] + 'px':''}>
            ${content}
            <div class="col-resize" data-resize = "col"></div>
          </div>`
}

function createRow(cells, row = '', height = {}) {
  return `<div class="row" data-resizer = "reizer"
          data-index = "${row}" ${height[row]?
          'style = height:' + height[row] + 'px' : ''}>
            <div class="row__info">
                ${
                row?
                    row + '<div class="row-resize" data-resize = "row">' +
                    '</div>':
                    ''}
            </div>
            <div class="row__data">
                ${cells}
            </div>
        </div>`
}

function getChar(_, index) {
  return String.fromCharCode(CODE.A + index)
}


export function createTable(rowsCount = 15, state = {}) {
  const countCodes = CODE.Z - CODE.A + 1
  const rows = []
  const widthState = state.colstate
  const heightState = state.rowstate

  const columns = new Array(countCodes)
      .fill(' ')
      .map(getChar)
      .map((content, index)=>createColumn(content, index, widthState))
      .join('')
  rows.push(createRow(columns))


  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(countCodes)
        .fill('')
        .map((_, index) => createCell(row, index, state))
        .join('')
    rows.push(createRow(cells, row, heightState))
  }

  return rows.join('')
}
