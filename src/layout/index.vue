<!--
 * @Author: mingxing.huang
 * @Date: 2020-10-29 20:48:44
-->
<template>
	<a-layout class="layout-container">
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
			<Logo :collapsed="collapsed" />
			<a-menu
				mode="inline"
				theme="dark"
				v-model:openKeys="openKeys"
				v-model:selectedKeys="selectedKeys"
			>
				<template v-for="item in routes">
					<!-- 单个菜单 -->
					<a-menu-item
						v-if="!item.children || item.children.length === 0"
						:key="item.name"
					>
						<component :is="item.meta.icon" />
						<span>{{ item.meta.title }}</span>
					</a-menu-item>
					<!-- 不显示父级菜单的一组子菜单 -->
					<template v-else-if="!item.name && item.children.length > 0">
						<a-menu-item v-for="e in item.children" :key="e.name">
							<component :is="e.meta.icon" />
							<span>{{ e.meta.title }}</span>
						</a-menu-item>
					</template>
					<SubMenu v-else :key="item.name" :route="item" />
				</template>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header class="header-box">
				<div class="header-left">
					<Collapse @toggle="collapsed = !collapsed"></Collapse>
					<Breadcrumb />
				</div>
				<div class="header-right">
					<a-dropdown>
						<span class="name-box"
							>{{ name }}<UserOutlined class="icon" style="margin-left: 5px"
						/></span>
						<template v-slot:overlay>
							<a-menu>
								<a-menu-item @click="logout"> 退出登录 </a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</div>
			</a-layout-header>
			<a-layout-content
				:style="{
					marginTop: '1px',
					padding: '10px',
					background: '#fff',
					minHeight: '280px',
					overflow: 'auto'
				}"
			>
				<router-view class="app-content"></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script>
import {
	AppstoreOutlined,
	MenuOutlined,
	UserOutlined,
	BarChartOutlined
} from '@ant-design/icons-vue'
import Logo from './logo.vue'
import SubMenu from './subMenu.vue'
import Breadcrumb from './breadcrumb.vue'
import Collapse from './collapse.vue'
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
	components: {
		AppstoreOutlined,
		MenuOutlined,
		UserOutlined,
		BarChartOutlined,
		Logo,
		SubMenu,
		Breadcrumb,
		Collapse
	},
	setup() {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()
		const name = ref(store.getters.name)
		const openKeys = ref([route.matched[0].name || ''])
		const selectedKeys = ref([route.name])
		const collapsed = ref(false)
		// 选中跳转
		watch(selectedKeys, (val) => {
			router.push({ name: val[0] })
		})
		// 获取权限路由
		const routes = computed(
			() => store.getters.permission_routes.filter((item) => !item.hidden) || []
		)

		const logout = () => {
			store.dispatch('user/logout').then(() => {
				router.push({ name: 'Login' })
			})
		}

		return { name, openKeys, selectedKeys, collapsed, routes, logout }
	}
}
</script>
<style lang="less" scoped>
.layout-container {
	height: 100%;
	.header-box {
		background: #fff;
		padding: 0 20px 0 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.collapse-box {
			height: 64px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.header-left {
			display: flex;
			flex-direction: row;
			// justify-content: space-between;
			align-items: center;
		}
		.header-right {
			.name-box {
				cursor: pointer;
				&:hover {
					color: #1890ff;
				}
				.icon {
					font-size: 18px;
					transition: color 0.3s;
				}
			}
		}
	}
}
</style>
