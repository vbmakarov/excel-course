import {$} from '@core/dom';

export function resize(event, $root) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-resizer = "reizer"]')
  const type = $resizer.data.resize
  const coordsParent = $parent.getCoords()
  let cells = ''
  let delta = ''
  let value = ''
  if (type == 'col') {
    cells = $root.findAll(
        `[data-index="${$parent.data.index}"]`)
    $resizer.css({height: '100vh'})
  } else {
    $resizer.css({width: '100vw'})
  }


  document.onmousemove = (e) =>{
    if (type == 'col') {
      delta = e.pageX - coordsParent.right
      value = coordsParent.width + delta
      $resizer.css({left: value + 'px'})
    } else {
      delta = e.pageY - coordsParent.bottom
      value = coordsParent.height + delta
      $resizer.css({top: value + 'px'})
    }
  }

  document.onmouseup = (e) =>{
    document.onmousemove = null
    document.onmouseup = null
    if (type == 'col') {
      $parent.css({width: value + 'px'})
      $resizer.css({}, 'remove')
      cells.forEach((cell)=>{
        $(cell).css({width: value + 'px'});
      })
    } else {
      $parent.css({height: value + 'px'})
      $resizer.css({}, 'remove')
    }
  }
}
