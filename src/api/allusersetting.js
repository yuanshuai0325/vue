import request from '@/utils/request'

export function addNewUser(formData) {
	return request({
		method: 'post',
		url: '/adduser',
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

export function getAllUser(formData) {
	return request({
		method: 'post',
		url: '/getalluser',
		// emulateJSON: true,
	})
}

export function changeUserCode(formData) {
	return request({
		method: 'post',
		url: '/chstatus',
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

export function delUser(formData) {
	return request({
		method: 'post',
		url: '/deluser',
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

export function changeUserPassword(formData) {
	console.log(formData)
	return request({
		method: 'post',
		url: '/admincpw',
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

export function getAllMessage() {
	return request({
		method: 'post',
		url: '/getall',
	})
}