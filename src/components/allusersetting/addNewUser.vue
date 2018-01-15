<template>
	<div id="addnewuser">
		<el-card class="box-card">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-col :span="22">
						<el-form-item label="用户名" prop="username">
			    			<el-input v-model="ruleForm.username"></el-input>
			  			</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="22">
			  			<el-form-item label="密码" prop="password">
			  				<el-input type="password" v-model="ruleForm.password"></el-input>
			  			</el-form-item>
			  		</el-col>
			  	</el-row>
			  	<el-row>
					<el-col :span="6">
	  					<el-form-item label="激活" prop="status">
    						<el-switch v-model="ruleForm.status"></el-switch>
  						</el-form-item>
  					</el-col>
  				</el-row>
  				<el-row>
  					<el-col :span="15">
  						<el-form-item label="用户角色" prop="role">
    						<el-radio-group v-model="ruleForm.role">
      							<el-radio label="1">管理员</el-radio>
      							<el-radio label="2">普通用户</el-radio>
    						</el-radio-group>
  						</el-form-item>
  					</el-col>
  				</el-row>
  				<el-row>
	  				<el-form-item>
						<el-col :span="4" :offset="4">
	    					<el-button type="primary" @click="submitForm('ruleForm')" :disabled="usercheck">提交</el-button>
						</el-col>
						<el-col :span="4" :offset="2">
	    					<el-button @click="resetForm('ruleForm')">重置</el-button>
				  		</el-col>
		  			</el-form-item>
			  	</el-row>
	  		</el-form>
  		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			var enterPass = (rule, value, callback)  => {
				if (value.length < 3) {
					callback(new Error('密码长度最少3位'))
				} else {
					this.usercheck = false;
					callback()
				}
			};
			return {
				usercheck: true,
				ruleForm: {
					username: '',
					password: '',
					status: true,
					role: "2",
				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, message: '最少3个字符', trigger: 'blur'}
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
            			{ validator: enterPass, trigger: 'blur' }
					],
				}
			}
		},
		methods: {
    		submitForm(formName) {
        		this.$refs[formName].validate((valid) => {
         	 		if (valid) {
         	 			this.$store.dispatch('AddNewUser',this.ruleForm).then(resp => {
         	 				console.log(resp)
         	 				let pd = resp.data.exec
         	 				let reason = resp.data.reason
         	 				if (pd === 'true') {
         	 					this.$message.success(reason)
         	 				} else {
         	 					this.$message.error(reason)
         	 				}
         	 				this.$refs[formName].resetFields();
         	 				this.usercheck = true

         	 			}).catch(err => {
         	 				console.log(err)
         	 			})
        			} else {
            			console.log('error submit!!');
            			return false;
        			}
        		});
      		},
      		resetForm(formName) {
        		this.$refs[formName].resetFields();
    		}
		}
	}
</script>

<style scoped>
	#addnewuser {
		margin-top: 6%;
		margin-left: 30%;
		width: 40%;
	}
</style>