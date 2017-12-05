<template>
  <transition-group enter-active-class="animated swing">
    <el-container v-show="flag" :key="1" id="logincontainer">
      <el-header id="loginheader">
        <i class="el-icon-service"></i>
        <span>测试发布系统</span>
      </el-header>
      <el-main id="loginmain">
        <el-form :model="loginForm" status-icon :rules="loginrules" ref="loginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwd">
            <el-input type="password" v-model="loginForm.passwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer id="loginfooter">
        <i class="el-icon-loading"></i>
        <span>这只是个图标</span>
      </el-footer>
    </el-container>
  </transition-group>
</template>
<script>
  export default {
    data() {
      var validateUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          callback()
        }
      };
      var validatePasswd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 2) {
          callback(new Error('密码长度不足，请检查'));
        } else {
          callback();
        }
      };
      return {
        message:'',
        type:'',
        flag:false,
        loginForm: {
          username: '',
          passwd: '',
        },
        loginrules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          passwd: [
            { validator: validatePasswd, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      open(){
        this.$message({
          message: this.message,
          type: this.type
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/backstage/veruser/',{
              name: this.loginForm.username,
              password: this.loginForm.passwd
              },
              {emulateJSON: true}).then(resp => {
                console.log(resp.data)
                if (resp.data.exec === "true"){
                  this.$router.push('main')
                } else if ( resp.data.exec === "false") {
                  this.message='密码错误，请重新输入';
                  this.type='error'
                  this.open()
                } else {
                  this.message='用户不存在';
                  this.type='error';
                  this.open()
                }
            }).catch(resp => {
              this.message='连接服务器错误';
              this.type='warning';
              this.open()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
      this.flag=!this.flag
    }
  }
</script>

<style scoped>
  #logincontainer {
    border: 1px solid #ccc;
    border-radius: 10px;
    position: absolute;
    top: 25%;
    left: 34%;
    width: 32%;
    background-color: #f5f5f5;
  }
  #loginheader {
    font-size: 30px;
    margin-top: 8%;
  }
  #loginmain {
    margin-right: 10%;
  }
  #loginfooter {
    font-size: 15px;
    text-align: center;
    color: #ccc;
  }
  /*@import '../assets/css/animate.css'*/
  
</style>
