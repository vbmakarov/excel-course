import {
  TABLE_RESIZE, CHANGE_TEXT,
  CHANGE_STYLES, APPLY_STYLES, CHANGE_TITLE, CHANGE_DATE
} from '@/redux/types';

export function rootReducer(state, action) {
  let id
  let value
  switch (action.type) {
    case TABLE_RESIZE:
      if (action.data.type == 'col') {
        state.colstate = {...state.colstate, ...setNewVal(action)};
      } else if (action.data.type == 'row') {
        state.rowstate = {...state.rowstate, ...setNewVal(action)};
      }
      return state
    case CHANGE_TEXT:
      state.dataState = {...state.dataState, ...setNewVal(action)}
      state.currentText = action.data.value
      return state
    case CHANGE_STYLES:
      console.log(action.data)
      state.changeStyles = {...state.changeStyles, ...action.data}
      return state
    case APPLY_STYLES:
      id = Object.keys(action.data)[0]
      value = Object.values(action.data)[0]
      state.applyStyles = {...state.applyStyles,
        [id]: {...state.applyStyles[id], ...value}}
      return state
    case CHANGE_TITLE:
      return {...state, title: action.data}
    case CHANGE_DATE:
      return {...state, data: action.data}
    default: return state
  }
}

function setNewVal(action) {
  return {[action.data.id]: action.data.value}
}
