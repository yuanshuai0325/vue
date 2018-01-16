import * as types from './mutation-types.js'

const mutations = {
	[types.SET_LOADING](state){
		state.loading = !state.loading
	}
}

export default mutations