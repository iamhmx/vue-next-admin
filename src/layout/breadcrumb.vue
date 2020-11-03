<!--
 * @Author: mingxing.huang
 * @Date: 2020-11-02 15:25:18
-->
<template>
	<a-breadcrumb style="height: 20px">
		<a-breadcrumb-item
			v-for="item in route.matched.filter(
				(item) => Object.keys(item.meta).length > 0
			)"
			:key="item.path"
		>
			{{ item.meta.title ? item.meta.title : '' }}
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
	setup() {
		const route = useRoute()
		return { route }
	}
}
</script>