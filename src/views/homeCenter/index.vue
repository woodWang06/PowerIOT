<template>
  <div class="container2 lingBut">
    <div class="main">
      <div class="main-center">
        <div class="ml-top newbox " style="overflow:hidden">
          <!-- <maps>
          </maps> -->
          <img :src="$imageUrls+getStationInfo.stationPic" @error="defaultImg()">
        </div>
        <div class="ml-bottom newbox " style="overflow:hidden">
          <div class="m-c">
            <div class="bottompad"><img :src="(obj2.offline&&obj2.offline!='0')?require('../../assets/newW/homeCenterIcon3n.png'):require('../../assets/newW/homeCenterIcon2.png')">
              <span class="posNum1" v-if="obj2.offline&&obj2.offline!='0'">{{obj2.offline}}</span>
              <p>离线</p>
            </div>
            <div @click="goother('tree')"><img :src="(obj1.warning&&obj1.warning!='0')?require('../../assets/newW/homeCenterIcon2n.png'):require('../../assets/newW/homeCenterIcon3.png')">
              <span class="posNum" v-if="obj1.warning&&obj1.warning!='0'">{{obj1.warning}}</span>
              <p>预警</p>
            </div>
            <div class="toppad" @click="goother('tree')"><img :src="(obj1.fault&&obj1.fault!='0')?require('../../assets/newW/homeCenterIcon1n.png'):require('../../assets/newW/homeCenterIcon1.png')">
              <span class="posNum2" v-if="obj1.fault&&obj1.fault!='0'">{{obj1.fault}}</span>
              <p>故障</p>
            </div>
            <div @click="goother('repairMag')"><img :src="(obj3.notHandle&&obj3.notHandle!='0')?require('../../assets/newW/homeCenterIcon2n.png'):require('../../assets/newW/homeCenterIcon3.png')">
              <span class="posNum" v-if="obj3.notHandle&&obj3.notHandle!='0'">{{obj3.notHandle}}</span>
              <p>运维</p>
            </div>
            <div class="bottompad"><img src="../../assets/newW/homeCenterIcon5.png" @click="dialogFormVisible=true">
              <p>历史</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ===============================1======================== -->
    <div class="boxs" :class="'absolut'+obj.falg10" v-if="obj.falg10!='0'">
      <div class="title listPad">
        <img src="./../../assets/newW/Centericon13.png"> 最新5条故障记录
      </div>
      <div class="chardS2 listPad">
        <list :breakerFaultList="falg10List" flag='1'></list>
      </div>
    </div>
    <!-- ===============================2======================== -->
    <div class="boxs" :class="'absolut'+obj.falg11" v-if="obj.falg11!='0'">
      <div class="title listPad">
        <img src="./../../assets/newW/Centericon12.png"> 最新5条预警记录
      </div>
      <div class="chardS2  listPad">
        <list :breakerFaultList="falg11List" flag='2'></list>
      </div>
    </div>
    <!-- ===============================3======================== -->
    <div class="boxs" :class="'absolut'+obj.falg12" v-if="obj.falg12!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon3.png"> 最新5条工单记录
      </div>
      <div class="chardS2 listPad">
        <list :breakerFaultList="falg12List" flag='3'></list>
      </div>
    </div>
    <!-- ===============================4======================== -->
    <div class="boxs  boxborder" :class="'absolut'+obj.falg13" v-if="obj.falg13!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon4.png"> 设备趋势
      </div>
      <div class="chardS2">
        <lines :datas="falg13List" unit='台' leftng='10%' v-if="falg13List.xlist&&falg13List.xlist.length>0" :colorList='colorList4'></lines>
      </div>
    </div>
    <!-- ===============================9======================== -->
    <div class="boxs " :class="'absolut'+obj.falg14" v-if="obj.falg14!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon5.png"> 设备统计
      </div>
      <div class="chardS2">
        <ring :datas="falg14List" v-if="falg14List.length>0"></ring>
      </div>
    </div>
    <!-- ===============================9======================== -->
    <div class="boxs " :class="'absolut'+obj.falg15" v-if="obj.falg15!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon6.png"> 设备状态
      </div>
      <div class="chardS2">
        <listStatus :datas="falg15List"></listStatus>
      </div>
    </div>
    <!-- ===============================2======================== -->
    <div class="boxs boxborder" :class="'absolut'+obj.falg16" v-if="obj.falg16!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon7.png"> 能耗预测
      </div>
      <div class="chardS2">
        <lines :datas="falg16List" unit="kW·h" leftng='15%' v-if="falg16List.xlist&&falg16List.xlist.length>0" :colorList='colorList7'></lines>
      </div>
    </div>
    <!-- ===============================3======================== -->
    <div class="boxs boxborder" :class="'absolut'+obj.falg17" v-if="obj.falg17!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon8.png"> 能耗同环比
        <span class="fr">{{sday}}</span>
      </div>
      <div class="chardS2">
        <lines :datas="falg17List" unit="%" leftng='10%' v-if="falg17List.xlist&&falg17List.xlist.length>0" :colorList='colorList7'></lines>
      </div>
    </div>
    <!-- ===============================4======================== -->
    <div class="boxs boxborder" :class="'absolut'+obj.falg18" v-if="obj.falg18!='0'">
      <div class="title listPad">
        <img src="./../../assets/new/Centericon9.png"> 能耗曲线
      </div>
      <div class="chardS2">
        <lines :datas="falg18List" unit="kW·h" leftng='15%' v-if="falg18List.xlist&&falg18List.xlist.length>0" :colorList='colorList9'></lines>
      </div>
    </div>
    <el-dialog title="历史记录" class="dialogClass dialoglight" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="500px">
      <div class="modalFlex" v-if="dialogFormVisible">
        <div class="thisBox color1" @click="goInfo2('/faultMag',0)">
          <img src="../../assets/newW/h_c_icon1.png">
          <p>历史故障</p>
        </div>
        <div class="thisBox color2" @click="goInfo2('/faultMag',1)">
          <img src="../../assets/newW/h_c_icon2.png">
          <p>历史预警</p>
        </div>
        <div class="thisBox color3" @click="goInfo('/eventMag')">
          <img src="../../assets/newW/h_c_icon3.png">
          <p>历史事件</p>
        </div>
        <div class="thisBox color4" @click="goInfo2('/repairMag',9)">
          <img src="../../assets/newW/h_c_icon4.png">
          <p>历史运维</p>
        </div>
      </div>
    </el-dialog>
    <img class="gocoltr" src="../../assets/newW/gocoltr.png" @click="gocoltr">
    <img v-if="stationCode =='S00164'" class="gocoltr2" src="../../assets/newW/homeCenterPlay.png" @click="gocoltr2">
  </div>
