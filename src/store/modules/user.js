import { getUserInfo } from '@/api/login'
import { changeUserPass } from '@/api/user'

import { getToken, removeToken } from '@/utils/auth'

import * as types from '../mutation-types.js'

const user = {
	state: {
		username: '',
		userid: '',
		status: '',
		code: '',
		token: getToken(),
		avatar: '',
		introduction: '',
		roles: [],
		setting: {
			articlePlatform: []
		}
	},
	getters: {
		username(state) {
			console.log('store user.js username', state.username)
			return state.username
		},
		userid(state) {
			console.log('store user.js userid', state.userid)
			return state.userid
		},
		status(state) {
			console.log('store user.js status', state.status)
			return state.status
		},
		code(state) {
			console.log('store user.js code', state.code)
			return state.code
		},
		roles(state) {
			console.log('store user.js roles值', state.roles)
			return state.roles
		},
		
	},
	mutations: {
		[types.SET_USERNAME](state,username){
			state.username = username
		},
		[types.SET_USERID](state,userid){
			state.userid = userid
		},
		[types.SET_STATUS](state, status){
			state.status = status
		},
		[types.SET_CODE](state,code){
			state.code = code
		},
		[types.SET_TOKEN](state, token){
			state.token = token
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
					commit(types.SET_USERNAME, data.username)
					commit(types.SET_USERID, data.userid)
					commit(types.SET_STATUS, data.status)
					commit(types.SET_CODE, data.code)
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
		// LogOut({commit, state}) {
		// 	return new Promise((resolve, reject) => {
		// 		logout(state.token).then(() => {
		// 			commit(types.SET_TOKEN, '')
		// 			commit(types.SET_ROLES, []),
		// 			removeToken()
		// 			resolve()
		// 		}).catch(err => {
		// 			reject(err)
		// 		})
		// 	})
		// },
		FedLogOut({commit}) {
			return new Promise(resolve => {
				commit(types.SET_TOKEN, '')
				commit(types.SET_ROLES, []),
				commit(types.SET_USERNAME, '')
				commit(types.SET_USERID, '')
				commit(types.SET_STATUS, '')
				commit(types.SET_CODE, '')
				removeToken()
				resolve()
			})
		},
		ChangeUserPass({commit, state}, formData) {
			formData.userid = state.userid
			console.log('store user.js ChangeUserPass 添加userid', formData)
			return new Promise((resolve, reject) => {
				changeUserPass(formData).then(resp => {
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}


export default user