/*
 * @Author: mingxing.huang
 * @Date: 2020-10-29 17:33:43
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import constant from './constant'
import async from './async'

// 静态路由表
export const constantRoutes = constant

export const asyncRoutes = async

// 创建路由实例
const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes
})

export const setupRouter = (app) => {
	app.use(router)
}

export const resetRouter = () => {
	const newRouter = createRouter({
		history: createWebHashHistory(),
		routes: constantRoutes
	})
	router.matcher = newRouter.matcher // reset router
}

export default router
