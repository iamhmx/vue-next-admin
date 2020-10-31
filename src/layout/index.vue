<!--
 * @Author: mingxing.huang
 * @Date: 2020-10-29 20:48:44
-->
<template>
	<a-layout class="layout-container">
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
			<logo :collapsed="collapsed"></logo>
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
						<UserOutlined />
						<span>{{ item.meta.title }}</span>
					</a-menu-item>
					<!-- 不显示父级菜单的一组子菜单 -->
					<template v-else-if="!item.name && item.children.length > 0">
						<a-menu-item v-for="e in item.children" :key="e.name">
							<UserOutlined />
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
					<div class="collapse-box">
						<menu-unfold-outlined
							v-if="collapsed"
							class="trigger icon"
							@click="() => (collapsed = !collapsed)"
						/>
						<menu-fold-outlined
							v-else
							class="trigger icon"
							@click="() => (collapsed = !collapsed)"
						/>
					</div>
					<a-breadcrumb style="height: 20px">
						<a-breadcrumb-item
							v-for="item in $route.matched.filter(
								(item) => Object.keys(item.meta).length > 0
							)"
							:key="item.path"
						>
							{{ item.meta.title ? item.meta.title : '' }}
						</a-breadcrumb-item>
					</a-breadcrumb>
				</div>
				<div class="header-right">
					<a-dropdown>
						<UserOutlined class="icon" />
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
					margin: '10px',
					padding: '10px',
					background: '#fff',
					minHeight: '280px'
				}"
			>
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script>
import {
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	AppstoreOutlined
} from '@ant-design/icons-vue'
import Logo from './logo.vue'
import SubMenu from './subMenu.vue'

export default {
	components: {
		AppstoreOutlined,
		UserOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		Logo,
		SubMenu
	},
	created() {
		this.selectedKeys = [this.$route.name]
		this.openKeys = [this.$route.matched[0].name || '']
	},
	watch: {
		selectedKeys: {
			deep: true,
			handler(val) {
				this.$router.push({ name: val[0] })
			}
		}
	},
	mounted() {},
	data() {
		return {
			openKeys: [],
			selectedKeys: [],
			collapsed: false
		}
	},
	computed: {
		routes() {
			return (
				this.$store.getters.permission_routes.filter((item) => !item.hidden) ||
				[]
			)
		}
	},
	methods: {
		logout() {
			console.log('退出登录')
			this.$store.dispatch('user/logout').then(() => {
				this.$router.push({ name: 'Login' })
			})
		}
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
			.trigger {
				padding: 0 24px;
			}
		}
		.header-left {
			display: flex;
			flex-direction: row;
			// justify-content: space-between;
			align-items: center;
		}
		.icon {
			font-size: 18px;
			cursor: pointer;
			transition: color 0.3s;
			&:hover {
				color: #1890ff;
			}
		}
	}
}
</style>
