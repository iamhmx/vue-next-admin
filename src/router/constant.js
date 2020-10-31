/*
 * @Author: mingxing.huang
 * @Date: 2020-10-31 18:13:38
 */
export default [
	{
		path: '/login',
		name: 'Login',
		hidden: true,
		component: () => import('../views/login/login.vue')
	},
	{
		path: '/404',
		name: '404',
		hidden: true,
		component: () => import('../views/error/404.vue')
	}
]
