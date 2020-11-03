/*
 * @Author: mingxing.huang
 * @Date: 2020-10-31 18:14:30
 */
import Layout from '/@/layout/index.vue'
export default [
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				name: 'Dashboard',
				component: () => import('../views/dashboard/dashboard.vue'),
				meta: {
					title: '技术栈',
					icon: 'MenuOutlined',
					roles: ['admin', 'guest']
				}
			}
			// {
			// 	path: 'plot',
			// 	name: 'Plot',
			// 	component: () => import('../views/plot/plot.vue'),
			// 	meta: {
			// 		title: '图表',
			// 		icon: 'BarChartOutlined',
			// 		roles: ['admin', 'guest']
			// 	}
			// }
		]
	},
	{
		path: '/form',
		name: 'Form',
		component: Layout,
		meta: {
			title: '表单',
			icon: 'ContainerOutlined',
			roles: ['admin']
		},
		children: [
			{
				path: 'classic',
				name: 'Classic',
				component: () => import('../views/form/classic.vue'),
				meta: {
					title: '经典表单',
					icon: 'ContainerOutlined'
				}
			}
		]
	},
	{
		// https://next.router.vuejs.org/guide/migration/index.html#removed-star-or-catch-all-routes
		path: '/:path(.*)*',
		name: 'NotFound',
		hidden: true,
		component: () => import('../views/error/404.vue')
	}
]
