import Vue from 'vue'

import AppHeader from '../components/AppHeader.vue'
import InputWithError from '../components/InputWithError.vue'
import { setStore } from '../lib/api.js'

Vue.component('app-header', AppHeader)
Vue.component('input-with-error', InputWithError)

export default function (ctx) {
  setStore(ctx.store)
}
