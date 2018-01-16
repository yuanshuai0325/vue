import { getRepoDir, getProjectHosts, cmdRun } from '@/api/cmdrun'

import * as types from '../mutation-types.js'

const cmdrun = {
	state:{
		repodir: [],
		prohosts: [],
		cmdreturn: [],
		cardshow: false,
	},
	getters: {
		repodir(state) {
			return state.repodir
		},
		prohosts(state) {
			return state.prohosts
		},
		cmdreturn(state) {
			return state.cmdreturn
		},
		cardshow(state) {
			return state.cardshow
		}
	},
	mutations: {
		[types.SET_REPO_DIR](state, repodir) {
			state.repodir = repodir
		},
		[types.SET_PROJECT_HOSTS](state, prohosts) {
			state.prohosts = prohosts
		},
		[types.SET_CMDRUN](state, cmdreturn) {
			state.cmdreturn = cmdreturn
		},
		[types.SET_CARDSHOW](state, cardshow) {
			state.cardshow = cardshow
		}
	},
	actions: {
		GetRepoDir({commit}) {
			return new Promise((resolve, reject) => {
				getRepoDir().then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_REPO_DIR, resp.data.repodir)
						resolve('repodir数据更新成功')
					} else {
						reject(resp.data.reason)
					}
				}).catch(err => {
					reject('repodir数据获取失败', err)
				})
			})
		},
		GetProjectHosts({commit}, project) {
			return new Promise((resolve, reject) => {
				getProjectHosts(project).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_PROJECT_HOSTS, resp.data.hosts)
						resolve('project hosts 数据更新成功')
					} else {
						reject(resp.data.reason)
					}
				}).catch(err => {
					reject('project hosts 数据获取失败', err)
				})
			})
		},
		CmdRun({commit}, data) {
			commit(types.SET_CARDSHOW, false)
			return new Promise((resolve, reject) => {
				cmdRun(data).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_CMDRUN, resp.data.cmdreturn)
						commit(types.SET_CARDSHOW, true)
						resolve('cmd 数据更新成功')
					} else {
						reject(resp.data.reason)
					}
				}).catch(err => {
					reject('cmd 数据获取失败', err)
				})
			})
		},
		ChangeCardShow({commit}, bool) {
			commit(types.SET_CARDSHOW, bool)
		}
	}
}

export default cmdrun