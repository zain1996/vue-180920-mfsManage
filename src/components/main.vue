<template>
  <div class="warp">
    <el-row class="head">
      <el-col :span="24">
        <mfs-head></mfs-head>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col class="nav" :span="4">
        <nav-menu></nav-menu>
      </el-col>
      <el-col class="main" :span="20">
        <div class="main-content">
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'main',
    data () {
      return {
        transitionName: 'slide-left',
      }
    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    },
    mounted(){
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        this.$invoke(
          '/member/info',
          {
            uid : JSON.parse(localStorage.login).uid,
          },
          (data) => {
            this.$setUserInfo(data)
            this.$bus.$emit("onUpdateUserInfo", data);
          },
        )
      },
    }
  }
</script>
<style lang="scss" scoped>
  .warp{
    display:flex;
    flex-direction: column;
    height:100%;
    .head{
      width:100%;
    }
    .content{
      flex: 1;
      .nav,.main{
        position: relative;
        height:100%;
      }
      .nav{
        z-index: 2;
      }
      .main{
        box-sizing: border-box;
        padding:20px;
        .main-content{
          height:100%;
          position: relative;
        }
      }
    }
  }
</style>
