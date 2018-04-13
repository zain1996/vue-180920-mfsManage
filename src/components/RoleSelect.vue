<template>
  <el-select v-model="model" multiple placeholder="请选择">
    <el-option value="is_super" label="主管"></el-option>
    <el-option value="is_business" label="商务"></el-option>
    <el-option value="is_sales" label="销售"></el-option>
  </el-select>
</template>
<script>


  export default {

    name:'RoleSelect',
    data() {
      return {
        role : this.value,
        options: [],
      }
    },
    props: ["value"],
    watch : {
      'value' (val, old) {
        this.role = val;
      }
    },
    computed: {
      model : {
        get(){
          let values = [];
          if(this.role.is_super==1) {
            values.push("is_super");
          }

          if(this.role.is_business==1) {
            values.push("is_business")
          }

          if(this.role.is_sales==1) {
            values.push("is_sales")
          }

          return values
        },
        set (values) {
          let role = {
            is_super : 0,
            is_business : 0,
            is_sales : 0,
          };

          values.forEach((val) => {

            if (val === "is_super") {
              role.is_super = 1;
            }

            if (val === "is_business") {
              role.is_business = 1;
            }

            if (val === "is_sales") {
              role.is_sales = 1;
            }
          });

          this.$emit("input", role);

        }
      },
    },
    mounted(){

    },
  }
</script>
<style lang="scss" scoped>
  .el-select{
    display: block;
  }
</style>
