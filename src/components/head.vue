<template>
  <div class="head">
    <el-row type="flex" align="middle">
      <el-col :span="4">
        <div class="user-info">
          <span>欢迎</span>
          <span>{{view.name}}</span>
        </div>
      </el-col>
      <el-col :span="6">
        <span v-show="view.is_super">[主管]</span>
        <span v-show="view.is_business">[商务]</span>
        <span v-show="view.is_sales">[销售]</span>
      </el-col>
      <el-col :span="14">
        <div class="btn">
          <el-button v-if="view.is_super === 1" @click="$go('/UserList')" type="primary"><i class="el-icon-setting el-icon--left"></i>团队管理</el-button>
          <el-button @click="$clearUser()" type="primary" icon="delete">注销</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
  .head{
    border-bottom: 1px solid #ccc;
    .user-info{
      padding: 10px;
    }
    .btn{
      text-align: right;
      padding: 10px;
      .el-button{
        width: 120px;
      }
    }
  }
</style>
<script>
  export default {
    name:'mfs-head',
    data(){
      return {
        view:{}
      }
    },
    mounted() {
      this.$bus.$on("onUpdateUserInfo", (data) => {
        this.view = data
      })

    }
  }
</script>
