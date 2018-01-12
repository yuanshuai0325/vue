import { loginByUsername } from '@/api/login'

// state 暂时理解为数据源
const user = {
	state: {
		name: '',
		token: '',
		roles: '',
		password: '',
	},

	mutations: {

	},

	actions: {
		LoginByUsername({commit, state}, formData) {
			return new Promise((resolve, reject) => {
				console.log(2222)
				loginByUsername(formData).then(resp => {
					console.log(resp.data)
					resolve(resp)
				}).catch(err => {
					console.log(err)
					reject(err)
				})
			})
		}
	}
}


export default user 