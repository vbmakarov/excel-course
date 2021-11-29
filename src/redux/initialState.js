import {storage} from '@core/utils';
import {defaultStyles} from '@/constants';

const defaultState = {
  rowstate: {},
  colstate: {},
  dataState: {},
  currentText: '',
  applyStyles: {},
  changeStyles: defaultStyles,
}

export const initialState = storage('excel-course')?
    storage('excel-course') : defaultState