</template>
<script>

import api from 'api';
import http from 'http';
import maps from "./common/map";
import ring from "./common/ring2";
import lines from "./common/line";
import list from "./common/list";
import listStatus from "./common/listStatus";//
import { Dropdown, DropdownMenu, DropdownItem, Carousel, CarouselItem, Dialog } from 'element-ui';
import { mapMutations, mapGetters } from 'vuex';
import { location } from "./js/Location";
// import ws from 'websocketjs';
import Speech from 'speak-tts';
import dayjs from 'dayjs';
export default {
  components: {
    // TopHeader,
    maps,
    elDropdown: Dropdown,
    elDropdownMenu: DropdownMenu,
    elDropdownItem: DropdownItem,
    elCarousel: Carousel,
    elCarouselItem: CarouselItem,
    elDialog: Dialog,
    ring,
    lines,
    list,
    listStatus
  },
  data() {
    return {
      points: [],
      dialogFormVisible: false,
      stationPop: {},
      overSize: '1',
      stationEnergy: {},
      // breakerFaultList: [],
      speech: null,
      obj: {
        falg10: '0',
        falg11: '0',
        falg12: '0',
        falg13: '0',
        falg14: '0',
        falg15: '0',
        falg16: '0',
        falg17: '0',
        falg18: '0',
      },
      search: {},
      CustomizeTopList: [],
      falg10List: [],
      falg11List: [],
      falg12List: [],
      falg13List: {},
      falg14List: [],
      falg15List: {},
      falg16List: {},
      falg17List: {},
      falg18List: {},
      stationCode: '',
      colorList4: [
        ['rgba(255, 166, 29,0.2)', 'RGBA(255, 166, 29, 1)'],
        ['rgba(255, 117, 117,0.2)', 'RGBA(255, 117, 117, 1)'],
      ],
      colorList7: [
        ['rgba(255, 166, 29,0.2)', 'RGBA(255, 166, 29, 1)'],
        ['rgba(56, 125, 255,0.2)', 'RGBA(56, 125, 255, 1)'],
      ],
      colorList9: [
        ['rgba(4, 214, 200,0.2)', 'RGBA(94, 214, 200, 1)'],
        ['rgba(56, 125, 255,0.2)', 'RGBA(56, 125, 255, 1)'],
      ],
      obj1: {},
      obj2: {},
      obj3: {},
      sday: '',
      user: {},
      optionsd: {
        10: 'faultTop5',
        11: 'warningTop5',
        12: 'repairTop5',
        13: 'deviceTrend',
        14: 'breakerGroupStat',
        15: 'breakerState',
        16: 'energyWeekTrend',
        17: 'energyMonthYyMm',
        18: 'energyTwoDayTrend',
      },
      timer: null
    }
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
    ...mapGetters('login', ['getStationInfo']),
    ...mapGetters('login', ['getCustomizeStationList']),
  },
  created() {
    this.stationCode = this.getStationCode

  },
  mounted() {
    this.postion();
    let that = this;
    this.timer = setInterval(function() {
      that.postion();
    }, 15000);
    let self = this;
    window.addEventListener("resize", this.adder, true);
    this.speechInit();
    // this.websocket()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.adder, true);
    clearInterval(this.timer);
    this.timer = null;
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
        text += '故障数量' + this.obj1.warning + '条'
      }
      this.speech.speak({ text: text }).then(() => {
        console.log("播报完成...")
      })
    },

    // websocket() {
    //   let socket = new ws('ws://localhost:8080')
    //   socket.onopen = () => {
    //     // Web Socket 已连接上，使用 send() 方法发送数据
    //     ws.send('Holle')
    //     console.log('数据发送中...')
    //   }
    //   socket.onmessage = evt => {
    //     // console.log('数据已接收...')
    //   }
    //   socket.onclose = function() {
    //     // 关闭 websocket
    //     console.log('连接已关闭...')
    //   }
    //   // 组件销毁时调用，中断websocket链接
    //   this.over = () => {
    //     socket.close()
    //   }
    // },
    //地图接口
    getAllStation() {
      http(api.getStationStatMap).then(res => {
        res.forEach(val => {
          this.points.push({
            value: [val.positionX, val.positionY],
            name: val.stationName,
            stationCode: val.stationCode,
            stationAddress: val.stationAddress,
            itemStyle: { color: '#47ECFF' }
          })
        })
      })
    },
    goother(name) {
      this.$router.push('/' + name);
    },
    goother2(name, avt) {
      this.$router.push({
        path: "/" + name,
        query: {
          activeName: avt,
        }
      });

    },
    goInfo(name) {
      this.$router.push(name);
    },
    goInfo2(name, str) {
      this.$router.push(
        {
          path: name,
          query: {
            activeName: str,
          }
        }
      );
    },
    postion() {
      this.obj = {
        falg10: '0',
        falg11: '0',
        falg12: '0',
        falg13: '0',
        falg14: '0',
        falg15: '0',
        falg16: '0',
        falg17: '0',
        falg18: '0',
      }
      let arr = [];
      let obk = '';
      if(this.getCustomizeStationList.length == 0) {
        arr = [
          {
            "customizeId": 13,
            "placeNumber": 1,
          },
          {
            "customizeId": 14,
            "placeNumber": 2,
          },
          {
            "customizeId": 11,
            "placeNumber": 3,
          },
          {
            "customizeId": 12,
            "placeNumber": 4,
          },
        ]
      } else {
        // if
        arr = this.getCustomizeStationList
      }
      let ajaxArr = []
      arr.forEach(v => {
        obk = 'falg' + v.customizeId;
        this.obj[obk] = v.placeNumber;
        ajaxArr.push(v.customizeId)
      })
      this.$nextTick(() => {
        this.getHomeStation(ajaxArr)
      });
    },
    getHomeStation(ajaxArr) {
      // this.falg10List = [];
      // this.falg11List = [];
      // this.falg12List = [];
      // this.falg13List = {};
      // this.falg14List = [];
      // this.falg15List = {};
      // this.falg16List = {};
      // this.falg17List = {};
      // this.falg18List = {};
      http(api.getHomeStation, { 'customIds': ajaxArr, 'stationCode': this.stationCode }).then(res => {
        let nums = ''
        let that = this
        ajaxArr.forEach(num => {
          // debugger;
          nums = 'falg' + num + 'List'

          if(num == 17) {
            that.falg17List.xlist = res[that.optionsd[17]].xlist;
            that.falg17List.ymap = {
              yy: [],
              mm: [],
            };
            res[that.optionsd[17]].ymap.mm.forEach(val => {
              if(val == 'Na') {
                that.falg17List.ymap.mm.push('0')
              } else {
                that.falg17List.ymap.mm.push(val)
              }
            });
            res[that.optionsd[17]].ymap.yy.forEach(val => {
              if(val == 'Na') {
                that.falg17List.ymap.yy.push('0')
              } else {
                that.falg17List.ymap.yy.push(val)
              }
            })
            let sdayjs = dayjs().format('YYYY-MM-DD HH:mm:ss').split('-');
            that.sday = sdayjs[0] + '-' + sdayjs[1]
          } else if(num == 18) {
            let sdayjs = dayjs().format('YYYY-MM-DD');
            let sdayjs2 = dayjs(new Date().getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
            that.falg18List.xlist = res[that.optionsd[18]].xlist;
            that.falg18List.ymap = {
              '今日': res[that.optionsd[18]].ymap[sdayjs],
              '昨日': res[that.optionsd[18]].ymap[sdayjs2],
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
    gocoltr() {
      this.$router.push({ name: 'homeCenterSet' });
    },
    gocoltr2() {
      // this.$router.push({ name: 'singleOther' });
      let pageURL = 'http://192.168.8.64/doc/page/login.asp'
      var ScreenWidth = screen.availWidth
      var ScreenHeight = screen.availHeight
      var StartX = (ScreenWidth - innerWidth) / 2
      var StartY = (ScreenHeight - innerHeight) / 2
      wins = window.open(pageURL, 'OpenWin', 'left=' + StartX + ', top=' + StartY + ', Width=' + innerWidth + ', height=' + innerHeight + ', resizable=no, scrollbars=yes, status=no, toolbar=no, menubar=no, location=no')
      wins.focus();
      // window.open('')
    },
    defaultImg() {
      let img = event.srcElement;
      img.src = require("../../assets/newW/112.png");
      img.onerror = null; //防止闪图
    },
  },
  watch: {
    // 因为不能直接修改 props 里的属性，所以不能直接把 formData 通过v-model进行绑定
    // 在这里我们需要监听 formData，当它发生变化时，立即将值赋给 data 里的 form
  },
}
</script>  
<style lang="less" media="screen" scoped>
.absolut1 {
  top: 10px;
  left: 0px;
}
.absolut3 {
  top: 43%;
  left: 0px;
}
.absolut2 {
  top: 10px;
  right: 0px;
}
.absolut4 {
  top: 43%;
  right: 0px;
}
.boxs {
  // z-index: 100000;
  padding: 10px;
  width: 25%;
  position: absolute;
  overflow: hidden;
  height: 37%;
  background-size: 100% 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 3px #ddd;
  .title {
    text-align: left;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.6rem;
    color: #1b2026;
    font-weight: bold;
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
    margin-top: 15px;
  }
  .listPad {
    padding: 0 0 0 10px;
  }
}
.container2 {
  width: 100%;
  text-align: center;
  height: 100%;
  line-height: 4rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #27d1ff;
  overflow: hidden;
  position: relative;
  padding-top: 10px;
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
    height: 100%;
    margin: 0px auto 0 auto;
    text-align: center;
    background-size: 50% 100%;
    background-position: center;
    .ml-top {
      height: 80%;
      width: 48%;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 1px 1px 3px #ddd;
      // background-image: url("../../assets/newW/112.png");
      background-size: 100% 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .ml-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      color: #909bbc;
      height: 20%;
      font-size: 1.4rem;
      line-height: 1rem;
      background: url("../../assets/newW/homeICONBg.png") no-repeat;
      background-size: 100% 50%;
      background-position: 0 100%;
      z-index: 100;
      .m-c {
        width: 60%;
        margin: 10px auto;
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        div {
          cursor: pointer;
          // width: 20%;
          text-align: center;
          position: relative;
        }
        p {
          margin-top: 10px;
        }
        img {
          width: 70px;
        }
      }
      .toppad {
        margin-top: -10px;
      }
      .bottompad {
        margin-top: 10px;
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
      li {
        background: url("../../assets/new/listLine.png") no-repeat;
        background-size: 100% 3px;
        background-position: left bottom;
        .listicon {
          background: url("../../assets/new/modallisticon1.png") no-repeat;
          background-size: 100% 100%;
          display: inline-block;
          width: 6rem;
          height: 6rem;
          line-height: 6rem;
          text-align: center;
          font-size: 1.2rem;
        }
      }
    }
  }
}
.content-box {
  overflow: hidden !important;
}
.fr {
  float: right;
  font-size: 1.2rem;
  color: #6e7ba6;
  font-weight: normal;
}
// .posNum {
//   position: absolute;
//   top: 5px;
//   right: 0px;
//   background: #ff5548;
//   color: #fff;
//   padding: 3px 8px;
//   border-radius: 10px;
// }
.posNum {
  font-size: 1.6rem;
  position: absolute;
  width: 100%;
  display: inline-block;
  color: #fff;
  left: 0;
  text-align: center;
  line-height: 60px;
}
.posNum1 {
  font-size: 1.6rem;
  position: absolute;
  width: 100%;
  display: inline-block;
  color: #788596;
  left: 0;
  text-align: center;
  line-height: 60px;
}
.posNum2 {
  font-size: 1.6rem;
  position: absolute;
  width: 100%;
  display: inline-block;
  color: #fff;
  left: 0;
  text-align: center;
  line-height: 50px;
}
.modalFlex {
  display: flex;
  border-top: 1px solid #f5f5f5;
  padding: 30px 0;
  justify-content: space-between;
}
.thisBox {
  text-align: center;
  width: 20%;
  line-height: 2.5rem;
  border-radius: 8px;
  padding: 15px 0;
}
.color1 {
  background: rgba(255, 222, 222, 0.4);
  border: 1px solid rgba(255, 222, 222, 1);
}
.color2 {
  background: rgba(255, 234, 202, 1);
  border: 1px solid rgba(255, 234, 202, 1);
}
.color3 {
  background: rgba(41, 111, 245, 0.1);
  border: 1px solid rgba(41, 111, 245, 0.17);
}
.color4 {
  background: rgba(102, 217, 204, 0.1);
  border: 1px solid rgba(102, 217, 204, 0.16);
}
.gocoltr {
  position: absolute;
  bottom: 0px;
  right: 20px;
  width: 150px;
  height: 150px;
  z-index: 1000;
}
.gocoltr2 {
  position: absolute;
  bottom: 0px;
  left: 20px;
  width: 150px;
  height: 150px;
  z-index: 1000;
}
</style>