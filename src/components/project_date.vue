<template>
  <el-date-picker
    v-model="dateValue"
    type="date"
    style="width:100%"
    @change="setDate"
    placeholder="选择日期">
  </el-date-picker>
</template>

<script>


  export default {

    name: 'project_date',
    data() {
      return {
        dateValue: this.value,
      }
    },
    props: ["value"],
    methods: {
      setDate(val) {
        this.$emit('input',val);
      }
    },
    watch: {
      'value' : function (v) {
        this.dateValue = v
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
