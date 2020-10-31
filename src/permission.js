import router from './router'
import store from './store'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '/@/utils/auth' // get token from cookie
import getPageTitle from '/@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

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
					// get user info
					// note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
					const { roles } = await store.dispatch('user/getInfo')
					// generate accessible routes map based on roles
					const accessRoutes = await store.dispatch(
						'permission/generateRoutes',
						roles
					)
					// dynamically add accessible routes
					accessRoutes.forEach((route) => {
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
					console.log('error：', error)
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
