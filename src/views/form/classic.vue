<!--
 * @Author: mingxing.huang
 * @Date: 2020-10-30 15:56:28
-->
<template>
	<a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
		<a-form-item label="Activity name">
			<a-input v-model:value="form.name" />
		</a-form-item>
		<a-form-item label="Activity zone">
			<a-select
				v-model:value="form.region"
				placeholder="please select your zone"
			>
				<a-select-option value="shanghai"> Zone one </a-select-option>
				<a-select-option value="beijing"> Zone two </a-select-option>
			</a-select>
		</a-form-item>
		<a-form-item label="Activity time">
			<a-date-picker
				v-model:value="form.date1"
				show-time
				type="date"
				placeholder="Pick a date"
				style="width: 100%"
			/>
		</a-form-item>
		<a-form-item label="Instant delivery">
			<a-switch v-model:checked="form.delivery" />
		</a-form-item>
		<a-form-item label="Activity type">
			<a-checkbox-group v-model:value="form.type">
				<a-checkbox value="1" name="type"> Online </a-checkbox>
				<a-checkbox value="2" name="type"> Promotion </a-checkbox>
				<a-checkbox value="3" name="type"> Offline </a-checkbox>
			</a-checkbox-group>
		</a-form-item>
		<a-form-item label="Resources">
			<a-radio-group v-model:value="form.resource">
				<a-radio value="1"> Sponsor </a-radio>
				<a-radio value="2"> Venue </a-radio>
			</a-radio-group>
		</a-form-item>
		<a-form-item label="Activity form">
			<a-input v-model:value="form.desc" type="textarea" />
		</a-form-item>
		<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
			<a-button type="primary" @click="onSubmit"> Create </a-button>
			<a-button style="margin-left: 10px"> Cancel </a-button>
		</a-form-item>
	</a-form>
</template>

<script>
export default {
	data() {
		return {
			labelCol: { span: 4 },
			wrapperCol: { span: 8 },
			form: {
				name: '',
				region: undefined,
				date1: undefined,
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			}
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!', this.form)
		}
	}
}
</script>

<style lang="less" scoped>
</style>