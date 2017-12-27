import request from '@/utils/request'

export function loginByUsername(formData) {
	return request({
		method: 'post',
		url: '/veruser',
		data: formData,
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