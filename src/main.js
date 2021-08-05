import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import InputAutoMon from "./plugins/input-automon"

Vue.config.productionTip = false
Vue.use(InputAutoMon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
