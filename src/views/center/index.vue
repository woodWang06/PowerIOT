<template>
  <div class="container2 contentCenter">
    <TopHeader class="top" :getAccountNameCn='getAccountNameCn' :user='user' falg='yes'></TopHeader>
    <div class="main">
      <div class="main-center ">
        <div class="ml-top newbox " style="overflow:hidden">
          <!-- <div class="langbuttonBox">
            <el-button class="langbutton2 buntton" @click="dialogShow('5')">主站按钮</el-button>
          </div> -->
          <maps v-if='overSize==1'>
          </maps>
        </div>
        <div class="ml-bottom newbox " style="overflow:hidden">
          <div class="m-c">
            <div @click="dialogShow('1')">
              <img v-if="obj2.offline&&obj2.offline!='0'" src="../../assets/new/c-bicony3.png">
              <img v-else src="../../assets/new/c-bicon1.png">
              <span class="posNum1" v-if="obj2.offline&&obj2.offline!='0'">{{obj2.offline}}</span>
              <p>离线</p>
            </div>
            <div @click="dialogShow('2')">
              <img v-if="obj1.warning&&obj1.warning!='0'" src="../../assets/new/c-bicony2.png">
              <img v-else src="../../assets/new/c-bicon2.png">
              <span class="posNum" v-if="obj1.warning&&obj1.warning!='0'">{{obj1.warning}}</span>
              <p>预警</p>
            </div>
            <div @click="dialogShow('3')" class="toppad">
              <img v-if="obj1.fault&&obj1.fault!='0'" src="../../assets/new/c-bicony1.png">
              <img v-else src="../../assets/new/c-bicon3.png">
              <span class="posNum" v-if="obj1.fault&&obj1.fault!='0'">{{obj1.fault}}</span>
              <p>故障</p>
            </div>
            <div @click="dialogShow('4')">
              <img v-if="obj3.notHandle&&obj3.notHandle!='0'" src="../../assets/new/c-bicony2.png">
              <img v-else src="../../assets/new/c-bicon4.png">
              <span class="posNum" v-if="obj3.notHandle&&obj3.notHandle!='0'">{{obj3.notHandle}}</span>
              <p>运维</p>
            </div>
            <div @click="dialogShow('5')"><img src="../../assets/new/c-bicon5.png">
              <p>历史</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ===============================1======================== -->
    <div class="boxs" :class="'absolut'+obj.falg1" v-if="obj.falg1!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon1.png"> 最新5条故障记录
      </div>
      <div class="chardS2 listPad">
        <list :breakerFaultList="falg1List" flag='1' v-if="overSize=='1'"></list>
      </div>
    </div>
    <!-- ===============================2======================== -->
    <div class="boxs" :class="'absolut'+obj.falg2" v-if="obj.falg2!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon2.png"> 最新5条预警记录
      </div>
      <div class="chardS2  listPad">
        <list :breakerFaultList="falg2List" flag='2' v-if="overSize=='1'"></list>
      </div>
    </div>
    <!-- ===============================3======================== -->
    <div class="boxs" :class="'absolut'+obj.falg3" v-if="obj.falg3!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon3.png"> 最新5条工单记录
      </div>
      <div class="chardS2 ">
        <list :breakerFaultList="falg3List" flag='3' v-if="overSize=='1'"></list>
      </div>
    </div>
    <!-- ===============================4======================== -->
    <div class="boxs  boxborder" :class="'absolut'+obj.falg4" v-if="falg4List.xlist&&falg4List.xlist.length>0">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon4.png"> 设备趋势
      </div>
      <div class="chardS2">
        <lines :datas="falg4List" unit='台' leftng='10%' v-if="overSize=='1'"></lines>
      </div>
    </div>
    <!-- ===============================9======================== -->
    <div class="boxs " :class="'absolut'+obj.falg5" v-if="obj.falg5!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon5.png"> 设备统计
      </div>
      <div class="chardS2">
        <ring :datas="falg5List" v-if="falg5List.length>0&&overSize=='1'"></ring>
      </div>
    </div>
    <!-- ===============================9======================== -->
    <div class="boxs " :class="'absolut'+obj.falg6" v-if="obj.falg6!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon6.png"> 设备状态
      </div>
      <div class="chardS2 flexC">
        <listStatus :datas="falg6List" v-if="overSize=='1'"></listStatus>
      </div>
    </div>
    <!-- ===============================2======================== -->
    <div class="boxs boxborder" :class="'absolut'+obj.falg7" v-if="obj.falg7!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon7.png"> 能耗预测
      </div>
      <div class="chardS2">
        <lines :datas="falg7List" unit='kW·h' leftng='16%' v-if="falg7List.xlist&&falg7List.xlist.length>0&&overSize=='1'"></lines>
      </div>
    </div>
    <!-- ===============================3======================== -->
    <div class="boxs boxborder" :class="'absolut'+obj.falg8" v-if="obj.falg8!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon8.png"> 能耗同环比
        <span class="fr">{{sday}}</span>
      </div>
      <div class="chardS2">
        <lines :datas="falg8List" unit="%" leftng='10%' v-if="falg8List.xlist&&falg8List.xlist.length>0&&overSize=='1'"></lines>
      </div>
    </div>
    <!-- ===============================4======================== -->
    <div class="boxs boxborder" :class="'absolut'+obj.falg9" v-if="obj.falg9!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon9.png"> 能耗曲线
      </div>
      <div class="chardS2">
        <lines :datas="falg9List" unit="kW·h" leftng='16%' v-if="falg9List.xlist&&falg9List.xlist.length>0&&overSize=='1'"></lines>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" class="dialogSheng" width="500px">
      <div slot="title " class="dialog-head">
        站点清单
      </div>
      <div class="radioBox" id="login">
        <el-input class="login_input" placeholder="输入项目名称" v-model="keywords" @blur="searchClick">
          <template slot="append">
            <div @click="searchClick"> 查询</div>
          </template>
        </el-input>
        <div class="listModal">
          <p>站点列表</p>
          <ul class="seamless-warps scrollCenter">
            <li v-for="(item,index) in points2" @click="gohome(item)">
              <span v-if="modaltype=='1'" class="listicon" :class="modaltype=='1'&&item.offlineCount!='0'?'gray':'green'">{{item.offlineCount}}</span>
              <span v-if="modaltype=='2'" class="listicon" :class="modaltype=='2'&&item.warningCount!='0'?'orgs':'green'">{{item.warningCount}}</span>
              <span v-if="modaltype=='3'" class="listicon" :class="modaltype=='3'&&item.faultCount!='0'?'red':'green'">{{item.faultCount}}</span>
              <span v-if="modaltype=='4'" class="listicon" :class="modaltype=='4'&&item.repairCount!='0'?'orgs':'green'">{{item.repairCount}}</span>
              <span v-if="modaltype=='5'||modaltype=='6'" class="listicon"></span>
              <span>{{item.stationName}}</span>
            </li>
          </ul>
        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import api from 'api';
