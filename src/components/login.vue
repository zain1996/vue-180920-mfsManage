<template>
  <section>
    <div class="warp">
      <el-form :model="form" :rules="rules" ref="form" label-width="50px" labelPosition="left">
        <el-row>
          <el-col :span="24">
            <div class="title">MoreFans应援项目管理系统</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" @keyup.enter.native="submitForm('form')" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" @keyup.enter.native="submitForm('form')" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="login-btn" :span="24">
            <el-button style="width: 100%" :loading="form.loading" type="primary" @keyup.enter.native="submitForm('form')" @click="submitForm('form')">登陆</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="edit-btn":span="24">
            <el-button style="float: right" type="text" @click="$go('/PasswordEdit')">修改密码</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </section>
</template>
<style lang="scss" scoped>
  section {
    display: flex;
    height:75%;
    justify-content: center;
    align-items: center;

    .warp{
      width:360px;
      margin: auto;
      padding: 35px;
      border: 1px solid #ccc;

      border-radius: 5px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;

      box-shadow: 0 0 25px #cac6c6;

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
        text-align: center;
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
    name: 'login',
    data () {
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
      return {
        form: {
          email: '',
          password: '',
          loading:false
        },
        rules: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassWord, trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
      if(localStorage.loginName){
        this.form.email=localStorage.loginName
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$invoke(
              '/member/login',
              {
                email : this.form.email,
                password: this.form.password
              },
              (data) => {
                localStorage.login = JSON.stringify(data)
                localStorage.loginName = this.form.email
                this.$router.push({ path: 'list' })
              },
              this.form
            );
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>
