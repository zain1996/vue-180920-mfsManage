<template>
  <el-menu :default-active="$route.path" class="nav-menu" @open="handleOpen" @close="handleClose"
           theme="dark"
           router>
    <el-menu-item index="/list"><i class="el-icon-menu"></i>主页</el-menu-item>
  </el-menu>
</template>
<style lang="scss" scoped>
  .nav-menu{
    height:100%;
  }
</style>
<script>
  export default {
    name:'nav-menu',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
