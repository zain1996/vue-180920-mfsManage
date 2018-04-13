<template>
  <el-input v-model="model"></el-input>
</template>

<script>


  export default {

    name:'payables',
    data() {
      return {
        payables : this.value,
      }
    },
    props: ["value"],
    watch : {
      'value' (val, old) {
        this.payables = val;
      }
    },
    computed: {
      model : {
        get(){
          return this.payables
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
