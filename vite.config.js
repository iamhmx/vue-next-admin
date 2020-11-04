/*
 * @Author: mingxing.huang
 * @Date: 2020-10-29 19:50:15
 */
const path = require('path')
const { modifyVars } = require('./src/styles/lessModifyVars')
const { createMockServer } = require('vite-plugin-mock')

const isDev = () => process.env.NODE_ENV === 'development'

module.exports = {
	// 端口号
	port: '3000',

	// 地址
	hostname: 'localhost',

	// 基本公共路径
	base: '/',

	// 打包路径
	outDir: 'dist',

	// 资源输出路径
	assetsDir: '_assets',

	// 静态资源小于该大小将会内联，默认4096kb
	assetsInlineLimit: 4096,

	// sourcemap
	sourcemap: isDev() ? true : false,

	// 自动打开浏览器
	open: true,

	// 代码压缩
	minify: isDev() ? 'esbuild' : 'terser',

	// esbuild转换目标
	esbuildTarget: 'es2020',

	// terser配置
	terserOptions: {
		compress: {
			// 是否删除console
			drop_console: isDev() ? false : true
		}
	},

	// 资源别名
	alias: {
		// !键必须以斜线开始和结束
		'/@/': path.resolve(__dirname, './src')
	},

	// css预处理，全局样式变量
	cssPreprocessOptions: {
		less: {
			modifyVars: modifyVars,
			javascriptEnabled: true
		}
	},

	// 服务代理
	proxy: {
		// '/api': {
		//   target: 'http://targetapi.com',
		//   changeOrigin: true,
		//   rewrite: path => path.replace(/^\/api/, '')
		// }
	},

	plugins: [
		createMockServer({
			// !如果项目是js写的，务必将supportTs设置为false，否则mock不生效
			supportTs: false,
			mockPath: 'mock'
		})
	]
}
