import { backUpFile, listFile } from '@/api/codeupdate'

import * as types from '../mutation-types.js'

const codeupdate = {
	state:{
		filelist: [],
		btndisabled: false,
	},
	getters: {
		filelist(state) {
			return state.filelist
		},
		btndisabled(state) {
			return state.btndisabled
		}
	},
	mutations: {
		[types.SET_FILE_LIST](state, filelist) {
			state.filelist = filelist
		},
		[types.SET_BTN_DISABLED](state) {
			state.btndisabled = !state.btndisabled
		},
	},
	actions: {
		ListFile({commit}) {
			return new Promise((resolve, reject) => {
				listFile().then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_FILE_LIST, resp.data.filelist)
						resolve('filelist 更新成功')
					} else {
						reject(resp.data.reason)
					}
				}).catch(err => {
					reject('filelist 获取失败', err)
				})
			})
		},
		BackUpFile({commit}, filename) {
			return new Promise((resolve, reject) => {
				backUpFile(filename).then(resp => {
					resolve(resp)
				}).catch(err => {
					reject(resp)
				})
			})
		},
		ChangeDisabled({commit}) {
			commit(types.SET_BTN_DISABLED)
		},
	}
}

export default codeupdate