import http from 'http';
import TopHeader from './common/top'
import maps from "./common/map";
import ring from "./common/ring2";
import lines from "./common/line";
import list from "./common/list";
import listStatus from "./common/listStatus";//
import { Dialog } from 'element-ui';
import { mapMutations, mapGetters } from 'vuex';
import { location } from "./js/Location";
// import ws from 'websocketjs';
import Speech from 'speak-tts';
import dayjs from 'dayjs';
export default {
  components: {
    TopHeader,
    maps,
    elDialog: Dialog,
    ring,
    lines,
    list,
    listStatus
  },
  data() {
    return {
      points: [],
      points2: [],
      dialogFormVisible: false,
      stationPop: {},
      overSize: '1',
      stationEnergy: {},
      // breakerFaultList: [],
      speech: null,
      obj: {
        falg1: '0',
        falg2: '0',
        falg3: '0',
        falg4: '0',
        falg5: '0',
        falg6: '0',
        falg7: '0',
        falg8: '0',
        falg9: '0',
      },
      keywords: '',
      CustomizeTopList: [],
      falg1List: [],
      falg2List: [],
      falg3List: [],
      falg4List: {},
      falg5List: [],
      falg6List: {},
      falg7List: {},
      falg8List: {},
      falg9List: {},
      obj1: {},
      obj2: {},
      obj3: {},
      sday: '',
      user: {},
      modaltype: '',
      optionsd: {
        1: 'faultTop5',
        2: 'warningTop5',
        3: 'repairTop5',
        4: 'deviceTrend',
        5: 'breakerGroupStat',
        6: 'breakerState',
        7: 'energyWeekTrend',
        8: 'energyMonthYyMm',
        9: 'energyTwoDayTrend',
      },
      timer: null,
    }
  },
  computed: {
    ...mapGetters('login', ['getAccountNameCn']),
    ...mapGetters('login', ['getCustomizeTopList']),
  },
  created() {

    // 

  },
  mounted() {
    this.speechInit();
    this.postion()
    this.searchClick();
    let that = this;
    this.timer = setInterval(function() {
      that.postion()
    }, 15000);
    window.addEventListener("resize", this.adder, true);


    // this.websocket();

  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null
    window.removeEventListener("resize", this.adder, true);
  },
  methods: {
    ...mapMutations('login', ['setEntrance']),
    ...mapMutations('login', ['setStationCode']),
    ...mapMutations('login', ['setStationInfo']),
    adder() {
      let self = this;
      return (() => {
        self.overSize = "2";
        setTimeout(function() {
          self.overSize = "1"
        }, 50);
      })();
    },
    speechInit() {
      let that = this
      this.speech = new Speech();
      // this.speech.setLanguage('zh-CN');
      this.speech.init({
        volume: 0.5,
        lang: "zh-CN",
        rate: 1,
        pitch: 1,
        //'voice':'Google UK English Male',
        //'splitSentences': false,
        listeners: {
          onvoiceschanged: voices => {
            console.log("Voices changed", voices);
          }
        }
      }).then(() => {
        console.log('语音播报初始化完成...')

      })
    },
    speak() {
      let text = '';
      if(this.obj1.fault && this.obj1.fault != '0') {
        text += '故障数量' + this.obj1.fault + '条'
      }
      if(this.obj1.warning && this.obj1.warning != '0') {
        text += '预警数量' + this.obj1.warning + '条'
      }
      this.speech.speak({ text: text }).then(() => {
        console.log("播报完成...")
      })
    },
    websocket() {
      // let socket = new ws('ws://localhost:8080')
      // socket.onopen = () => {
      //   // Web Socket 已连接上，使用 send() 方法发送数据
      //   ws.send('Holle')
      //   console.log('数据发送中...')
      // }
      // socket.onmessage = evt => {
      //   // console.log('数据已接收...')
      // }
      // socket.onclose = function() {
      //   // 关闭 websocket
      //   console.log('连接已关闭...')
      // }
      // // 组件销毁时调用，中断websocket链接
      // this.over = () => {
      //   socket.close()
      // }
    },
    searchClick() {
      http(api.getStationStat, { keywords: this.keywords }).then(res => {
        this.points2 = JSON.parse(JSON.stringify(res))
      })
    },
    gohome(item) {
      this.setEntrance('status');
      this.setStationCode(item.stationCode);
      this.setStationInfo(item);
      if(this.modaltype == 4) {
        this.$router.push('/repairMag');
      } else if(this.modaltype == 5) {
        this.$router.push('/faultMag');
      } else if(this.modaltype == 6) {
        this.$router.push('/homeCenter');
      } else {
        this.$router.push('/tree');
      }

    },
    postion() {
      this.obj = {
        falg1: '0',
        falg2: '0',
        falg3: '0',
        falg4: '0',
        falg5: '0',
        falg6: '0',
        falg7: '0',
        falg8: '0',
        falg9: '0',
      }
      let arr = [];
      let obk = '';

      if(this.getCustomizeTopList.length == 0) {
        arr = [
          {
            "customizeId": 3,
            "placeNumber": 1,
          },
          {
            "customizeId": 4,
            "placeNumber": 2,
          },
          {
            "customizeId": 1,
            "placeNumber": 3,
          },
          {
            "customizeId": 2,
            "placeNumber": 4,
          },
        ]
      } else {
        arr = this.getCustomizeTopList
      }
      let ajaxArr = []
      arr.forEach(v => {
        obk = 'falg' + v.customizeId
        this.obj[obk] = v.placeNumber;
        ajaxArr.push(v.customizeId)
      })
      this.$nextTick(() => {
        this.getHome(ajaxArr)
      });

    },
    getHome(ajaxArr) {
      // this.falg1List = [];
      // this.falg2List = [];
      // this.falg3List = [];
      // this.falg4List = {};
      // this.falg5List = [];
      // this.falg6List = {};
      // this.falg7List = {};
      // this.falg8List = {};
      // this.falg9List = {};
      http(api.getHome, { 'customIds': ajaxArr }).then(res => {
        let nums = ''
        let that = this
        ajaxArr.forEach(num => {
          // debugger;
          nums = 'falg' + num + 'List'

          if(num == 8) {
            that.falg8List.xlist = res[that.optionsd[8]].xlist;
            that.falg8List.ymap = {
              yy: [],
              mm: [],
            };
            res[that.optionsd[8]].ymap.mm.forEach(val => {
              if(val == 'Na') {
                that.falg8List.ymap.mm.push('0')
              } else {
                that.falg8List.ymap.mm.push(val)
              }
            });
            res[that.optionsd[8]].ymap.yy.forEach(val => {
              if(val == 'Na') {
                that.falg8List.ymap.yy.push('0')
              } else {
                that.falg8List.ymap.yy.push(val)
              }
            })
            let sdayjs = dayjs().format('YYYY-MM-DD HH:mm:ss').split('-');
            that.sday = sdayjs[0] + '-' + sdayjs[1]
          } else if(num == 9) {
            let sdayjs = dayjs().format('YYYY-MM-DD');
            let sdayjs2 = dayjs(new Date().getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
            that.falg9List.xlist = res[that.optionsd[9]].xlist;
            that.falg9List.ymap = {
              '今日': res[that.optionsd[9]].ymap[sdayjs],
              '昨日': res[that.optionsd[9]].ymap[sdayjs2],
            }
          } else {
            that[nums] = res[that.optionsd[num]];
          }

        })
        // debugger
        this.obj1 = res.breakerFaultWarning;
        this.$nextTick(() => {
          that.speak()
        });
        this.obj2 = res.breakerOnOff;
        this.obj3 = res.repairNotHandle;
      });
    },
    dialogShow(num) {
      this.modaltype = num
      if(this.points2.length == 0) {
        return
      }
      if(this.points2.length == 1) {
        this.gohome(this.points2[0])
      } else {
        this.dialogFormVisible = true;
        this.keywords = ''
      }
    }
  },
  watch: {
    // 因为不能直接修改 props 里的属性，所以不能直接把 formData 通过v-model进行绑定
    // 在这里我们需要监听 formData，当它发生变化时，立即将值赋给 data 里的 form
  },
}
</script>  
<style lang="less" media="screen" scoped>
.absolut1 {
  top: calc(10vh);
  left: 20px;
}
.absolut3 {
  top: calc(50vh);
  left: 20px;
}
.absolut2 {
  top: calc(10vh);
  right: 20px;
}
.absolut4 {
  top: calc(50vh);
  right: 20px;
}
.boxs {
  // z-index: 100000;
  padding: 10px;
  width: 21%;
  position: absolute;
  overflow: hidden;
  height: calc(37vh);
  background: url("./../../assets/new/centerBorder.png") no-repeat;
  background-size: 100% 100%;
  .title {
    text-align: left;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.6rem;
    color: #fff;
    font-weight: 500;
    vertical-align: middle;
    margin: 10px 0;
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .chardS2 {
    padding-bottom: 30px !important;
    height: 90%;
    width: 100%;
    overflow: hidden;
  }
  .listPad {
    padding: 0 0 0 10px;
  }
}
.container2 {
  background-image: url(../../assets/new/centerBg.jpg);
  background-color: #162240;
  width: 100%;
  text-align: center;
  height: 100%;
  line-height: 4rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // background-position: 50% 50%;
  color: #27d1ff;
  overflow: hidden;
}
.main {
  // z-index: 0;
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  .main-center {
    width: 100%;
    padding: 0px 20px 0 20px;
    height: 90%;
    margin: 0px auto 0 auto;
    text-align: center;
    background: url("../../assets/new/BGcenter.png") no-repeat;
    background-size: 50%;
    background-position: center center;
    .ml-top {
      height: 85%;
      width: 100%;
      margin: 0 auto;
      overflow: visible;
    }
    .ml-bottom {
      position: fixed;
      width: 100%;
      color: #fff;
      bottom: 0px;
      left: 0px;
      height: 19%;
      font-size: 1.4rem;
      line-height: 1rem;
      background: url("../../assets/new/bottomBg.png") no-repeat;
      background-size: 100% 50%;
      background-position: 0 100%;
      .m-c {
        width: 50%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          position: relative;
          cursor: pointer;
          // width: 20%;
          text-align: center;
          img {
            position: relative;
          }
          .posNum {
            position: absolute;
            width: 100%;
            display: inline-block;
            // top: 40px;
            left: 0;
            text-align: center;
            line-height: 90px;
          }
          .posNum1 {
            position: absolute;
            width: 100%;
            display: inline-block;
            // top: 40px;
            left: 0;
            text-align: center;
            line-height: 110px;
          }
        }
      }
      .toppad {
        margin-top: -5px;
        position: relative;
      }
    }
  }
}

// html

// css
.boxborder {
}
.radioBox {
  text-align: left;
  padding: 0 20px;
  .listModal {
    color: #fff;
    font-size: 1.6rem;
    p {
      margin-bottom: 10px;
    }
    ul {
      margin-bottom: 30px;
      list-style: none;
      background: url("../../assets/new/modallisticon5.png") no-repeat;
      background-size: 100% 100%;
      height: 400px;
      overflow: auto;
      li {
        background: url("../../assets/new/listLine.png") no-repeat;
        background-size: 100% 3px;
        background-position: left bottom;
        cursor: pointer;
        .listicon {
          // background: url("../../assets/new/modallisticon1.png") no-repeat;
          background-size: 100% 100%;
          display: inline-block;
          width: 6rem;
          height: 6rem;
          line-height: 6rem;
          text-align: center;
          font-size: 1.2rem;
          vertical-align: middle;
          span {
            line-height: 6rem;
          }
        }
      }
    }
  }
}
.red {
  background: url("../../assets/new/modallisticon1.png") no-repeat;
}
.orgs {
  background: url("../../assets/new/modallisticon2.png") no-repeat;
}
.gray {
  background: url("../../assets/new/modallisticon3.png") no-repeat;
}
.green {
  background: url("../../assets/new/modallisticon4.png") no-repeat;
}
.blue {
  background: url("../../assets/new/modallisticon6.png") no-repeat;
}
.fr {
  float: right;
  font-size: 1.2rem;
  color: #737790;
}
.flexC {
  display: flex;
  align-items: center;
}
</style>