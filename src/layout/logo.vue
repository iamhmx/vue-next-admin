<!--
 * @Author: mingxing.huang
 * @Date: 2020-10-31 18:15:52
-->
<template>
	<div class="logo">
		<img src="../assets/logo.png" />
		<span v-show="!collapsed">{{ name }}</span>
	</div>
</template>

<script>
import { useStore } from 'vuex'
export default {
	props: {
		collapsed: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const store = useStore()
		return {
			logo: '../assets/' + store.state.app.logo,
			name: store.state.app.name
		}
	}
}
</script>
<style lang="less" scoped>
.logo {
	height: 60px;
	// background: rgba(255, 255, 255, 0.2);
	margin-top: 5px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 14px;
	font-weight: bold;
	img {
		width: 60px;
		height: 60px;
	}
}
</style>
