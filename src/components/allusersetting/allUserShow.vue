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
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="adminform" status-icon>
				<el-form-item label="新密码" prop="password">
					<el-input v-model="form.password" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div solt="footer" class="dialog-footer">
				<el-row>
					<el-col :span="3" :offset="9">
						<el-button @click="dialogFormVisible = false">取消</el-button>
					</el-col>
					<el-col :span="3">
						<el-button type="primary" @click="changeusrpass('adminform')">确定</el-button>
					</el-col>
				</el-row>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible: false,
				title: '',
				form: {
					userid: '',
					username: '',
					password: '',
				},
				rules: {
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
            			{ min: 3, message: '最少3个字符', trigger: 'blur'}
					],
				}
			}
		},
		methods: {
			handleEdit(index, row) {
				this.title = '更改用户 '+row.username+' 密码'
				this.form.userid = row.userid
				this.form.username = row.username
				this.dialogFormVisible = true
			},
			changeusrpass(formName) {
				this.dialogFormVisible = false
				console.log(this.form)
				this.$store.dispatch('ChangeUserPassword', this.form).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						this.$message.success(resp.data.reason)
					} else {
						this.$message.error(resp.data.reason)
					}
				}).catch(err => {console.log(err)})
				this.$refs[formName].resetFields()
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