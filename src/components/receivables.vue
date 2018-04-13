<template>
  <el-input v-model="model"></el-input>
</template>

<script>


  export default {

    name:'receivables',
    data() {
      return {
        receivables : this.value,
      }
    },
    props: ["value"],
    watch : {
      'value' (val, old) {
        this.receivables = val;
      }
    },
    computed: {
      model : {
        get(){
          return this.receivables
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
