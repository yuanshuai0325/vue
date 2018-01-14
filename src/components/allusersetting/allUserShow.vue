<template>
	<div>
		<br><br>
		<el-table :data="tableData" height="250" border style="width: 100%">
			<el-table-column prop="userid" label="用户ID"></el-table-column>
			<el-table-column prop="username" label="用户名"></el-table-column>
			<el-table-column label="激活">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.code" @change="handleActive(scope.$index, scope.row)"></el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="role" label="角色"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-row>
						<el-col :span="8" :offset="3">						
							<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">更改密码</el-button>
						</el-col>
						<el-col :span="8" :offset="2">				
							<el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除用户</el-button>
						</el-col>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [
					{
						userid: '1',
						username: 'tom',
						code: true,
						role: 'administrator',
					}
				]
			}
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row)
			},
			handleDel(index, row) {
				console.log(index, row)
			},
			handleActive(index, row) {
				console.log(index, row)
			}
		}
	}
	
</script>

<style scoped>
	
</style>