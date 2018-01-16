import * as types from './mutation-types.js'

const actions = {
	ChangeLoading({commit}) {
		commit(types.SET_LOADING)
	} 
}

export default actions