import { getUserInfo } from '@/api/login'

import { getToken, removeToken } from '@/utils/auth'

import * as types from '../mutation-types.js'

const user = {
	state: {
		user: '',
		status: '',
		token: getToken(),
		name: '',
		avatar: '',
		introduction: '',
		roles: [],
		troles: [],
		setting: {
			articlePlatform: []
		}
	},
	getters: {
		roles(state) {
			console.log('store user.js roles值', state.roles)
			return state.roles
		},
		troles(state) {
			console.log('store user.js troles值', state.troles)
			return state.troles
		},
	},
	mutations: {
		[types.SET_CODE](state,code){
			state.code = code
		},
		[types.SET_TOKEN](state, token){
			state.token = token
		},
		[types.SET_STATUS](state, status){
			state.status = status
		},
		[types.SET_ROLES](state, roles){
			state.roles = roles
			console.log('store user.js mutations roles', state.roles)
		},
		
	},

	actions: {
		GetUserInfo({commit, state}) {
			return new Promise((resolve, reject) => {
				getUserInfo(state.token).then(resp => {
					if (!resp.data) {
						reject('error')
					}
					const data = resp.data
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		ChangeRoleStatus({commit, state}, roles) {
			console.log('store user.js ChangeRoleStatus', roles)
			commit(types.SET_ROLES, roles)
		},
		LogOut({commit, state}) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit(types.SET_TOKEN, '')
					commit(types.SET_ROLES, []),
					removeToken()
					resolve()
				}).catch(err => {
					reject(err)
				})
			})
		},
		FedLogOut({commit}) {
			return new Promise(resolve => {
				commit(types.SET_TOKEN, '')
				commit(types.SET_ROLES, []),
				removeToken()
				resolve()
			})
		}
	}
}


export default user