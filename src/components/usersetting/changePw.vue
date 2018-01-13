<template>
	<div id="changepw">
		<el-card class="box-card">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="原密码" prop="opassword">
	    			<el-input type="password" v-model="ruleForm.opassword"></el-input>
	  			</el-form-item>
	  			<el-form-item label="新密码" prop="npassword">
	  				<el-input type="password" v-model="ruleForm.npassword"></el-input>
	  			</el-form-item>
	  			<el-form-item label="确认密码" prop="cpassword">
	  				<el-input type="password" v-model="ruleForm.cpassword"></el-input>
	  			</el-form-item>
	  			<el-form-item>
	    			<el-button type="primary" @click="submitForm('ruleForm')" :disabled="passcheck">确认修改</el-button>
	    			<el-button @click="resetForm('ruleForm')">重置</el-button>
	  			</el-form-item>
	  		</el-form>
  		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
        		if (value === '') {
        			callback(new Error('请再次输入密码'));
        		} else {
        			if (this.ruleForm.cpassword !== this.ruleForm.npassword) {
            			callback(new Error('两次密码输入不一致'))
          			}
          			this.passcheck = false;
         			callback();
        		}
      		};
			return {
				passcheck: true,
				ruleForm: {
					opassword: '',
					npassword: '',
					cpassword: '',
				},
				rules: {
					opassword: [
						{ required: true, message: '请输入原密码', trigger: 'blur' },
						{ min: 3, message: '最少3个字符', trigger: 'blur'}
					],
					npassword: [
						{ required: true, message: '请输入新密码', trigger: 'blur' },
						{ min: 3, message: '最少3个字符', trigger: 'blur'}
					],
					cpassword: [
						{ required: true, message: '请确认新密码', trigger: 'blur' },
            			{ validator: validatePass, trigger: 'blur' }
          			],
				},
			}
		},
		methods: {
    		submitForm(formName) {
        		this.$refs[formName].validate((valid) => {
         	 		if (valid) {
            			this.$store.dispatch('ChangeUserPass', {'opassword':this.ruleForm.opassword, 'cpassword':this.ruleForm.cpassword}).then(resp => {
            				console.log(resp)
            				let pd = resp.data.exec
            				console.log(pd)
            				if (pd === "true") {
            					this.$alert('密码已修改，token验证失效', '请重新登录', {confirmButtonText:'确定'})
            					this.$router.push('/')
            				} else {
            					let reason = resp.data.reason
            					this.$message.error(reason)
            					this.$refs[formName].resetFields();
            				}
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
	#changepw {
		margin-top: 6%;
		margin-left: 30%;
		width: 40%;
	}
</style>