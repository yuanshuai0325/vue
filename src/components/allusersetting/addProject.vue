<template>
	<div>
		<el-row>
			<el-col :span="8">应用列表：</el-col>
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-select v-model="value" clearable placeholder="请选择应用" @change="change">
	    			<el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label" ></el-option>
				</el-select>
			</el-col>
			<el-col :span="4" :offset="1"><el-button type="primary" @click="addproject">提交</el-button></el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
			}
		},
		methods: {
			change(value) {
				console.log(value)
			},
			addproject() {
				if (this.value) {
					this.$store.dispatch('AddProject', this.value).then(resp => {
						console.log(resp)
						let pd = resp.data.exec
						if (pd === 'true') {
							this.$message.success(resp.data.reason)
						} else {
							this.$message.error(resp.data.reason)
						}
					}).catch(err => {console.log(err)})
				} else {
					this.$message.error("请选择添加的应用")
				}
				this.value = ''
			}
		},
		computed: {
			options() {
				return this.$store.getters.repodir
			},
		},
		mounted() {
			this.$store.dispatch('GetRepoDir').then(resp => {console.log(resp)}).catch(err => {console.log(err)})
		}		
	}
</script>

<style scoped>
	
</style>