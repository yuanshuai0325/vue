import request from '@/utils/request'

export function listFile(filename) {
	return request({
		method: 'get',
		url: '/listfile',
	})
}

export function backUpFile(filename) {
	console.log('dfsasdfs',filename)
	return request({
		method: 'post',
		url: '/backupfile',
		data: filename,
		// emulateJSON: true,
		transformRequest:[
			function(data) {
				let params = ''
				for(let index in data) {
					params += 'filename=' + data[index].name + '&'
				}
				return params
				}
			]
	})
}

export function delFile(filename) {
	return request({
		method: 'post',
		url: '/delfile',
		data: filename,
		// emulateJSON: true,
		transformRequest:[
			function(data) {
				let params = 'file='+data.name
				return params
				}
			]
	})
}

export function updateFile(data) {
			console.log(data)

	return request({
		method: 'post',
		url: 'updatefile',
		data: data,
		transformRequest:[
			function(data) {
				let params = ''
				for(let index in data) {
					console.log(index,data[index])
					params += 'filename=' + data[index].name + '&'
				}
				return params
			}
		]
	})
}