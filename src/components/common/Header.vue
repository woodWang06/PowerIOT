<template>
  <div class="header">

    <div class="logo" @click="gohome">
      <img src="../../assets/newW/LOGO.png">
      <span v-if="getEntrance=='status'">{{getStationInfo.stationName}}</span>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="t_r_info">{{sday}}</div>
        <div class="t_r_info2" v-if="getEntrance=='status'">
          <el-tooltip class="item" effect="dark" content="故障" placement="bottom-end">
            <div class="count" @click="goAlarm(0)">
              <img src="../../assets/newW/headerIcon2.png">
              <span v-if="readCount.fault!=0">{{readCount.fault}}</span>
            </div>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="预警" placement="bottom-end">
            <div class="count" @click="goAlarm(1)">
              <img src="../../assets/newW/headerIcon1.png">
              <span v-if="readCount.warning!=0">{{readCount.warning}}</span>
            </div>
          </el-tooltip>
        </div>
        <el-dropdown size="middle" class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{getAccountNameCn.accountNameCn}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginhome">返回主页</el-dropdown-item>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
            <el-dropdown-item command="loginUser">个人信息</el-dropdown-item>
            <!-- <el-dropdown-item command="password">修改密码</el-dropdown-item> -->
          </el-dropdown-menu>

        </el-dropdown>
      </div>
    </div>
  </div>

</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import bus from '../common/bus';
import { Dropdown, DropdownMenu, DropdownItem, Tooltip } from 'element-ui';
import dayjs from 'dayjs'
import api from 'api';
import http from 'http'

let padaDate = function(value) {
  return value < 10 ? '0' + value : value;
};
export default {
  components: {
    elDropdown: Dropdown,
    elDropdownMenu: DropdownMenu,
    elDropdownItem: DropdownItem,
    elTooltip: Tooltip
  },
  data() {
    return {
      date: new Date(),
      timeId: '',
      collapse: false,
      fullscreen: false,
      name: 'yatong',
      message: 2,
      dialog: false,
      stationCode: '',
      readCount: {},
      sday: '',
    };
  },
  computed: {
    ...mapGetters('login', ['getStationInfo']),
    ...mapGetters('login', ['getAccountNameCn']),
    ...mapGetters('login', ['getStationCode']),
    ...mapGetters('login', ['getReadCount']),
    ...mapGetters('login', ['getEntrance']),
    username() {
      // let username = this.getLoginMsg.user.realName;
      let username = '';
      return username ? username : this.name;
    }
  },
  created() {
    this.stationCode = this.getStationCode
  },

  methods: {
    ...mapMutations('login', ['setReadCount']),
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if(command == 'loginout') {
        localStorage.removeItem('ms_username');
        sessionStorage.clear();
        this.$router.push('/');
      } else if(command == 'loginhome') {
        this.$router.push('/center');
      } else if(command == 'loginUser') {
        this.$router.push('/userInfo');
      } else if(command == 'password') {
        this.$router.push('/password');
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if(this.fullscreen) {
        if(document.exitFullscreen) {
          document.exitFullscreen();
        } else if(document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if(element.requestFullscreen) {
          element.requestFullscreen();
        } else if(element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    gohome() {
      this.$router.push('/center');
    },
    isReadCount() {
      http(api.getBreakerFaultWarningStation, { stationCode: this.stationCode }).then(res => {
        this.readCount = res
        this.setReadCount(this.readCount)
      });

    },

    goAlarm(str) {
      this.$router.push(
        {
          path: "/faultMag",
          query: {
            activeName: str,
          }
        }
      );
    },
    goAlarm2() {
      this.$router.push('/faultMag');
    }
  },
  watch: {
    getReadCount: {
      handler(val) {
        this.readCount = this.getReadCount;
      },
      // immediate: true,
      deep: true
    },

  },
  mounted() {
    if(this.getEntrance == 'status') {
      this.isReadCount();
    }
    if(document.body.clientWidth < 500) {
      this.collapseChage();
    }
    var _this = this;
    this.timeId = setInterval(function() {
      _this.sday = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
    // timer = setInterval(() => { this.time_show = new Date().toLocaleString() }, 1000);
    // this.initmap();
  },
  beforeDestroy() {

    clearInterval(this.timeId);
    this.timeId = null
  },

};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 63px;
  font-size: 2.2rem;
  color: #b1bbc6;
  background: #fff;
  border-radius: 10px 10px 0px 0;
}
.header .logo {
  float: left;
  line-height: 60px;
  user-select: none;
  font-size: 1.4rem;
}

.header .logo img {
  line-height: 60px;
  width: 100px;
  vertical-align: top;
  margin: 23px 30px;
}
.header-right {
  float: right;
  padding-right: 60px;
}
.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 2.4rem;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #b1bbc6;
}
.btn-bell .el-icon-bell {
  color: #b1bbc6;
}
.user-name {
  margin-left: 20px;
  margin-top: 3px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #b1bbc6;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.icons {
  width: 20px;
  vertical-align: middle;
  margin-right: 15px;
  cursor: pointer;
}
.count {
  position: relative;
  font-size: 1.4rem;
  cursor: pointer;
  margin-top: 3px;
  display: inline-block;
}
.count img {
  vertical-align: middle;
  margin-left: 5px;
  width: 35px;
  height: 35px;
}
.count span {
  font-size: 0.8rem;
  position: absolute;
  top: 0px;
  right: 8px;
  background: #f56c6c;
  min-width: 16px;
  height: 16px;
  border-radius: 50%;
  text-align: center;
  color: #fff;
}
.t_r_info {
  font-size: 1.4rem;
  color: #b1bbc6;
  padding: 0 20px;
  line-height: 15px;
  border-right: 1px solid #a7a1ff;
}
.t_r_info {
  font-size: 1.4rem;
  color: #b1bbc6;
  padding: 0 20px;
  line-height: 15px;
  border-right: 1px solid #a7a1ff;
}
.t_r_info2 {
  margin-left: 10px;
}
</style>
