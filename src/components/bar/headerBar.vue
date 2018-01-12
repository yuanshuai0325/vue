<template>
  <div class="mheader">
    <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="dashboard">dashboard</el-menu-item>
      <el-menu-item index="updatecode" v-show="headBarShow">处理中心</el-menu-item>
      <el-menu-item index="cmdrun" v-show="headBarShow">命令执行</el-menu-item>
      <el-menu-item index="rollbackcode" v-show="headBarShow">代码回退</el-menu-item>
      <el-menu-item index="settingalluser" v-show="headBarShow">用户管理</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu> -->
      <div class="mname">
        <el-dropdown @command="handleCommand">
          <el-button type="info" size="mini">
            Hi，{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user setting">用户设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <div class="line"></div>
    <!-- <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      handleCommand(command) {
        if ( command === "logout" ) {
            this.$destroy()

          this.$store.dispatch('FedLogOut').then(() => {
            // this.$router.push('/') 造成administrator用户登录时，路由重复加载
            location.reload()
          })
        } else if (command === "user setting") {
          // this.$router.push('usersetting')
          this.$router.push({name:'settinguser'})
        }
      }
    },
    computed:{
      headBarShow() {
        return this.$store.getters.headBarShow
      },
      userName() {
        return this.$store.getters.username
      }
    },
    mounted(){
      this.activeIndex = this.$router.history.current.name
    }
  }
</script>

<style scoped>
  .mheader {
    padding-left:5%;
    margin-bottom: 2%;
  }
  .mname {
    display: flex;
    position: absolute;
    right:5%;
    top: 16px;
   
  }
</style>