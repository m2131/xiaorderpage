import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import routes from './routes'
import Vuex from 'vuex'
import store from './vuex/store'
import util from './common/util'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(util);
Vue.config.productionTip = false
require('./assets/theme/index.css');
const router = new VueRouter({
  routes
})
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
