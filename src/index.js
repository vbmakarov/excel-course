import './scss/style.scss';
import {Route} from '@core/routes/Router';
import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';

new Route('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})


