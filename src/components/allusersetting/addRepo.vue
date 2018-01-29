<template>
	<div>
		<el-row>
			<el-col :span="8">添加Repo：</el-col>
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-input placeholder="请输入Repo" v-model="repo">
					<i slot="prefix" class="el-input__icon el-icon-document"></i>
  				</el-input>
  			</el-col>
  			<el-col :span="4" :offset="1"><el-button type="primary" @click="addrepo">提交</el-button></el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				repo: '',
			}
		},
		methods: {
			addrepo() {
				console.log(this.repo)
			}
		}
	}
</script>

<style scoped>
	
</style>