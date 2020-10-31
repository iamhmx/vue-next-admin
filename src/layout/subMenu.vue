<!--
 * @Author: mingxing.huang
 * @Date: 2020-10-31 14:04:01
-->
<template>
	<a-sub-menu :key="route.name">
		<template v-slot:title>
			<span
				><MailOutlined /><span>{{ route.meta.title }}</span></span
			>
		</template>
		<template v-for="item in route.children">
			<a-menu-item
				v-if="!item.children || item.children.length === 0"
				:key="item.name"
			>
				<MailOutlined />
				<span>{{ item.meta.title }}</span>
			</a-menu-item>
			<sub-menu v-else :key="item.name" :route="item" />
		</template>
	</a-sub-menu>
</template>

<script>
import { MailOutlined } from '@ant-design/icons-vue'
export default {
	name: 'SubMenu',
	components: {
		MailOutlined
	},
	props: {
		route: {
			type: Object,
			default: () => ({})
		}
	}
}
</script>

<style lang="less" scoped>
</style>