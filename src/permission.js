import router from './router'

import store from './store'
// 验证权限
import { getToken, removeToken } from '@/utils/auth'

import { Message } from 'element-ui'


function hasPermission(roles, permissionRoles) {
	// indexOf 方法返回一个整数值，指出 String 对象内子字符串的开始位置。如果没有找到子字符串，则返回-1。
	if (roles.indexOf('administrator') >= 0) {
		return true
	}
	if (!permissionRoles) {
		return true
	}
	return roles.some(role => {
		// some 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”
		// （即可转换为布尔值 true 的值）。如果找到了这样一个值，some 将会立即返回 true。否则，some 返回 false。
		// callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
			permissionRoles.indexOf(role) >= 0
		})
}

const whiteList = ['/login', '/']		//无需认证可登陆的页面
// router.beforeEach((to, from, next) => {			//路由前进行的操作
// 	if (getToken()) {							//判断是否有token
// 		console.log('permission.js 已获取token')
// 		console.log('前往路径', to.path)
// 		if (to.path === '/login') {
// 			console.log('去往根路径')
// 			store.dispatch('FedLogOut').then(() => {
// 				next({path: '/'})
// 			})
// 		} else {
// 			console.log('permission.js 获取 store roles', store.getters)
// 			if (store.getters.roles.length === 0) {
// 				store.dispatch('GetUserInfo').then(resp => {
// 					console.log('permission.js GetUserInfo 返回值', resp)
// 					const roles = resp.data.role
// 					console.log('permission.js roles值', roles)
// 					store.dispatch('GenerateRoutes', {roles}).then(() => {
// 						console.log('permission.js GenerateRoutes 返回值')
// 						console.log('permission.js 获取添加的路由', store.getters.router)
// 						console.log('permission.js 原路由', store.getters.router)
// 						console.log('permission.js 添加路由', store.getters.addRouters)
// 						let newRouters = store.getters.addRouters
// 						if (newRouters) {
// 							router.addRoutes(store.getters.addRouters)
// 						}
// 						console.log('permission.js 新路由', router)
// 						next({ ...to })
// 					})
// 				}).catch(() => {
// 					console.log('执行失败')
// 					store.dispatch('FedLogOut').then(() => {
// 						next({path: '/'})
// 					})
// 				})
// 			} else {
// 				if (hasPermission(store.getters.roles, to.meta.role)) {
// 					next()
// 				} else {
// 					next({path: '/401', query: {noGoBack: true}})
// 				}
// 			}
// 		}
// 	} else {
// 		if (whiteList.indexOf(to.path) !== -1) {
// 			next()
// 		} else {
// 			next('/')
// 		}
// 	}
// })

router.beforeEach((to, from, next) => {			//路由前进行的操作
	console.log('去往', to.path)
	if (getToken()) {
		if (to.path === '/login') {
			console.log('去往根路径')
			store.dispatch('FedLogOut').then(() => {
				next({path: '/'})
			})
		} else {
			console.log(1232134124, to.path)
			store.dispatch('GetUserInfo').then(resp => {
				let pd = resp.data.exec
				console.log(pd)
				if ( pd === "true" ) {
					console.log('判断返回值',pd)
					const roles = resp.data.role
					console.log('返回roles值', roles)
					let temp = []
					let tempdata = store.getters.roles
					for (let i=0; i<tempdata.length;i++) {
						console.log('循环数组',tempdata[i])
						temp.push(tempdata[i])
					}
					console.log('store roles值', store.getters.roles)
					console.log('xxxxxx')
					if (roles.toString() !== temp.toString()) {
						console.log('roles值不一致')
						store.dispatch('ChangeRoleStatus', roles)
						console.log('dispatch 更新roles值')
						store.dispatch('GenerateRoutes', {roles}).then(() => {
							console.log('获取roles',roles)
							let newRouters = store.getters.addRouters
							if (newRouters) {
								router.addRoutes(newRouters)
								console.log(router)
							}
						}).catch(err => {
							console.log('执行失败')
							store.dispatch('FedLogOut').then(() => {
								next({path: '/'})
							})
						})
					}
					next()
				} else {
					Message.error({
							message: resp.data.reason
						})
					store.dispatch('FedLogOut').then(() => {
						next({path: '/'})
					})
				}
			}).catch(err => {
				store.dispatch('FedLogOut').then(() => {
					next({path: '/'})
				})
			})
		} 
	} else if (whiteList.indexOf(to.path) !== -1) {
		next()
	} else {
		next({path: '/401', query: {noGoBack: true}})
	}
})




