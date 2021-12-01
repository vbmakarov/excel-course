import {getNewObj, storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  rowstate: {},
  colstate: {},
  dataState: {},
  currentText: '',
  applyStyles: {},
  title: defaultTitle,
  data: '',
  changeStyles: defaultStyles,
}

// export const initialState = storage('excel-course')?
//     storage('excel-course') : getNewObj(defaultState)

export function normalizeState(param) {
  return storage(param)?
      storage(param) : getNewObj(defaultState)
}
