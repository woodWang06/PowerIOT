<template>
  <div class="container content" id="login">
    <div class="main">
      <div class="contents_title">
        <img style="width:80%" src="../../assets/new/loginpir.png">
      </div>
      <div class="contentsout">
        <div class="contents">
          <div class="contents_box">
            <div class="contents_title2">
              <span :class="isactive=='1'?'active':''" @click="tab('1','login2')"> {{$t("login.userlogin")}}</span>
              <span>|</span>
              <span :class="isactive=='2'?'active':''" @click="tab('2','login')"> {{$t("login.moblogin")}}</span>
            </div>
            <div v-if="isactive==1">
              <el-form ref="login" class="bigMargin" :model="userData" :rules="rule" autocomplete="off">
                <el-form-item prop="accountName">
                  <el-input class="login_input" autocomplete="off" :placeholder="$t('login.usePlaceholder')" v-model="userData.accountName">
                    <template slot="prepend"><img src="../../assets/new/loginIcon2.png"></template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="accountPassword">
                  <el-input class="login_input" autocomplete="off" type="password" :placeholder="$t('login.passwordPlaceholder')" v-model="userData.accountPassword">
                    <template slot="prepend"><img src="../../assets/new/loginIcon1.png"></template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="login_input langbutton" @click="login"> {{$t("login.login")}}</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="isactive==2">
              <el-form ref="login2" class="bigMargin" :model="userData2" :rules="rule" autocomplete="off">
                <el-form-item prop="mobile">
                  <el-input class="login_input" autocomplete="new-password" :placeholder="$t('login.mobPlaceholder')" v-model="userData2.mobile">
                    <template slot="prepend"><img src="../../assets/new/loginIcon3.png"></template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                  <el-input class="login_input" autocomplete="new-password" :placeholder="$t('login.codePlaceholder')" v-model="userData2.captcha">
                    <template slot="prepend"><img src="../../assets/new/loginIcon4.png"></template>
                    <template slot="append">
                      <span class="code" v-if="count">{{count}}s后重新获取</span>
                      <span class="code" @click="getCode" v-else>点击获取验证码</span>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="langbutton login_input" @click="login2"> {{$t("login.login")}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible2" class="dialogSheng" :show-close='false' width="400px">
      <div slot="title" class="dialog-head">
        <img src="../../assets/new/loginerror.png"> 密码错误
      </div>
      <div class="radioBox">
        您已连续5次输错密码，<br> 您可以选择手机登录或联系良信电器销售找回密码。
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="langbutton" @click="gomoblie">手机登录</el-button>
        <el-button class="langbutton" type="primary" @click="dialogFormVisible2 = false">我已了解</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from 'api';
import http from 'http';
import { mapMutations } from 'vuex';
import { firstZMofen, checkLogin, checkPhone } from 'utils/rules';
import { Dialog, } from 'element-ui';
export default {
  data() {
    return {
      checked: false,
      userData: {
        accountName: "",
        accountPassword: ''
      },
      dialogFormVisible2: false,
      userData2: {
        mobile: '',
        captcha: ''
      },
      count: 0,
      rule: {
        accountName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },

        ],
        accountPassword: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { validator: checkLogin, trigger: 'blur' },
        ],
        mobile: [
          // { message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      rule2: {

      },
      isactive: '1',
      timer: null,
    }
  },
  computed: {
  },
  components: {
    elDialog: Dialog,
  },
  created() {
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
    // ...mapMutations('login', ['setIdenityInfo']),
    ...mapMutations('login', ['setToken']),
    ...mapMutations('login', ['setStationCode']),
    ...mapMutations('login', ['setAccountNameCn']),
    ...mapMutations('login', ['setCustomizeStationList']),
    ...mapMutations('login', ['setCustomizeTopList']),
    //获取登录信息
    login() {

      this.$refs.login.validate((valid) => {
        if(valid) {
          let pwd = ''
          pwd = hex_md5(this.userData.accountPassword);
          let obj = {
            accountName: this.userData.accountName,
            accountPassword: pwd
          };
          http(api.loginByPassword, obj).then(res => {
            if(res.type) {
              this.dialogFormVisible2 = true;
            } else {
              this.setToken(res.token);
              this.setAccountNameCn(res);
              this.setCustomizeStationList(res.customizeStationList);
              this.setCustomizeTopList(res.customizeTopList)
              this.$router.push({ name: 'center' });
            }
          })
        }
      })
    },
    gomoblie() {
      this.isactive = '2';
      this.dialogFormVisible2 = false
    },
    tab(num, formName) {
      this.$refs[formName].resetFields();
      this.isactive = num
    },
    getCode() {
      const TIME_COUNT = 60;
      if(!this.userData2.mobile) {
        this.$message.error('请输入手机号');
        return;
      }
      http(api.getCaptcha, { mobile: this.userData2.mobile }).then(res => {
        this.$message.success('验证码已发送，请在手机中查看');
      })
      if(!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if(this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    //获取登录信息
    login2() {
      let obj = {
        captcha: this.userData2.captcha,
        mobile: this.userData2.mobile
      };
      this.$refs.login2.validate((valid) => {
        if(valid) {
          http(api.loginByMobile, obj).then(res => {
            this.setToken(res.token);
            this.setAccountNameCn(res);
            this.$router.push({ name: 'center' });
          })
          return;
        }
      })
    },
  },

}
</script>  
<style lang="less" scoped>
@import "./less/login.less";
.contents_title {
  width: 62%;
  text-align: left !important;
  padding: 20px;
  min-width: 200px;
  img {
    width: 200px;
  }
}
.radioBox {
  color: #fff;
  text-align: center;
}
</style>