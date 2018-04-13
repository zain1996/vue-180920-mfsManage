<template>
  <div class="warp">
    <el-dialog size="small" title="新增项目" :visible.sync="view.dialogFormVisible">
      <add @add="getAddFlag"></add>
    </el-dialog>
    <el-row>
      <el-col :span="24">
        <el-form inline label-width="40px" label-position="left">
          <el-form-item label="查看">
            <el-select @change="getList" v-model="view.select.value" placeholder="请选择">
              <el-option
                v-for="item in view.select.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="view.dialogFormVisible = true">新增项目</el-button>
            <el-button v-if="view.userInfo.is_super===1" @click="exportExcel()">导出表格</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table
      :data="view.tableData"
      border
      v-loading="view.loading"
      height="100%"
      element-loading-text="拼命加载中"
      style="width: 100%">
      <el-table-column width="80" align="center" label="序号">
        <template scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目名称">
        <template scope="scope">
          <pop :ifShow="ifShow">
            <div slot="value" >
              <div v-if="scope.row.project_name">
                {{ scope.row.project_name }}
              </div>
              <div v-else>
                无
              </div>
            </div>
            <div slot="popup">
              <el-form label-width="80px" labelPosition="left">
                <el-form-item label="项目名称">
                  <project_name v-model="scope.row.edit_project_name"></project_name>
                </el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitEditProject(scope.row,scope.row.edit_project_name,'name')">提交</el-button>
              </el-form>
            </div>
          </pop>
        </template>
      </el-table-column>
      <el-table-column align="center" label="销售">
        <template scope="scope">
          <pop>
            <div slot="value">
              <div v-if="scope.row.sales.length>0">
                <span v-for="item in scope.row.sales">
                  {{ item.username }}<br>
                </span>
              </div>
              <div v-else>
                无
              </div>
            </div>
            <div slot="popup" style="width:400px">
              <el-form label-width="80px" labelPosition="left">
                <el-form-item label="销售">
                  <sales v-model="scope.row.edit_sales"></sales>
                </el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitEditMember(scope.row,scope.row.edit_sales,1)">提交</el-button>
              </el-form>
            </div>
          </pop>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商务">
        <template scope="scope">
          <pop>
            <div slot="value">
              <div v-if="scope.row.business.length>0">
                <span v-for="item in scope.row.business">
                  {{ item.username }}<br>
                </span>
              </div>
              <div v-else>
                无
              </div>
            </div>
            <div slot="popup" style="width:400px">
              <el-form label-width="80px" labelPosition="left">
                <el-form-item label="商务">
                  <business v-model="scope.row.edit_business"></business>
                </el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitEditMember(scope.row,scope.row.edit_business,2)">提交</el-button>
              </el-form>
            </div>
          </pop>
        </template>
      </el-table-column>
      <el-table-column align="center" label="应收款">
        <template scope="scope">
          <pop>
            <div slot="value">
              <span>{{ scope.row.receivables }}</span>
            </div>
            <div slot="popup">
              <el-form label-width="80px" labelPosition="left">
                <el-form-item label="应收款">
                  <receivables v-model="scope.row.edit_receivables"></receivables>
                </el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitEditProject(scope.row,scope.row.edit_receivables,'receivables')">提交</el-button>
              </el-form>
            </div>
          </pop>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已收款">
        <template scope="scope">
          <pop>
            <div slot="value">
              <span>{{ scope.row.received }}</span>
            </div>
            <div slot="popup" style="width:700px">
              <received :project="scope.row.id" :uid="uid" @changeReceived="getList"></received>
            </div>
          </pop>
        </template>
      </el-table-column>
      <el-table-column v-if="(view.userInfo.is_super===1 || view.userInfo.is_business===1)" align="center" label="应付款">
        <template scope="scope">
          <pop>
            <div v-if="is_open(scope.row.business) || view.userInfo.is_super===1" slot="value">
              <span>{{ scope.row.payables }}</span>
            </div>
            <div v-else slot="none">
              <span>-</span>
            </div>
            <div slot="popup">
              <el-form label-width="80px" labelPosition="left">
                <el-form-item label="应付款">
                  <payables v-model="scope.row.edit_payables"></payables>
                </el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitEditProject(scope.row,scope.row.edit_payables,'payables')">提交</el-button>
              </el-form>
            </div>
          </pop>
        </template>
      </el-table-column>
      <el-table-column v-if="view.userInfo.is_super===1 || view.userInfo.is_business===1" align="center"  label="已付款">
        <template scope="scope">
          <pop>
            <div v-if="is_open(scope.row.business) || view.userInfo.is_super===1" slot="value">
              <span>{{ scope.row.paid }}</span>
            </div>
            <div v-else slot="none">
              <span>-</span>
            </div>
            <div slot="popup" style="width:700px">
              <paid :project="scope.row.id" :uid="uid" @changePaid="getList"></paid>
            </div>
          </pop>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template scope="scope">
          <pop>
            <div slot="value">
              <div v-if="scope.row.remark">
                {{ scope.row.remark }}
              </div>
              <div v-else>
                无
              </div>
            </div>
            <div slot="popup">
              <el-form label-width="80px" labelPosition="left">
                <el-form-item label="备注">
                  <remark v-model="scope.row.edit_remark"></remark>
                </el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitEditProject(scope.row,scope.row.edit_remark,'remark')">提交</el-button>
              </el-form>
            </div>
          </pop>
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目时间">
        <template scope="scope">
          <pop>
            <div slot="value">
                {{ scope.row.project_date }}
            </div>
            <div slot="popup">
              <el-form label-width="80px" labelPosition="left">
                <el-form-item label="备注">
                  <project_date v-model="scope.row.edit_project_date"></project_date>
                </el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitEditProject(scope.row,scope.row.edit_project_date,'project_date')">提交</el-button>
              </el-form>
            </div>
          </pop>
        </template>
      </el-table-column>
      <el-table-column v-if="view.userInfo.is_super===1" width="100" align="center" label="日志">
        <template scope="scope">
          <el-button @click="btnLookLog(scope.row)" size="small">查看日志</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<style lang="scss" scoped>
  .list-btn{
    padding-left: 10px;
  }
  .el-table{
    height:100%;
  }
