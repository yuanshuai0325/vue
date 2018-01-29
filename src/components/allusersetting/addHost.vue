<template>
	<div>
		<el-row>
			<el-col :span="8">添加主机：</el-col>
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-input placeholder="请输入主机名" v-model="host">
					<i slot="prefix" class="el-input__icon el-icon-document"></i>
  				</el-input>
  			</el-col>
  			<el-col :span="4" :offset="1"><el-button type="primary" @click="addhost">提交</el-button></el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				host: '',
			}
		},
		methods: {
			addhost() {
				this.$store.dispatch("AddNewHost",this.host).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						this.$message.success(resp.data.reason)
					} else {
						this.$message.error(resp.data.reason)
					}
					this.host = ''
				}).catch(err => {
					console.log(err)
					this.host = ''
				})
			}
		}
	}
</script>

<style scoped>
	
</style>