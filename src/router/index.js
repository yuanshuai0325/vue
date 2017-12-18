import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes = [
  { path: '/login', component: resolve => { require(['components/login'], resolve) }, name: 'login' },
  {
    path: '/main',
    component: resolve => { require(['components/main'], resolve) },
    name: 'main',
    // children: [
    //   { path: 'rollback', component: resolve => { require(['components/code/rollback'], resolve) }, name: 'rollbackcode' }
    // ]
  },
  
  { path: '/', redirect: 'login' },
  { path: '*', redirect: 'login' }
]

export default new Router({
  routes
})
