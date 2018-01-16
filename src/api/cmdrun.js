import request from '@/utils/request'

export function getRepoDir() {
	return request({
		method: 'get',
		url: '/repodir',
	})
}