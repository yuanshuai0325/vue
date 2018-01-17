import request from '@/utils/request'

export function getProjectDir(dirname) {
	return request({
		method: 'get',
		url: '/prodir',
		params: {
			'dirname': dirname
		}
	})
}

export function delDir(deldir) {
	return request({
		method: 'post',
		url: '/deldir',
		data: deldir,
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