<template>
	<div>
		<el-row>
			<el-col :span="8">添加主机：</el-col>
			<el-col :span="24">
				<el-input placeholder="请输入主机名" v-model="host">
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
				host: '',
			}
		}
	}
</script>

<style scoped>
	
</style>