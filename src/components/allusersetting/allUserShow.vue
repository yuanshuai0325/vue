<template>
	<div>
		<br><br>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="userid" label="用户ID"></el-table-column>
			<el-table-column prop="username" label="用户名"></el-table-column>
			<el-table-column label="激活">
				<template slot-scope="scope">
					<el-row>
						<el-radio-group v-model="scope.row.xcode" size="mini" @change="handleActive(scope.$index, scope.row)">
							<el-col :span="12">
								
							<el-radio-button label="启用"></el-radio-button>
							</el-col>
							<el-col :span="12">
								
							<el-radio-button label="禁用"></el-radio-button>
							</el-col>
						</el-radio-group>
					</el-row>
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
		// data() {
		// 	return {
		// 		tableData: [
		// 			{
		// 				userid: '1',
		// 				username: 'tom',
		// 				code: true,
		// 				role: 'administrator',
		// 			}
		// 		]
		// 	}
		// },
		methods: {
			handleEdit(index, row) {
				console.log(index, row)
			},
			handleDel(index, row) {
				this.$alert('请确认删除用户'+row.username, '危险操作', {
					confirmButtonText: '确认',
					callback: action => {
						this.$store.dispatch('DelUser', row).then(resp=>{
							console.log(resp)
							let pd = resp.data.exec
							if (pd === 'true') {
								this.$message.success(resp.data.reason)
								this.$store.dispatch('GetAllUser').then(resp => {console.log(resp)}).catch(err => {console.log(err)})
							} else {
								this.$message.error(resp.data.reason)
							}
						}).catch(err=>{console.log(err)})
					}
				}
				)
			},
			handleActive(index, row) {
				this.$store.dispatch('ChangeUserCode', row).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						this.$message.success(resp.data.reason)
					} else {
						this.$message.error(resp.data.reason)
					}
				}).catch(err => {console.log(err)})
			}
		},
		computed: {
			tableData() {
				return this.$store.getters.getalluser
			}
		},
		beforeCreate() {
			this.$store.dispatch('GetAllUser').then(resp => {console.log(resp)}).catch(err => {console.log(err)})
		}
	}
	
</script>

<style scoped>
	
</style>