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
		setting: {
			articlePlatform: []
		}
	},


	mutations: {
		[types.SET_CODE](state,code){
			state.code = code;
		},
		[types.SET_TOKEN](state, {token}){
			state.token = token;
		},
		[types.SET_STATUS](state, {status}){
			state.status = status;
		},
		[types.SET_ROLES](state, {roles}){
			state.roles = roles;
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
					commit(types.SET_ROLES, data.role)
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
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
				removeToken()
				resolve()
			})
		}
	}
}


export default user