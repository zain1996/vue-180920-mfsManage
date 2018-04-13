<template>
  <transition :name="transitionName">
    <router-view class="child-view"></router-view>
  </transition>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left'
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
  }
}
</script>
<style lang="scss">
  body,html{
    height:100%;
    margin:0;
    padding:0;
    overflow: hidden;
  }
  .child-view {
    position: absolute;
    width:100%;
    height:100%;
    transition: all 0.3s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-10px, 0);
    transform: translate(-10px, 0);
  }
</style>
