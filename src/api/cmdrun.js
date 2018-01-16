import request from '@/utils/request'

export function getRepoDir() {
	return request({
		method: 'get',
		url: '/repodir',
	})
}

export function getProjectHosts(project) {
	return request({
		method: 'get',
		url: '/prohosts',
		params: {
			'project': project
		}
	})
}

export function cmdRun(data) {
	return request({
		method: 'post',
		url: '/cmdrun',
		data: data,
		// emulateJSON: true,
		transformRequest:[
			function(data) {
				let params = ''
				for(let index in data) {
				  params += index+'='+data[index]+'&'
				}
				return params
				}
			]
	})
}