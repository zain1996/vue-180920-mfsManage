<template>
  <div v-show="visible" class="warp">
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
          <el-form-item label="密码">
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
    width:420px;
    height:500px;
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
    name: 'UserEdit',
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
      var validateRole = (rule, value, callback) => {
        if (value.is_business == 0 && value.is_sales == 0 && value.is_super == 0) {
          callback(new Error('请选择分组'));
        }else{
          callback();
        }
      };
      return {
        visible:false,
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
          ]
          ,
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          role: [
            { validator: validateRole, trigger: 'blur' }
          ],
        },
        myUid:JSON.parse(localStorage.login).uid
      };
    },
    props: ['editUid'],
    watch: {
      '$parent.$parent.visible' : function(value){

        this.visible = value;

        if(value) {
          this.getUserInfo()
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$invoke(
              '/member/save',
              {
                uid : this.editUid,
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
                if(this.editUid===this.myUid){
                  this.onMychangeInfo({
                    uid : this.editUid,
                    name : this.form.name,
                    email : this.form.email,
                    password : this.form.password,
                    is_super: this.form.role.is_super,
                    is_sales: this.form.role.is_sales,
                    is_business: this.form.role.is_business
                  });
                }
                this.$emit('changeUserEdit',data);
                this.$parent.$parent.visible=false
              },
              this.form
            );
          } else {
            return false;
          }
        });
      },
      getUserInfo(){
        this.$invoke(
          '/member/info',
          {
            uid : this.editUid
          },
          (data) => {
            this.form.name = data.name
            this.form.email = data.email
            this.form.role = {
              is_super:data.is_super,
              is_sales:data.is_sales,
              is_business:data.is_business
            }
          },
          this.form
        );
      },
      onMychangeInfo(data){
        this.$setUserInfo(data)
        this.$bus.$emit("onUpdateUserInfo", data);
      }
    }
  }
</script>
