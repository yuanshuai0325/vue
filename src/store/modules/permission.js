import { constantRouterMap, asyncRouterMap } from '@/router'
import * as types from '../mutation-types.js'

function hasPermission(roles, route) {
	if (route.meta &&　route.meta.role) {
		return roles.some(role => route.meta.role.indexOf(role) >= 0)
	} else {
		return true
	}
}

function fileterAsyncRouter(asyncRouterMap, roles) {
	const accessedRouters = asyncRouterMap.filter(route => {
		if (hasPermission(roles, route)) {
			if (route.children && route.children.length) {
				route.children = fileterAsyncRouter(route.children, roles)
			}
			return true
		}
		return false
	})
	return accessedRouters
}

const permission = {
	state: {
		router: constantRouterMap,
		addRouters: []
	},
	getters: {
		router(state) {
			return state.router
		},
		addRouters(state) {
			return state.addRouters
		}
	},
	mutations: {
		[types.SET_ROUTERS](state, routers) {
			state.addRouters = routers
			console.log('store mutations 添加异步路由', state.addRouters)
			state.routers = constantRouterMap.concat(routers)
			console.log('store mutations 添加异步路由后完整路由', state.routers)
		}
	},
	actions: {
		GenerateRoutes({ commit }, data) {
			console.log('store GenerateRoutes', data)
			return new Promise(resolve => {
				const { roles }  = data
				let accessedRouters
				if (roles.indexOf('administrator') >= 0) {
					console.log('store GenerateRoutes asyncRouterMap', asyncRouterMap)
					accessedRouters = asyncRouterMap
				} else {
					accessedRouters = fileterAsyncRouter(asyncRouterMap, roles)
				}
				commit(types.SET_ROUTERS, accessedRouters)
				resolve()
			})
		}
	}
}

export default permission