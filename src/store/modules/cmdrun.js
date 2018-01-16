import { getRepoDir } from '@/api/cmdrun'

import * as types from '../mutation-types.js'

const cmdrun = {
	state:{
		repodir: [],
	},
	getters: {
		repodir(state) {
			return state.repodir
		}
	},
	mutations: {
		[types.SET_REPO_DIR](state, repodir) {
			state.repodir = repodir
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
		}
	}
}

export default cmdrun