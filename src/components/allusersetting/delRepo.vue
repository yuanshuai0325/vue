<template>
	<div>
		<el-row>
			<el-col :span="8">删除repo：</el-col>
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-select placeholder="请选择" v-model="value">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4" :offset="1"><el-button type="primary" @click="delrepo">提交</el-button></el-col>
		</el-row>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		methods: {
			delrepo() {
				this.$store.dispatch('DelRepo',this.value).then(resp => {
					console.log(resp)
					let pd = resp.data.exec
					if (pd === 'true') {
						this.$message.success(resp.data.reason)
						this.value = ''
					} else {
						this.$message.error(resp.data.reason)
					}}).catch(err => {
						console.log(err)
						this.$message.error(resp.data.reason)
					})
			}
		},
		computed: {
			options() {
				let data = []
				for (let x in this.$store.getters.getallmessage) {
					console.log(x)
					data.push({'value':x, 'label':x})
				}
					console.log(data)
				return data
			},
		}
	}
</script>

<style scoped>
	
</style> 