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
					<a-popover class="item" title="未读消息" trigger="hover">
						<template v-slot:content>
							<div style="max-width: 200px">
								<a-menu @click="clickMsg">
									<a-menu-item v-for="m in msg" :key="m.id">
										{{ m.msg }}
									</a-menu-item>
								</a-menu>
							</div>
						</template>
						<a-badge :count="msg.length" :overflow-count="99">
							<BellOutlined class="icon" style="vertical-align: 2px" />
						</a-badge>
					</a-popover>
					<!-- <div class="item">
						<a-badge :count="50" :overflow-count="99">
							<BellOutlined class="icon" />
						</a-badge>
					</div> -->
					<div class="item">
						<GithubOutlined class="icon" @click="openGithub" />
					</div>
					<a-dropdown class="item">
						<span
							>{{ name }}<UserOutlined class="icon" style="margin-left: 2px"
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
	<a-modal title="消息" v-model:visible="visible" @ok="visible = false">
		<p>{{ msgText }}</p>
	</a-modal>
</template>
<script>
import {
	AppstoreOutlined,
	GithubOutlined,
	MenuOutlined,
	UserOutlined,
	BarChartOutlined,
	BellOutlined
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
		GithubOutlined,
		BellOutlined,
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
		const visible = ref(false)
		const msgText = ref('')
		const msg = ref([
			{
				id: 1,
				msg: '特朗普凌晨在白宫发表讲话：坦白说，我们已经赢了大选'
			},
			{
				id: 2,
				msg: '特朗普在大部分摇摆州领先 拜登讲话呼吁保持耐心'
			}
		])
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

		const openGithub = () => {
			window.open('https://github.com/iamhmx/vue-next-admin')
		}

		const clickMsg = ({ key }) => {
			console.log(
				'msg item：',
				msg.value.filter((item) => item.id === key)[0].msg
			)
			msgText.value = msg.value.filter((item) => item.id === key)[0].msg
			visible.value = true
		}

		return {
			visible,
			msgText,
			name,
			openKeys,
			selectedKeys,
			collapsed,
			routes,
			logout,
			openGithub,
			msg,
			clickMsg
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
		}
		.header-left {
			display: flex;
			flex-direction: row;
			// justify-content: space-between;
			align-items: center;
		}
		.header-right {
			display: flex;
			flex-direction: row;
			align-items: center;
			.item {
				margin-left: 15px;
				cursor: pointer;
				&:hover {
					color: #1890ff;
				}
				.icon {
					font-size: 18px;
					transition: color 0.3s;
					cursor: pointer;
					&:hover {
						color: #1890ff;
					}
				}
			}
		}
	}
}
</style>
<style lang="less">
.header-right {
	.ant-badge-count {
		top: -5px;
	}
}
</style>