import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  './element'
import './flash'
import './assets/CSS/global.css'
import axios from 'axios'

axios.defaults.baseURL = ''
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
