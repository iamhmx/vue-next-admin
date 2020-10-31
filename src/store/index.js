/*
 * @Author: mingxing.huang
 * @Date: 2020-10-29 21:26:14
 */
import { createStore } from 'vuex'
import permission from './modules/permission'
import user from './modules/user'
import app from './modules/app'
import getters from './getters'

const store = createStore({
	modules: {
		app,
		user,
		permission
	},
	getters
})

export const setupStore = (app) => {
	app.use(store)
}

export default store
