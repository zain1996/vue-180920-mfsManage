<template>
  <div>
      <el-popover
        ref="a"
        placement="bottom"
        v-model="visible"
      >
        <slot :visible="visible" name="popup"></slot>
      </el-popover>

    <el-button class="button" type="text" v-popover:a>
      <slot name="value"></slot>

    </el-button>
    <slot name="none"></slot>
  </div>
</template>
<style lang="scss" scoped>
  .button {
    color: black;

    &:hover{
      color: black;
    }

  }
</style>
<script>
  export default {
    name : "pop",
    data() {
      return {
        visible : false
      }
    },
    mounted() {
      this.$bus.$on("OnListSubmit", () =>{
        if(this.visible === true) {
          this.visible = false;
        }
      })
    }
  }
</script>
