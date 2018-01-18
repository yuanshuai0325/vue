import axios from 'axios'
// // element-ui Message 消息提示 http://element.eleme.io/#/zh-CN/component/message
// import { Message } from 'element-ui'
// import store from '@/store'

// const service = axios.create({
// 	baseURL: '/api/backstage',
// 	timeout: 20000
// })

// // request拦截器 https://www.npmjs.com/package/axios
// service.interceptors.request.use(config => {
// 	// if (store.getters.XToken) {
// 	// config.headers.XToken = this.$cookie.get('XToken')
// 	config.headers.XToken = 'sdfsdfsf'
// 	console.log('pppppp')
// 	// }
// 	return config
// }, error => {
// 	console.log(error)
// 	Promise.reject(error)
// })

// // response拦截器
// service.interceptors.response.use(response => 
// 	response,
// error => {
// 	console.log('err'+error)
// 	Message({
// 		message: error.message,
// 		type: 'error',
// 		duration: 5*1000
// 	})
// 	return Promise.reject(error)
// })

// export default service

// Promise，就是一个对象，用来传递异步操作的消息。
// 它代表了某个未来才会知道结果的事件（通常是一个异步操作），
// 并且这个事件提供统一的 API，可供进一步处理。
// 如果异步操作失败，则用 reject 方法将 Promise 对象的状态，
// 从「未完成」变为「失败」（即从 pending 变为 rejected）



var instance = axios.create({
  baseURL: '/api/backstage',
  timeout: 20000,
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export default instance