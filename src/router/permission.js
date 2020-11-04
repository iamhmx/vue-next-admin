import router from './index'
import store from '../store'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '/@/utils/auth'
import getPageTitle from '/@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {
	NProgress.start()
	document.title = getPageTitle(to.meta.title)
	const hasToken = getToken()
	if (hasToken) {
		if (to.path === '/login') {
			// if is logged in, redirect to the home page
			next({ path: '/' })
			NProgress.done()
		} else {
			const hasRoles = store.getters.roles && store.getters.roles.length > 0
			if (hasRoles) {
				next()
			} else {
				try {
					const { roles } = await store.dispatch('user/getInfo')
					// 根据用户角色，动态获取有权限的路由
					const accessRoutes = await store.dispatch(
						'permission/generateRoutes',
						roles
					)
					// 动态挂载路由
					accessRoutes.forEach((route) => {
						// !在vue-router 4.x中，router.addRoutes已经废弃
						router.addRoute(route)
					})
					// if (router.getRoutes().some(item => item.path === to.path)) {
					//   console.log('已经存在该路由');
					//   next({...to})
					// } else {
					//   console.log('不存在该路由，等待');
					//   await router.isReady()
					//   console.log('路由加载完毕，跳转');
					//   next({ ...to, replace: true })
					// }
					next({ ...to })
				} catch (error) {
					await store.dispatch('user/resetToken')
					message.error(error || 'Has Error')
					next(`/login?redirect=${to.path}`)
					NProgress.done()
				}
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
