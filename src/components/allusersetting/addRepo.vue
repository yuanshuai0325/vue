<template>
	<div>
		<el-row>
			<el-col :span="8">添加Repo：</el-col>
			<el-col :span="24">
				<el-input placeholder="请输入Repo" v-model="repo">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
  				</el-input>
  			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				repo: '',
			}
		}
	}
</script>

<style scoped>
	
</style>