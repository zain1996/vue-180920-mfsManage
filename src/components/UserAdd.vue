<template>
  <div class="warp">
    <el-form class="form" :model="form" :rules="rules" ref="form" label-width="80px" labelPosition="left">
      <el-row>
        <el-col :span="24">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="登陆邮箱" prop="email">
            <el-input v-model="form.email" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="分组" prop="role">
            <role-select v-model="form.role"></role-select>
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
    name: 'UserAdd',
    data () {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          callback();
        }
      };
      var validatePassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateRole = (rule, value, callback) => {
        if (value.is_business == 0 && value.is_sales == 0 && value.is_super == 0) {
          callback(new Error('请选择分组'));
        }else{
          callback();
        }
      };
      return {
        dialogFormVisible:false,
        form: {
          name: '',
          email: '',
          password: '',
          loading:false,
          role : {
            is_business : 0,
            is_sales : 0,
            is_super : 0,
          }
        },
        rules: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassWord, trigger: 'blur' }
          ]
          ,
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          role: [
            { validator: validateRole, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$invoke(
              '/member/save',
              {
                uid : '0',
                user_name : this.form.name,
                email : this.form.email,
                password : this.form.password,
                is_super: this.form.role.is_super,
                is_sales: this.form.role.is_sales,
                is_business: this.form.role.is_business
              },
              (data) => {
                this.$message({
                  showClose:true,
                  message:"成功"
                })
                setTimeout(()=>{
                  this.$emit('onAddFlag',data);
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
