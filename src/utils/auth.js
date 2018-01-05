import Cookies from 'js-cookie'

// 获取cookie中token字段
export function getToken() {
	console.log('auth.js 获取cookie', Cookies.get('XToken'))
	return Cookies.get('XToken')
}

export function removeToken() {
	console.log('auth.js 销毁cookie')
	return Cookies.remove('XToken')
}