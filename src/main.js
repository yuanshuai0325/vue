import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 全部引入 element-ui，全局使用
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vue-resource，之后去除
import VueResource from 'vue-resource'
// 引入动画效果
import animate from 'animate.css'
// 引入vuex状态管理
import store from './store/index.js'

Vue.use(VueResource)

Vue.use(ElementUI)

// 全局前置守卫   https://router.vuejs.org/zh-cn/advanced/navigation-guards.html 
// to: Route:即将进入目标 路由对象
// from： Route：当前导航要离开的路由
// next： Function
// router.beforeEach((to, from, next)) => {
// 	console.log(to)
// 	if (store.getters.token) {
// 		if (to.path === '/') {
// 			next({path:'dashboard'});
// 		} else {
// 			if (store.getters.roles.length === 0) {
// 				store.dispatch('GenerateRoutes', {roles}).then(() => {
// 					router.addRoutes(store.getters.addRouters);
// 					next(to);
// 				}).catch(err => {console.log(err)})
// 			} else {
// 				next()
// 			}
// 		}
// 	} else {
// 		next('login')
// 	}
// }
new Vue({
	router,
	store,
	el: '#app',
	render: h => h(App),
})
