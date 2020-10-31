import { login, getInfo } from '/@/api/user'
import { getToken, setToken, removeToken } from '/@/utils/auth'
import router, { resetRouter } from '/@/router'

const state = {
	token: getToken(),
	name: '',
	roles: []
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	}
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password: password })
				.then((response) => {
					const { data } = response
					// 保存token到store
					commit('SET_TOKEN', data.token)
					// 保存token到本地
					setToken(data.token)
					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},

	// get user info
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token)
				.then((response) => {
					const { data } = response
					const { roles, name } = data
					if (!roles || roles.length <= 0) {
						reject('用户角色信息不能为空')
					}
					// 保存用户信息到store
					commit('SET_ROLES', roles)
					commit('SET_NAME', name)
					resolve(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},

	// user logout
	logout({ commit, state, dispatch }) {
		return new Promise((resolve, reject) => {
			// 退出登录，删除信息
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			removeToken()
			// resetRouter()
			resolve()
		})
	},

	// remove token
	resetToken({ commit }) {
		return new Promise((resolve) => {
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			removeToken()
			resolve()
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
