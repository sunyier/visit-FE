import App from './App'
import Vue from 'vue'
import 'lib-flexible/flexible.js'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from './router'
Vue.use(infiniteScroll)
// 前端解决跨域问题
axios.defaults.withCredentials = true
Vue.prototype.$ajax = axios
Vue.use(VueAwesomeSwiper)
// vue.config.productionTip = false;
// router.push('apppage')
let vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
Vue.use({
  vm
})
