import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import Grid from "gridjs-vue";
Vue.use(Grid);

import Notifications from "vue-notification";
Vue.use(Notifications);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
