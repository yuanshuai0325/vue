<template>
  <div class="mheader">
    <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="main">处理中心</el-menu-item>
      <el-menu-item index="cmdrun">命令执行</el-menu-item>
      <el-menu-item index="rollbackcode">代码回退</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu> -->
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
</style>