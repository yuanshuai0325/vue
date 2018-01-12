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
            <el-input type="password" v-model="loginForm.passwd" auto-complete="off" ></el-input>
          </el-form-item>
         <!--  <el-form-item>
            <div class="block">
              <span class="demonstration">拖拽完成验证</span>
              <el-slider v-model="value1"></el-slider>
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" :disabled="passcheck">提交</el-button>
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
  import axios from 'axios'
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
          // @keydown.enter="submitForm('loginForm')"
          // this.submitForm('loginForm')
          this.passcheck = false
        }
      };
      return {
        flag:false,
        passcheck:true,
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.$http.post('/api/backstage/veruser/',{
            //   name: this.loginForm.username,
            //   password: this.loginForm.passwd
            //   },
            //   {emulateJSON: true}).then(resp => {
              // before store
              // axios({
              //   method: 'post',
              //   url: '/api/backstage/veruser/',
              //   data: {
              //     name: this.loginForm.username,
              //     password: this.loginForm.passwd
              //   },
              //   transformRequest:[
              //     function(data) {
              //       let params = ''
              //       for(let index in data) {
              //         params += index+'='+data[index]+'&'
              //       }
              //       return params
              //       }
              //   ]
              // }).then(resp => {
                this.$store.dispatch('LoginByUsername', {'name': this.loginForm.username, 'password': this.loginForm.passwd}).then(resp => {
                  console.log('sdfsdfsdfsdf',resp.data.exec)
                if (resp.data.exec === "true"){
                  // console.log(resp.data.XToken)
                  this.$cookie.set('XToken', resp.data.XToken)
                  // this.$cookie.set('expiretime', resp.data.expiretime)
                  this.$router.push('dashboard')
                  console.log(document.cookie)
                } else if ( resp.data.exec === "false") {
                  this.$message.error(resp.data.reason);
                  this.passcheck = true;
                  this.$refs[formName].resetFields();
                }
            }).catch(err => {
              this.$message.warning('连接服务器错误')
              console.log(err)
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
    },
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
