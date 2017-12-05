import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import animate from 'animate.css'

Vue.use(VueResource)

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
