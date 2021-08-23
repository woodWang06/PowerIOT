<template>

  <div class="login_container">
    <div class="contents2">
      <div class="contents_title">修改密码</div>
      <div class="contents_box">
        <el-form ref="userData" :model="userData" :rules="rule" label-width="40px">
          <el-form-item prop="oldPswd">
            <el-input class="login_input" type="password" placeholder="请输入原登录密码" v-model="userData.oldPswd" autocomplete="off">
              <template slot="prepend"><i class="icon el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="newPswd">
            <el-input class="login_input" type="password" placeholder="请输入新登录密码" v-model="userData.newPswd" prop="newPswd">
              <template slot="prepend"><i class="icon el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="okPswd">
            <el-input class="login_input" type="password" placeholder="确定新登录密码" v-model="userData.okPswd" prop="okPswd">
              <template slot="prepend"><i class="icon el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button class="login_input botn" type="primary" size='small' @click="submitForm('userData')">修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="car">
      <img src="./../../assets/center/password.png" alt="">
    </div>
  </div>

</template>
<script>
import api from 'api';
import http from 'http';
import { setCookie, setLoc, getLoc, setSen, getSen } from 'utils'
import { firstZMofen } from 'utils/rules';
import { mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入新密码'));
      } else if(value === this.userData.oldPswd) {
        callback(new Error('新密码与旧密码一致'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入新密码'));
      } else if(value != this.userData.newPswd) {
        callback(new Error('新密码不一致'));
      } else {
        callback();
      }
    };
    return {
      count: 0,
      timer: null,
      loginModel: 1,
      checked: false,
      accountCode: "",
      userData: {
        // username: '',
        oldPswd: '',
        newPswd: "",
      },
      rule: {
        oldPswd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ],
        newPswd: [
          { validator: validatePass2, trigger: 'blur' }],
        okPswd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    ...mapGetters('login', ['getAccountNameCn']),
  },
  created() {
    this.accountCode = this.getAccountNameCn.accountCode
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if(keycode == 13) {
        that.login();// 登录方法名
        return false;
      }
    };

  },
  mounted() {

  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.pwdUpdate()

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    pwdUpdate() {
      let obj = {
        accountCode: this.accountCode,
        newPassword: this.userData.newPswd,
        oldPassword: this.userData.oldPswd,
      }
      http(api.pwdUpdate, obj).then(res => {
        if(res) {
          this.$alert('修改密码成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/');
            }
          })
        }
      })
    }

  },

}
</script>  
<style lang="less" scoped>
.contents_box {
  width: 70%;
  margin: 0 auto;
}
.contents2 {
  text-align: center;
  .contents_title {
    text-align: center;
    color: #fff;
    font-size: 30px;
    margin-bottom: 35px;
  }

  &_box {
    div {
      width: 88%;

      span {
        color: #fff;
      }

      .login_input {
        width: 100%;
      }

      .error_message {
        width: 100%;
        margin: 4px 0;
        height: 16px;

        span {
          color: #f56c6c;
          font-size: 12px;
        }
      }
    }

    .rember_password {
      margin-bottom: 8px;
    }
  }
}

.login_container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .car {
    width: 65%;
    display: flex;
    align-items: center;

    img {
      align-self: flex-end;
      width: 100%;
      height: auto;
    }
  }

  .contents2 {
    background: rgba(255, 255, 255, 1);
    width: 35%;
    padding: 72px 52px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 200px;
    .contents_title {
      color: #428ccd;
      font-size: 25px;
      margin-bottom: 80px;
    }
  }
}

.botn {
  width: 300px;
  margin-top: 100px;
}
</style>