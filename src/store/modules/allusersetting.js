import {addNewUser, getAllUser, changeUserCode, delUser, changeUserPassword, getAllMessage, addNewHost, delHost, addProject, delProject, addRepo} from '@/api/allusersetting'

import * as types from '../mutation-types.js'

const allusersetting = {
	state: {
		getalluser: [],
		getallmessage: {},
		repo: '',
		projects: [],
		hosts: [],
	},
	getters: {
		getalluser(state) {
			return state.getalluser
		},
		getallmessage(state) {
			return state.getallmessage
		},
		repo(state) {
			return state.repo
		},
		projects(state) {
			return state.projects
		},
		hosts(state) {
			return state.hosts
		}
	},
	mutations: {
		[types.SET_GETALLUSER](state, getalluser){
			console.log('allusersetting 更新mutation')
			state.getalluser = getalluser
			console.log(state.getalluser)
		},
		[types.SET_ALL_MESSAGE](state, allmessage){
			state.getallmessage = allmessage
		},
		[types.SET_REPO](state, repo){
			state.repo = repo
			console.log('repo 已获得，', state.repo)
		},
		[types.SET_PROJECTS](state, projects){
			state.projects = projects
			console.log('projects 已获得，', state.projects)
		},
		[types.SET_HOSTS](state, hosts){
			state.hosts = hosts
			console.log('hosts 已获得，', state.hosts)
		},
	},
	actions: {
		GetAllUser({commit, state}) {
			return new Promise((resolve, reject) => {
				getAllUser().then(resp => {
					let pd = resp.data.exec
					console.log('服务器返回值',resp.data)
					if (pd === 'true') {
						commit(types.SET_GETALLUSER, resp.data.data)
						resolve('数据更新成功')
					} else {
						reject('数据更新失败')
					}
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
		},
		ChangeUserPassword({commit},password) {
			return new Promise((resolve, reject) => {
				changeUserPassword(password).then(resp => {
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		GetAllMessage({commit}){
			return new Promise((resolve, reject) => {
				getAllMessage().then(resp => {
					let pd = resp.data.exec
					if ( pd === 'true' ) {
						commit(types.SET_ALL_MESSAGE, resp.data.repo)
						resolve('allmessage 更新成功')
					} else {
						reject(resp.data.reason)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		SetRepo({commit},repo){
			commit(types.SET_REPO, repo)
		},
		SetProjects({commit},projects){
			commit(types.SET_PROJECTS, projects)
		},
		SetHosts({commit},hosts){
			commit(types.SET_HOSTS, hosts)
		},
		AddNewHost({commit,state}, host) {
			return new Promise((resolve, reject) => {
				addNewHost(host,state.repo).then(resp => {
					let pd = resp.data.exec
					if (pd === "true") {
						this.dispatch("GetAllMessage").then(resp => {
							console.log(resp)
							this.dispatch("SetHosts", state.getallmessage[state.repo].hosts)
						}).catch(err => {console.log(err)})
					}
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		DelHost({commit,state}, host) {
			return new Promise((resolve, reject) => {
				delHost(host,state.repo).then(resp => {
					let pd = resp.data.exec
					if (pd === "true") {
						this.dispatch("GetAllMessage").then(resp => {
							console.log(resp)
							this.dispatch("SetHosts", state.getallmessage[state.repo].hosts)
						}).catch(err => {console.log(err)})
					}
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		AddProject({commit,state}, project) {
			return new Promise((resolve, reject) => {
				addProject(project,state.repo).then(resp => {
					let pd = resp.data.exec
					if (pd === "true") {
						this.dispatch("GetAllMessage").then(resp => {
							console.log(resp)
							this.dispatch("SetProjects", state.getallmessage[state.repo].projects)
						}).catch(err => {console.log(err)})
					}
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		DelProject({commit,state}, project) {
			return new Promise((resolve,reject) => {
				delProject(project,state.repo).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						this.dispatch("GetAllMessage").then(resp => {
							console.log(resp)
							this.dispatch("SetProjects", state.getallmessage[state.repo].projects)
						}).catch(err => {console.log(err)})
					}
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		},
		AddRepo({commit}, repo,lpath,rpath) {
			return new Promise((resolve,reject) => {
				addRepo(repo,lpath,rpath).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						this.dispatch("GetAllMessage").then(resp => {console.log(resp)}).catch(err => {console.log(err)})
					}
					resolve(resp)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}

export default allusersetting