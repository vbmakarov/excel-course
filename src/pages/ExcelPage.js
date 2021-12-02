import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeState} from '@/redux/initialState';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Page} from '@core/Page';

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params? this.params: Date.now().toString()
    const stateName = storageName(params)
    const store = createStore(rootReducer, normalizeState(stateName))

    const stateListener = debounce((state)=> {
      storage(stateName, state)
    }, 300)

    // сохраняет state в localstorage каждый раз при выполнении dispatch
    store.subscrube(stateListener)
    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy();
  }
}
