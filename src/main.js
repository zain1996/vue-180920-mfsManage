import Vue from 'vue'
import App from './App'
import router from './router'
import Api from './api/mfs-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import packages from './packages'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(Api)
Vue.use(packages)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

