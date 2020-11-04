<!--
 * @Author: mingxing.huang
 * @Date: 2020-10-29 20:56:05
-->
<template>
	<div class="dashboard-box">
		<a-list :grid="{ gutter: 16, column: 1 }" :data-source="data">
			<template v-slot:renderItem="{ item }">
				<a-list-item class="list-item">
					<a-card :title="item.title">
						<a-skeleton v-if="showSkeleton" active />
						<template v-else>
							{{ item.des }} <a target="_blank" :href="item.url">文档</a>
						</template>
					</a-card>
				</a-list-item>
			</template>
		</a-list>
	</div>
</template>

<script>
import { ref } from 'vue'
export default {
	setup() {
		const showSkeleton = ref(true)
		setTimeout(() => {
			showSkeleton.value = false
		}, 800)
		const data = ref([
			{
				title: 'vue3',
				url: 'https://www.vue3js.cn/docs/zh/',
				des:
					'更快：虚拟DOM重写、优化slots的生成、静态树提升、静态属性提升、基于Proxy的响应式系统；更小：通过摇树优化核心库体积；更容易维护：TypeScript + 模块化；独立的响应化模块；Composition API'
			},
			{
				title: 'vite',
				url: 'https://github.com/vitejs/vite',
				des:
					'应用秒开。Vite 是一个由原生 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发，在生产环境下基于 Rollup 打包。它主要具有以下特点：快速的冷启动、即时的模块热更新、真正的按需编译'
			},
			{
				title: 'ant design vue 2.x',
				url: 'https://2x.antdv.com/docs/vue/introduce-cn/',
				des: '支持vue3的ant desing UI库（tips：element-ui官方不再支持vue3）'
			},
			{
				title: 'vuex 4.x',
				url: 'https://github.com/vuejs/vuex',
				des: '支持vue3的全局状态管理'
			},
			{
				title: 'vue-router 4.x',
				url: 'https://github.com/vuejs/vue-router',
				des: '支持vue3的路由管理工具'
			}
		])
		return { data, showSkeleton }
	}
}
</script>

<style lang="less">
.dashboard-box {
	.ant-card-bordered {
		&:hover {
			box-shadow: rgba(@primary-color, 0.8) 0px 0px 2px 2px;
			// border-color: @primary-color;
		}
	}
}
</style>