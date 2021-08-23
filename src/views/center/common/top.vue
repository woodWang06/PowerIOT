<template>
  <div class="top ">
    <div>
      <div class="toptitle">
        <span>智 能 云 配 电 管 理 系 统</span>
      </div>
      <div class="buttsonsp2">
        <span class="logo">
          <img src="../../../assets/center/logo.png">
        </span>
        <span class="user-name">
          <span class="el-dropdown-link">
            {{sday}}
          </span>
          <span class="el-dropdown-link" v-if="wearther&&wearther.weather"><img src="../../../assets/new/weathicon.png"></span>
          <span class="el-dropdown-link2" v-if="wearther&&wearther.weather"> {{wearther.weather}} </span>
          <span class="el-dropdown-link2" v-if="wearther&&wearther.temperature">{{wearther.temperature}}℃ </span>
        </span>
      </div>
      <div class="buttsonsp" v-if="falg=='yes'">
        <div class="user-name">
          <span class="el-dropdown-link" @click="chird">
            <el-tooltip class="item" effect="dark" content="项目管理" placement="bottom">
              <img src="../../../assets/new/homeIcon5.png">
            </el-tooltip>
          </span>
          <span v-if="getAccountNameCn.consolePermissionList&&getAccountNameCn.consolePermissionList.length>0" class="el-dropdown-link" @click="goSys">
            <el-tooltip class="item" effect="dark" content="系统管理" placement="bottom">
              <img src="../../../assets/new/homeIcon2.png">
            </el-tooltip>
          </span>
          <span class="el-dropdown-link" @click="goOut">
            <el-tooltip class="item" effect="dark" content="编辑自定义板块" placement="bottom">
              <img src="../../../assets/new/homeIcon3.png">
            </el-tooltip>
          </span>
          <span class="el-dropdown-link">
            <el-dropdown size="middle" class="user-name " trigger="click" @command="handleCommand">
              <span>
                <img src="../../../assets/new/homeIcon1.png">
              </span>
              <el-dropdown-menu slot="dropdown" class="dialogSheng2">
                <el-dropdown-item command="loginUser">个人信息</el-dropdown-item>
                <!-- <el-dropdown-item command="password">修改密码</el-dropdown-item> -->
                <!-- <el-dropdown-item command="loginhome">在线时间</el-dropdown-item> -->
                <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" class="dialogSheng" :show-close='false' width="450px">
      <div slot="title" class="dialog-head">
        <img src="../../../assets/new/modalTop.png"> 账户信息
      </div>
      <el-form :model="form" id="login">
        <el-form-item>
          <el-input class="login_input" v-model="form.accountName" disabled>
            <template slot="prepend"><span><img src="../../../assets/new/modalicon5.png">账号</span></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="login_input" v-model="form.accountNameCn" disabled>
            <template slot="prepend"><span><img src="../../../assets/new/modalicon4.png">姓名</span></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="login_input" v-model="form.contactTelephone" disabled>
            <template slot="prepend"><span><img src="../../../assets/new/modalicon3.png">手机</span></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="login_input" v-model="form.email" disabled>
            <template slot="prepend"><span><img src="../../../assets/new/modalicon2.png">邮箱</span></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="login_input" v-model="form.companyName" disabled>
            <template slot="prepend"><span><img src="../../../assets/new/modalicon1.png">公司</span></template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="langbutton" @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="langbutton" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" class="dialogSheng" :show-close='false' width="400px">
      <div slot="title" class="dialog-head">
        在线时间
      </div>
      <div class="radioBox">
        <el-radio-group v-model="radio" v-if="listlogin.length>0">
          <el-radio v-for="item in listlogin" v-if="item.dictKey!='0'" :label="item.dictValue">{{item.dictValue}}分钟平台无人操作则自动下线</el-radio>
          <el-radio :label="listlogin[0].dictValue">永不下线</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="langbutton" @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button class="langbutton" type="primary" @click="oktime">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
