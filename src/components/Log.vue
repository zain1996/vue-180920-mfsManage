<template>
  <div>
    <el-row class="tap">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/list',query:{ time:this.$route.params.time }}">主页</el-breadcrumb-item>
          <el-breadcrumb-item>日志</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      height="100%"
      style="width: 100%">
      <el-table-column label="姓名">
        <template scope="scope">
          <span>{{scope.row.user_name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="event"
        label="字段名">
      </el-table-column>
      <el-table-column
        prop="original_value"
        label="原值">
      </el-table-column>
      <el-table-column
        prop="new_value"
        label="新值">
      </el-table-column>
      <el-table-column label="修改时间">
        <template scope="scope">
          <span>{{scope.row.dateline | filterFun}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name:'log',
    data() {
      return {
        tableData: []
      }
    },
    created(){
      this.getLogList();
    },
    methods: {
      getLogList() {
        let project_id = this.$route.params.project_id;
        let uid  = JSON.parse(localStorage.login).uid;
        this.$invoke(
          '/project/look_oplog',
          {
            uid : uid,
            project_id : project_id,
          },
          (data) => {
            this.tableData = data.oplog_list
          },
          this.view
        )
      },
    },
    filters:{
      filterFun: function (value) {
        return moment(value).zone(value).format("YYYY-MM-DD HH:mm");
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tap{
    margin-bottom: 20px;
  }
  .el-table{
    height:90%;
  }
</style>
