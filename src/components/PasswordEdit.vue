<template>
  <section>
    <div class="warp">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" labelPosition="left">
        <el-row>
          <el-col :span="24">
            <div class="title">修改密码</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" auto-complete="off" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="原密码" prop="oldPassWord">
              <el-input type="password" v-model="form.oldPassWord" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="newPassWord">
              <el-input type="password" v-model="form.newPassWord" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="btn">
              <el-button @click="$go('/login')">取消</el-button>
              <el-button :loading="form.loading" type="primary" @click="submitForm('form')">确认</el-button>
            </div>
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
    name: 'editpass',
    data () {
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }
        else {
          callback();
        }
      };
      var validatePassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else {
          callback();
        }
      };
      return {
        form: {
          email: '',
          newPassWord: '',
          oldPassWord: '',
          loading:false
        },
        rules: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          newPassWord: [
            { validator: validatePassWord, trigger: 'blur' }
          ],
          oldPassWord: [
            { validator: validatePassWord, trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$invoke(
              '/member/edit_password',
              {
                email : this.form.email,
                new_password: this.form.newPassWord,
                original_password: this.form.oldPassWord
              },
              () => {
                this.$router.push({ path: 'login' })
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
      }
    }
  }
</script>