import { Dialog, Tooltip, Dropdown, DropdownMenu, DropdownItem, } from 'element-ui';
import weather from '../../commonScript/weather';
export default {
  mixins: [weather],
  data() {
    return {
      timeId: '',
      sday: '',
      wearther: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: '2115645464'
      },
      radio: '0',
      form: {},
      listlogin: [],
    }
  },
  components: {
    elDialog: Dialog,
    elTooltip: Tooltip,
    elDropdown: Dropdown,
    elDropdownMenu: DropdownMenu,
    elDropdownItem: DropdownItem,
  },
  created() {
    if(this.getAccountNameCn.oprMin) {
      this.radio = JSON.stringify(this.getAccountNameCn.oprMin)
    }

  },
  mounted() {
    var _this = this;
    this.timeId = setInterval(function() {
      _this.sday = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
    this.getAccountDetail();
    // this.queryOprMinList()
    // this.getLocation();

  },
  beforeDestroy() {
    clearInterval(this.timeId);
    this.timeId = null;
  },
  methods: {
    ...mapMutations('login', ['setEntrance']),
    ...mapMutations('login', ['setAccountNameCn']),

    // getLocation() {
    //   http(api.getLocation).then(res => {
    //     if(res.content.address) {
    //       this.getAcode(res.content.address)
    //     }
    //   })
    // },
    // getAcode(address) {
    //   var that = this;
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('GET', '  https://restapi.amap.com/v3/geocode/geo?address=' + address + '&key=d945e217133f6f19e985807f38cd3e05', true);
    //   xhr.onreadystatechange = function() {
    //     // readyState == 4说明请求已完成
    //     if(xhr.readyState == 4) {
    //       if(xhr.status == 200 || xhr.status == 304) {
    //         that.getTianQi(JSON.parse(xhr.responseText).geocodes[0])
    //       }
    //     }
    //   }
    //   xhr.send();

    // },
    // getTianQi(item) {
    //   var that = this;
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('GET', 'https://restapi.amap.com/v3/weather/weatherInfo?city=' + item.adcode + '&key=d945e217133f6f19e985807f38cd3e05', false);
    //   xhr.onreadystatechange = function() {
    //     // readyState == 4说明请求已完成
    //     if(xhr.readyState == 4) {
    //       if(xhr.status == 200 || xhr.status == 304) {
    //         that.wearther = JSON.parse(xhr.responseText).lives[0]
    //       }
    //     }
    //   }
    //   xhr.send();
    // },
    goSys() {
      this.setEntrance('consloe')
      this.$router.push('/welcom');
    },
    goOut() {
      this.$router.push('/centerSet');
    },
    handleCommand(command) {
      if(command == 'loginout') {
        localStorage.removeItem('ms_username');
        sessionStorage.clear();
        this.$router.push('/');
      } else if(command == 'loginhome') {
        this.queryOprMinList();
        this.dialogFormVisible2 = true
      } else if(command == 'loginUser') {
        this.dialogFormVisible = true
      } else if(command == 'password') {
        this.$router.push('/password');
      }
    },
    getAccountDetail() {
      http(api.getAccountDetail).then(res => {
        this.form = res
      });
    },
    queryOprMinList() {
      http(api.queryOprMinList).then(res => {
        // debugger;
        this.listlogin = res;
        this.listlogin.forEach(val => {
          if(val.deleteFlag == 1) {
            this.radio = val.dictValue
          }
        })
      });
    },
    oktime() {
      http(api.updateAccountOprMin, { 'oprMin': this.radio }).then(res => {
        this.dialogFormVisible2 = false;
        this.getAccountNameCn.oprMin = this.radio
        this.setAccountNameCn(this.getAccountNameCn)
        this.$message({
          type: "success",
          message: "修改成功"
        });
      });

    },
    chird() {
      this.$parent.dialogShow('6');
    }
  },
  props: {
    getAccountNameCn: {
      type: Object,
    },
    falg: {
      type: String,
    },
    // user: {
    //   type: Object,
    // }
  },
}
</script>
<style scoped lang="less" media="screen">
@import "./../less/login.less";
.top {
  width: 100%;
  position: relative;
  height: 6rem;
  .logo {
    float: left;
    text-align: left;
    img {
      width: 100px;
      margin: 8px 20px;
    }
  }
  .toptitle {
    width: 100%;
    height: 8rem;
    line-height: 6rem;
    background: url(../../../assets/new/top_titl.png) no-repeat;
    background-size: 100% 100%;
    span {
      font-size: 2.8rem;
      color: #fff;
      font-weight: bold;
    }
  }
  .buttsonsp2 {
    position: absolute;
    left: 20px;
    top: 1rem;
    line-height: 1rem;
    font-size: 1.2rem;
    color: #fff;
    line-height: 3rem;
  }
  .buttsonsp {
    position: absolute;
    right: 0px;
    top: 1rem;
    line-height: 1rem;
  }
  .user-name {
    padding-right: 40px;
    line-height: 30px;
    font-size: 1.3rem;
    .el-dropdown-link {
      cursor: pointer;
      color: #86a6d9;
      margin-left: 20px;
      img {
        vertical-align: middle;
        margin-left: 20px;
        width: 22px;
      }
    }
    .el-dropdown-link2 {
      cursor: pointer;
      color: #86a6d9;
      margin-left: 5px;
    }
  }
}
.radioBox {
  text-align: left;
  margin-left: 20px;
  // line-height: 4rem;
  label {
    text-align: left;
    margin-left: 20px;
    line-height: 4rem;
  }
}
</style>