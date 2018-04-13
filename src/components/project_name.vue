<template>
  <el-input v-model="model"></el-input>
</template>

<script>


  export default {

    name:'project_name',
    data() {
      return {
        project_name : this.value,
      }
    },
    props: ["value"],
    watch : {
      'value' (val, old) {
        this.project_name = val;
      }
    },
    computed: {
      model : {
        get(){
          return this.project_name
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
