import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// 无需权限可访问页面
const constantRouterMap = [
  {
    path: '/login',
    component: resolve => { require(['components/login'], resolve) },
    name: 'login'
  },
  {
    path: '/dashboard',
    component: resolve => {require(['components/dashboard'], resolve)},
    name: 'dashboard'
  },
  {
    path: '/',
    redirect: 'login'
  },
]

// 实例化只挂载不需要权限的页面
export default new Router({
  routes: constantRouterMap
})

// 异步挂载路由
// 需要根据权限加载路由表
export const asyncRouterMap = [
  
  {
    path: '/updatecode',
    component: resolve => { require(['components/updatecode'], resolve) },
    name: 'updatecode',
    meta: { role: ['administrator'] },
  },
  {
    path: '/rollbackcode',
    component: resolve => { require(['components/rollbackcode'], resolve) },
    name: 'rollbackcode',
    meta: { role: ['administrator'] },
  },
  {
    path: '/cmdrun',
    component: resolve => { require(['components/cmdrun'], resolve) },
    name: 'cmdrun',
    meta: { role: ['administrator'] },
  },
  { path: '*', redirect: '/404' },
]


