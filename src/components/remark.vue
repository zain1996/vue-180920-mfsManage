<template>
  <el-input resize="none" :rows="5" type="textarea" v-model="model"></el-input>
</template>

<script>


  export default {

    name:'remark',
    data() {
      return {
        remark : this.value,
      }
    },
    props: ["value"],
    watch : {
      'value' (val, old) {
        this.remark = val;
      }
    },
    computed: {
      model : {
        get(){
          return this.remark
        },
        set(val) {
          this.$emit("input",val);
        }
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>
