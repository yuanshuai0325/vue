import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 全局使用
import state from './state.js'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

// 模块使用
import login from './modules/login.js'
import user from './modules/user.js'
import allusersetting from './modules/allusersetting.js'
import permission from './modules/permission.js'
// import updatecode from './modules/updatecode.js'
// import rollbackcode from './modules/rollbackcode.js'
import cmdrun from './modules/cmdrun.js'

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules: {
		login,
		user,
		allusersetting,
		permission,
		// updatecode,
		// rollbackcode,
		cmdrun,
	}
})