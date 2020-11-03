<!--
 * @Author: mingxing.huang
 * @Date: 2020-10-29 17:38:56
-->
<template>
	<div class="login-box">
		<div class="form-box">
			<div class="logo">Vue-Next Admin</div>
			<a-form :model="form">
				<a-form-item>
					<a-input v-model:value="form.username" placeholder="Username">
						<template v-slot:prefix
							><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
						/></template>
					</a-input>
				</a-form-item>
				<a-form-item>
					<a-input
						v-model:value="form.password"
						type="password"
						placeholder="Password"
					>
						<template v-slot:prefix
							><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
						/></template>
					</a-input>
				</a-form-item>
				<a-form-item style="text-align: center">
					<a-button style="width: 150px" type="primary" @click="handleSubmit">
						登录
					</a-button>
				</a-form-item>
			</a-form>
			<p style="color: #fff">管理员账号：admin；密码：123456</p>
			<p style="color: #fff">用户账号： guest；密码：123456</p>
		</div>
	</div>
</template>

<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
	components: {
		UserOutlined,
		LockOutlined
	},
	setup() {
		const store = useStore()
		const router = useRouter()
		const data = reactive({
			form: {
				username: 'admin',
				password: '123456'
			}
		})
		const handleSubmit = () => {
			store
				.dispatch('user/login', data.form)
				.then(() => {
					console.log('登录成功跳转')
					router.push('/')
				})
				.catch(() => {})
		}
		return { ...toRefs(data), handleSubmit }
	}
}
</script>

<style lang="less" scoped>
.login-box {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 100vh;
	background: url('../../assets/bg.jpeg') no-repeat;
	background-size: 100% 100%;
	.form-box {
		margin-right: 100px;
		padding: 40px;
		width: 400px;
		height: 400px;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 4px;
		.logo {
			text-align: center;
			color: #fff;
			font-size: 25px;
			font-weight: bold;
			margin-bottom: 30px;
		}
	}
}
</style>