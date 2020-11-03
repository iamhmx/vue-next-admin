/*
 * @Author: mingxing.huang
 * @Date: 2020-11-03 17:00:10
 */
export function debounce(duration, cb) {
	let timer = null
	return function () {
		let context = this
		clearTimeout(timer)
		timer = setTimeout(() => {
			console.log('真正执行')
			cb.apply(context, arguments)
		}, duration)
	}
}
