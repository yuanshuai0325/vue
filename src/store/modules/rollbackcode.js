import { getProjectDir, delDir, rollBackCode } from '@/api/codeback'

import * as types from '../mutation-types.js'

const rollbackcode = {
	state: {
		projectdir: [],
		path: '',
		project: '',
	},
	getters: {
		projectdir(state) {
			return state.projectdir
		},
		path(state) {
			return state.path
		},
		project(state) {
			return state.project
		}
	},
	mutations: {
		[types.SET_PROJECT_DIR](state, projectdir) {
			state.projectdir = projectdir
		},
		[types.SET_PATH](state, path) {
			state.path = path
		},
		[types.SET_PROJECT](state, project) {
			state.project = project
		},
	},
	actions: {
		GetProjectDir({commit}, dirname) {
			return new Promise((resolve, reject) => {
				getProjectDir(dirname).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_PROJECT_DIR, resp.data.prodir)
						commit(types.SET_PATH, resp.data.path)
						commit(types.SET_PROJECT, resp.data.project)
						resolve('project dir 数据更新成功')
					} else {
						resolve(resp.data.reason)
					}
				}).catch(err => {reject('project dir获取失败',err)})
			})
		},
		ClearProjectDir({commit}) {
			commit(types.SET_PROJECT_DIR, [])
			commit(types.SET_PATH, '')
			commit(types.SET_PROJECT, '')
		},
		DelDir({commit, state}, deldir) {
			return new Promise((resolve, reject) => {
				delDir(deldir).then(resp => {
					let pd = resp.data.exec
					let tmp = state.projectdir
					console.log(pd)
					if (pd === 'true') {
						this.dispatch('GetProjectDir', deldir.value)
					}
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		RollBackCode({commit}, path) {
			return new Promise((resolve, reject) => {
				rollBackCode(path).then(resp => {
					console.log(resp)
					resolve(resp)
				}).catch(err => {
					console.log(err)
					reject(err)
				})
			})
		}
	}
}

export default rollbackcode