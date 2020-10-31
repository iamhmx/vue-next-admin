/*
 * @Author: mingxing.huang
 * @Date: 2020-10-29 19:50:15
 */
const path = require('path')
const { createMockServer } = require('vite-plugin-mock');

module.exports = {
  alias: {
    // !键必须以斜线开始和结束
    '/@/': path.resolve(__dirname, './src')
  },
  plugins: [
    createMockServer({
      // !如果项目是js写的，务必将supportTs设置为false，否则mock不生效
      supportTs: false,
      mockPath: 'mock',
    }),
  ]
}