</style>
<script>
  import Project_name from "./project_name.vue";
  import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
  export default {
    components: {
      ElForm,
      Project_name},
    name:'list',
    data(){
      return {
        view:{
          tableData:[{
            sales:{},
            business:{}
          }],
          select:{
            options: [],
            value: ''
          },
          userInfo:{},
          updateInfo:[],
          loading:true,
          dialogFormVisible:false
        },
        ifShow:false,
        uid:JSON.parse(localStorage.login).uid
      }
    },
    created() {
      this.$bus.$on("onUpdateUserInfo", (data) => {
        this.view.userInfo = data
      });
    },
    mounted(){
      this.view.userInfo = this.$getUserInfo();
      this.getDate();
    },
    methods: {
      getList() {
        this.$invoke(
          '/project/list_project',
          {
            year_month : this.view.select.value,
            uid : this.uid,
            status : 0,
          },
          (data) => {

            data.project_list.forEach((i) => {
              i.edit_sales=[];
              i.edit_business=[];
              i.edit_project_name = i.project_name;
              i.edit_receivables = i.receivables;
              i.edit_payables = i.payables;
              i.edit_remark = i.remark;
              i.edit_project_date = i.project_date;
              i.edit_paid = [];
              i.edit_received = [];
              i.sales.forEach((v)=>{
                i.edit_sales.push(v.uid)
              });
              i.business.forEach((v)=>{
                i.edit_business.push(v.uid)
              });
            });
            this.view.tableData = data.project_list;
          },this.view
        )
      },
      btnLookLog(row) {
        let id = row.id
        let time = this.view.select.value
        this.$router.push({ path: '/log/' +id + '/' +time })
      },
      getDate(){
        let myDate = new Date();
        let yy = myDate.getFullYear();
        let mm = PrefixInteger(myDate.getMonth() + 1,2);

        for (let i = 1; i <= 12; i++) {
          this.view.select.options.push({
            value:(yy-1)+'-'+PrefixInteger(i,2),
            label:(yy-1)+'-'+PrefixInteger(i,2)
          })
        }

        for (let i = 1; i <= 12; i++) {
          this.view.select.options.push({
            value:yy+'-'+PrefixInteger(i,2),
            label:yy+'-'+PrefixInteger(i,2)
          })
        }

        let time = this.$route.query.time;
        if(time){
          this.view.select.value = time
        }else{
          this.view.select.value = yy+'-'+ mm;
        }
        function PrefixInteger(num, length) {
          return (Array(length).join('0') + num).slice(-length);
        }
      },
      exportExcel(){
        let uid = JSON.parse(localStorage.login).uid;
        let date = this.view.select.value;
        let url = '/apis/v1/ouepm/project/export_excel?uid='+uid+'&year_month='+date;
        window.open(url)
      },
      submitEditProject(row,value,name){
        this.$invoke(
          '/project/edit_project',
          {
            uid : this.uid,
            project_id: row.id,
            field: name,
            value: value,

          },
          (data) => {
            this.$message({
              showClose:true,
              message:"成功"
            });
            this.$bus.$emit("OnListSubmit",true);
            this.getList()
          }
        );
      },
      submitEditMember(row,value,type){
        this.$invoke(
          '/project/edit_project_member',
          {
            uid : this.uid,
            project_id: row.id,
            uids: value,
            type: type,

          },
          (data) => {
            this.$message({
              showClose:true,
              message:"成功"
            });

            this.$bus.$emit("OnListSubmit",true);
            this.getList()
          }
        );
      },
      getAddFlag(){
        this.view.dialogFormVisible=false
        this.getList();
      },
      is_open(v1){

        let _if = false;
        if(v1.length>0){
          v1.forEach((i)=>{
            if(this.uid===i.uid){
              _if = true;
              return
            }
          })
        }
        return _if
      }
    }
  }
</script>
