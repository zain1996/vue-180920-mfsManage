<template>
  <div class="warp">
    <el-form class="form" :model="form" :rules="rules" ref="form" label-width="80px" labelPosition="left">
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="project_name">
            <project_name v-model="form.project_name"></project_name>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="应收款" prop="receivables">
            <receivables v-model="form.receivables"></receivables>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="销售" prop="sales">
            <sales v-model="form.sales" :list="true"></sales>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="商务" prop="business">
            <business v-model="form.business" :list="true"></business>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目时间" prop="project_date">
            <project_date v-model="form.project_date"></project_date>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目备注" prop="remark">
            <remark v-model="form.remark"></remark>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="login-btn" :span="24">
          <el-button style="width: 100%" :loading="form.loading" type="primary" @click="submitForm('form')">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
  .warp{
    .form{
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      .login-btn {
        padding-top: 15px;
        width:100%;
      }

      .edit-btn {
        padding-top:10px;
        float: right;
      }
      .title{
        display: block;
        width:100%;
        margin-bottom: 40px;
        text-align: left;
      }
      .btn{
        margin-top: 10px;
        text-align: center;
        .el-button{
          width:100px;
        }
      }
    }
  }
</style>
<script>

  export default {
    name: 'add',
    data () {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入项目名称'));
        } else {
          callback();
        }
      };
      var validateRemark = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入项目备注'));
        } else {
          callback();
        }
      };
      var validateSales = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择商务人员'));
        } else {
          callback();
        }
      };
      var validateReceivables = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入应收款'));
        } else {
          callback();
        }
      };
      var validateBusiness = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择销售人员'));
        } else {
          callback();
        }
      };
      var validateProjectDate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入项目时间'));
        } else {
          callback();
        }
      };
      return {
        form: {
          project_name: '',
          remark: '',
          sales: {},
          receivables: '',
          business: {},
          project_date: '',
        },
        rules: {
          project_name: [
            { validator: validateName, trigger: 'blur' }
          ],
          remark: [
            { validator: validateRemark, trigger: 'blur' }
          ],
          sales: [
            { validator: validateSales, trigger: 'blur' }
          ],
          receivables: [
            { validator: validateReceivables, trigger: 'blur' }
          ],
          business: [
            { validator: validateBusiness, trigger: 'blur' }
          ],
          project_date: [
            { validator: validateProjectDate, trigger: 'change' }
          ]
        },
        uid:JSON.parse(localStorage.login).uid
      };
    },
    props:['show'],
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$invoke(
              '/project/add_project',
              {
                uid : this.uid,
                project_name: this.form.project_name,
                remark: this.form.remark,
                sales: this.form.sales,
                receivables: this.form.receivables,
                project_date: this.form.project_date,
                business: this.form.business,
              },
              (data) => {
                this.$message({
                  showClose:true,
                  message:"成功"
                })
                setTimeout(()=>{
                  this.$emit('add',data);
                },1000)
              }
            );
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
