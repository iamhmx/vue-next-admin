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
	// start progress bar
	NProgress.start()

	// set page title
	document.title = getPageTitle(to.meta.title)

	// determine whether the user has logged in
	const hasToken = getToken()
	if (hasToken) {
		if (to.path === '/login') {
			// if is logged in, redirect to the home page
			next({ path: '/' })
			NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
		} else {
			// determine whether the user has obtained his permission roles through getInfo
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
					console.log('to：', to)
					console.log('存在的路由：', router.getRoutes())
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
					// remove token and go to login page to re-login
					console.log('error：', error)
					await store.dispatch('user/resetToken')
					message.error(error || 'Has Error')
					next(`/login?redirect=${to.path}`)
					NProgress.done()
				}
			}
		}
	} else {
		/* has no token*/

		if (whiteList.indexOf(to.path) !== -1) {
			// in the free login whitelist, go directly
			next()
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	// finish progress bar
	NProgress.done()
})
