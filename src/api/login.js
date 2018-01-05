import request from '@/utils/request'

export function loginByUsername(formData) {
	return request({
		method: 'post',
		url: '/veruser',
		data: formData,
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

export function getUserInfo(token) {
	return request({
		url: '/userinfo',
		method: 'get',
		params: { token } 
	})
}