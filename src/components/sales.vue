<template>
  <div v-show="visible">
    <el-select v-model="model" multiple placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>


  export default {

    name:'sales',
    data() {
      return {
        visible:false,
        sales : this.value,
        options: [],
      }
    },
    props: ["value",'list'],
    watch : {
      'value' (val, old) {
        this.sales = val;
      },
      '$parent.$parent.$parent.$parent.visible' : function(value){
        this.visible = value;

        if(value) {
          this.getInfo()
        }
      }
    },
    computed: {
      model : {
        get(){
          return this.sales
        },
        set(val) {
          this.$emit("input",val);
        }
      },
    },
    mounted(){
      if(this.list){
        this.visible = true;
        this.getInfo()
      }
    },
    methods: {
      getInfo(){
        this.options = [];
        this.$invoke(
          '/member/list_user_by_job',
          {
            job_id : 1,
          },
          (data) => {
            data.list.forEach((value,key)=>{
              this.options.push({
                label:value.username,
                value:value.uid
              })
            })
          }
        );
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-select{
    display: block;
  }
</style>
