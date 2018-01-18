import request from '@/utils/request'

export function listFile(filename) {
	return request({
		method: 'get',
		url: '/listfile',
	})
}

export function backUpFile(filename) {
	return request({
		method: 'post',
		url: '/backupfile',
		data: filename,
		// emulateJSON: true,
		transformRequest:[
			function(data) {
				let params = ''
				for(let index in data) {
				  params += filename+'='+data[index].filename+'&'
				}
				return params
				}
			]
	})
}