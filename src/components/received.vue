<template>
    <div v-show="visible">
      <el-table
        :data="view"
        style="width: 100%"
        height="400"
      >
        <el-table-column align="center" label="记录时间">
          <template scope="scope">
            <span>{{scope.row.dateline | filterFun}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收款时间">
          <template scope="scope">
            <span>{{scope.row.receive_time | filterFun}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="金额">
          <template scope="scope">
            <span>{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注">
          <template scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-form class="form" :model="form" label-width="80px" labelPosition="left">
        <el-row>
          <el-col :span="24">
            <el-form-item  label="收款日期">
              <el-date-picker
                v-model="form.receive_date"
                type="date"
                format="yyyy-MM-dd hh:mm:ss"
                style="width:100%"
                @change="setDate"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="金额">
              <el-input v-model="form.money"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button style="width: 100%" @click="submit" type="primary">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

</template>

<script>

  import moment from 'moment'
  export default {

    name:'received',
    data() {
      return {
        visible:false,
        view :[],
        paid : this.value,
        form:{
          receive_date:'',
          edit_date:'',
          money:'',
          remark:'',
          project_id:'',
          uid:'',
        }
      }
    },
    props: ['project','uid'],
    methods:{
      submit(){
        this.$invoke(
          '/project/receive_money',
          {
            uid : this.uid,
            project_id: this.project,
            remark: this.form.remark,
            money: this.form.money,
            receive_date: this.form.edit_date,
          },
          (data) => {
            this.$message({
              showClose:true,
              message:"成功"
            });
            this.getReceived();
            this.$emit('changeReceived',data);
          }
        );
      },
      setDate(val) {
        this.form.edit_date = val ;
      },
      getReceived(){
        this.$invoke(
          '/project/receive_record',
          {
            uid : this.uid,
            project_id: this.project,
          },
          (data) => {
            this.view = data.receive_record_list
          }
        );
      },
    },
    watch: {
      '$parent.$parent.visible' : function(value){

        this.visible = value;

        if(value) {
          this.getReceived()
        }
      }
    },
    filters:{
      filterFun: function (value) {
        return moment(value).zone(value).format("YYYY-MM-DD HH:mm");
      }
    }
  }
</script>
<style lang="scss" scoped>
  .form{
    margin-top: 20px;
  }
</style>
