<!--
 * @Author: mingxing.huang
 * @Date: 2020-11-02 15:33:03
-->
<template>
	<div class="collapse-box">
		<menu-unfold-outlined v-show="collapsed" class="trigger" @click="toggle" />
		<menu-fold-outlined v-show="!collapsed" class="trigger" @click="toggle" />
	</div>
</template>

<script>
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

export default {
	components: {
		MenuUnfoldOutlined,
		MenuFoldOutlined
	},
	emits: ['toggle'],
	setup(_, { emit }) {
		let collapsed = ref(false)
		const toggle = () => {
			collapsed.value = !collapsed.value
			emit('toggle')
		}
		return {
			collapsed,
			toggle
		}
	}
}
</script>

<style lang="less" scoped>
.trigger {
	padding: 0 15px 0 10px;
	font-size: 18px;
	cursor: pointer;
	transition: color 0.3s;
	&:hover {
		color: #1890ff;
	}
}
</style>