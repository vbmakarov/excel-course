function createButton(button) {
  const json = JSON.stringify(button.value)
  const meta = `data-type = "button"
                 data-value = '${json}'`
  return `<div class="button${button.active? ' active': ''}" ${meta}>
            <i class="material-icons" ${meta}>${button.icon}</i>
          </div>`
}

export function createToolbar(state) {
  console.log(state)
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: state['textAlign'] === 'left'? 'none' : 'left'}
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: state['textAlign'] === 'right'? 'none' : 'right'}
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: state['textAlign'] === 'center'? 'none' : 'center'}
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {fontWeight: state['fontWeight'] === 'bold'? 'normal' : 'bold'}
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic'? 'normal' : 'italic'}
    },
    {
      icon: 'format_underline',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration: state['textDecoration'] === 'underline'?
            'none' : 'underline'}
    },
  ]
  return buttons.map(createButton).join('')
}
