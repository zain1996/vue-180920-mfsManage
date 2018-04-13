<template>
  <div class="warp">
    <el-dialog size="tiny" title="新增用户" :visible.sync="view.dialogFormVisible">
      <user-add @onAddFlag="getUserAddFlag"></user-add>
    </el-dialog>
    <el-row>
      <el-col style="margin-bottom: 20px" :span="2">
        <el-button @click="view.dialogFormVisible=true">新增用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="view.tableData"
      height="100%"
      v-loading="view.loading"
      element-loading-text="拼命加载中"
      border
      style="width: 100%">
      <el-table-column align="center" label="姓名">
        <template scope="scope">
          <span>{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="登陆邮箱">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分组">
        <template scope="scope">
          <span v-if="scope.row.is_super === 1">主管</span>
          <span v-if="scope.row.is_business === 1">商务</span>
          <span v-if="scope.row.is_sales === 1">销售</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template scope="scope">
          <el-switch
            v-model="scope.row.status"
            on-value="0"
            off-value="1"
            off-text="禁用"
            on-text="启用"
            on-color="#13ce66"
            off-color="#ff4949" @change="btnEditFlag(scope.$index)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template scope="scope">
          <pop>
            <div slot="value">
              <el-button size="small">编辑</el-button>
            </div>
            <div slot="popup">
              <UserEdit :editUid="scope.row.uid" @changeUserEdit="getUserList"></UserEdit>
            </div>
          </pop>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name:'UserList',
    data() {
      return {
        view:{
          tableData: [],
          loading:true,
          dialogFormVisible:false
        },
        uid:JSON.parse(localStorage.login).uid
      }
    },
    created(){
      this.getUserList();
    },
    methods: {
      getUserList(){
        this.$invoke(
          '/member/list',
          {
            uid:this.uid
          },
          (data) => {
            let listData = [];

            data.user_list.forEach((value,key)=> {
              listData.push({
                user_name : value.user_name,
                email : value.email,
                uid : value.uid,
                is_business : value.is_business,
                is_sales : value.is_sales,
                is_super : value.is_super,
                status : value.status == 1 ? '1' : '0'
              });
            });
            this.view.tableData = listData
          },
          this.view
        )
      },
      btnEditFlag(index) {
        let data = this.view.tableData[index];
        this.$invoke(
          '/member/change_status',
          {
            op_uid:this.uid,
            to_uid:data.uid,
            status:Number(data.status)
          },
          (data) => {

          }
        )
      },
      getUserAddFlag(){
        this.view.dialogFormVisible=false
        this.getUserList();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-table{
    height:100%;
  }
</style>
