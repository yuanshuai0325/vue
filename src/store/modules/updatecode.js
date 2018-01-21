import { backUpFile, listFile, delFile } from '@/api/codeupdate'

import * as types from '../mutation-types.js'

const codeupdate = {
	state:{
		filelist: [],
		tablefile: [],
		//控制按钮计数
		count: 0,
		btndisabled: false,
		//控制tablefile计数
		tablecount: 0,
		tabletmp: [],
	},
	getters: {
		filelist(state) {
			return state.filelist
		},
		tablefile(state) {
			return state.tablefile
		},
		btndisabled(state) {
			return state.btndisabled
		},
	},
	mutations: {
		[types.SET_FILE_LIST](state, filelist) {
			state.filelist = filelist
		},
		[types.SET_DEL_FILE](state, delfile) {
			console.log('正在删除',delfile)
			for (let index in state.filelist) {
				if (state.filelist[index].name === delfile) {
					state.filelist.splice(index, 1)
				}
			}
		},
		[types.SET_TABLE_FILE](state, tablefile) {
			state.tablefile = tablefile
		},
		[types.SET_TABLE_TMP](state, num) {
			state.tablecount = state.tablecount + num
			if (state.tablecount === 0) {
				this.dispatch('UploadFile')
			}
		},
		[types.SET_BTN_DISABLED](state, num) {
			state.count = state.count + num
			if (state.count === 0) {
				state.btndisabled = false
			} else {
				state.btndisabled = true
			}
		},
	},
	actions: {
		ListFile({commit}) {
			return new Promise((resolve, reject) => {
				listFile().then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_TABLE_FILE, resp.data.filelist)
						resolve('tablefile 更新成功')
					} else {
						reject(resp.data.reason)
					}
				}).catch(err => {
					reject('tablefile 获取失败', err)
				})
			})
		},
		UploadFile({commit}) {
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
		TableTmp({commit}, num) {
			commit(types.SET_TABLE_TMP, num)
		},
		DelUploadFile({commit}, delfile) {
			console.log('删除', delfile)
			commit(types.SET_DEL_FILE, delfile)
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
		DelFile({commit}, data) {
			return new Promise((resolve, reject) => {
				delFile(data).then(resp => {
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		ChangeDisabled({commit}, num) {
			commit(types.SET_BTN_DISABLED, num)
		},
	}
}

export default codeupdate