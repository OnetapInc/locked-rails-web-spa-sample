import Vue from 'vue'
import { toDate, toDateTime, toYearMonthWithDot } from '../lib/date'
import { moneyFormat, numberFormat } from '../lib/number'

Vue.filter('date', toDate)
Vue.filter('datetime', toDateTime)
Vue.filter('year_month_dot', toYearMonthWithDot)
Vue.filter('money', moneyFormat)
Vue.filter('number', numberFormat)

export default {}
