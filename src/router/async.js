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
					title: '仪表盘',
					icon: 'AppstoreOutlined',
					roles: ['admin', 'guest']
				}
			},
			{
				path: 'icons',
				name: 'Icons',
				component: () => import('../views/icons/icons.vue'),
				meta: {
					title: '图标',
					icon: 'AppstoreOutlined',
					roles: ['admin', 'guest']
				}
			}
		]
	},
	{
		path: '/form',
		name: 'Form',
		component: Layout,
		meta: {
			title: '表单',
			icon: '',
			roles: ['admin']
		},
		children: [
			{
				path: 'classic',
				name: 'Classic',
				component: () => import('../views/form/classic.vue'),
				meta: {
					title: '经典表单',
					icon: ''
				}
			}
		]
	}
]
