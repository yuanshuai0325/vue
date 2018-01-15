import {addNewUser, getAllUser, changeUserCode, delUser} from '@/api/allusersetting'

import * as types from '../mutation-types.js'

const allusersetting = {
	state: {
		getalluser: [],
	},
	getters: {
		getalluser(state) {
			return state.getalluser
		}
	},
	mutations: {
		[types.SET_GETALLUSER](state, getalluser){
			console.log('allusersetting 更新mutation')
			state.getalluser = getalluser
			console.log(state.getalluser)
		}
	},
	actions: {
		GetAllUser({commit, state}) {
			return new Promise((resolve, reject) => {
				getAllUser().then(resp => {
					let pd = resp.data.exec
					console.log('服务器返回值',resp.data)
					if (pd === 'true') {
						commit(types.SET_GETALLUSER, resp.data.data)
					}
					resolve('数据更新成功')
				}).catch(err => {
					reject('数据获取失败')
				})
			})
		},
		AddNewUser({commit}, user) {
			return new Promise((resolve, reject) => {
				addNewUser(user).then(resp => {
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		ChangeUserCode({commit}, user) {
			return new Promise((resolve,reject) => {
				changeUserCode(user).then(resp => {
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		DelUser({commit}, user) {
			return new Promise((resolve,reject) => {
				delUser(user).then(resp => {
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}

export default allusersetting