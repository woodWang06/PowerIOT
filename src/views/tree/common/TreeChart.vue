<template>
  <div class="tree scrollWarrp" v-dragscroll>
    <table v-if="treeData.domainName">
      <tr>
        <td :colspan="Array.isArray(treeData.children) ? treeData.children.length * 2 : 1" :class="{parentLevel: Array.isArray(treeData.children) && treeData.children.length, extend: Array.isArray(treeData.children) && treeData.children.length && treeData.extend}">
          <div :class="{node: true, hasMate: treeData.mate}">
            <div class="person" :class="Array.isArray(treeData.class) ? treeData.class : []" @click="$emit('click-node', treeData)">
              <!-- <div class="name" v-if="treeData.domainType=='D3'||treeData.domainType=='D4'">{{treeData.domainName}}</div> -->
              <div class="nametit titImg3" v-if="treeData.domainType=='D3'">
                <!-- <img class="titImg3" src="./../../../assets/center/room.png"> -->
                <div>{{treeData.domainName}}</div>
              </div>
              <div class="nametit titImg2" v-else-if="treeData.domainType=='D4'">
                <!-- <img class="titImg2" src="./../../../assets/center/ggd.png"> -->
                <div>{{treeData.domainName}}</div>
              </div>
              <div class="nametit titImg1" v-else>
                <!-- <img class="titImg1" src="./../../../assets/center/NEA3.png"> -->
                <div>{{treeData.domainName}}</div>
              </div>
            </div>
          </div>
          <div class="extend_handle" v-if="Array.isArray(treeData.children) && treeData.children.length" @click="toggleExtend(treeData)"></div>
        </td>
      </tr>
      <tr v-if="Array.isArray(treeData.children) && treeData.children.length && treeData.extend&&treeData.domainType=='D4'">
        <td colspan=" 2" class="childLevel">
          <div class="boxHl">
            <div v-for="(childrens, index) in treeData.children" :key="index" colspan="2" class="name2">
              <div class="flexsX">
                <div v-if="childrens.breakerCode">
                  <span v-if="childrens.breakerLinkFlag" class="i-success"></span>
                  <span v-if="!childrens.breakerLinkFlag" class="i-error"></span>
                </div>
                <div>
                </div>
                <div class="flexsY">
                  <div>
                    <span style="color:#303133;font-size:14px">{{childrens.domainName}}</span>
                    <span class="popTit m_l_r">
                      <span v-if="childrens.mainFlag" class="i-error2">主进线</span>
                    </span>
                    <div>
                      <el-link style="color:#2D78FF" v-if="i.breakerLargeType!='IO'&& i.breakerLargeType.substring(0,2)!='SE'" v-for="i in childrens.breakerWithInfoList" @click="goDetails(childrens,i)">
                        <span :class="!i.linkFlag?'gray':i.faultFlag?'red':i.warningFlag?'orgin':'green'"> ({{i.breakerName}})</span>
                      </el-link>
                    </div>
                    <div>
                      <el-popover placement="top-start" width="450" trigger="click" @show="showPop(i)" v-if="i.breakerLargeType=='IO'||i.breakerLargeType.substring(0,2)=='SE'" v-for="(i,inde) in childrens.breakerWithInfoList">
                        <div v-if="measureData.xlist&&measureData.xlist.length>0">
                          <div class="popnr" v-if='i.breakerLargeType!="IO"'>
                            <span v-for="j in measureData.ylist[0]">{{j.refKey}} ：{{j.refValue}}{{j.refUnit}}</span>
                          </div>
                          <div class="popnr" v-else>
                            <span v-for="j in measureData.ylist[0]" v-if='j.refKeyHex.substring(0,4)!="0261"'>{{j.refKey}}：{{j.refValue=='0'?'关闭':'打开'}}</span>
                            <span v-for="j in measureData.ylist[0]" v-if='j.refKeyHex.substring(0,4)=="0261"'>{{j.refKey}}：{{j.refValue=='0'?'关闭':'打开'}}
                              <el-button type="text" class="Fr" size="mini" v-if="j.refValue=='0'" @click="goDIDO('0',j,i)">打开</el-button>
                              <el-button type="text" class="Fr" size="mini" v-if="j.refValue!='0'" @click="goDIDO('1',j,i)">关闭</el-button>
                            </span>
                          </div>
                        </div>
                        <span slot="reference">
                          <el-link style="color:#6B7A98">
                            <!-- <span :class="i.linkFlag?'greed':'red'"> ({{i.breakerName}})</span> -->
                            <span :class="!i.linkFlag?'gray':i.faultFlag?'red':i.warningFlag?'orgin':'green'"> ({{i.breakerName}})</span>

                            <!-- <span v-if="inde+1<childrens.breakerWithInfoList.length">/</span> -->
                          </el-link>
                        </span>
                      </el-popover>
                    </div>
                  </div>
                </div>
                <div class="flexsY2" v-if="childrens.breakerLargeType!='SF'&&childrens.breakerLargeType!='AT'">
                  <span class="icons" v-if="childrens.breakerCode">
                    <img v-if="childrens.warningStateFlag" src="./../../../assets/center/producticon1.png">
                    <img v-if="!childrens.warningStateFlag" src="./../../../assets/center/successok1.png">
                  </span>
                </div>
              </div>

            </div>
          </div>
        </td>
      </tr>
      <tr v-if="Array.isArray(treeData.children) && treeData.children.length && treeData.extend&&treeData.domainType!='D4'">
        <td v-for="(children, index) in treeData.children" :key="index" colspan="2" class="childLevel">
          <TreeChart :json="children" @click-node="$emit('click-node', $event)" />
        </td>
      </tr>
    </table>

    <el-drawer title="定时控制" :visible.sync="dialog" direction="rtl" size="42%" custom-class="demo-drawer" ref="drawer">
      <div class="demo-drawer__content" v-if="dialog">
        <div style="width:100%;padding:10px">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="AddForm">{{$t("button.add")}}</el-button>
          <el-form inline label-width="100px" size="mini" :model="FormArr" ref="FormArr">     
            <div class="demo-form-inline" v-for="(item, i) in FormArr.orderList" :key="i">
              <el-form-item size="mini" class="margin_b2" label="断开定时时间">
                <el-time-picker size="mini" :clearable="false" v-model="item.times" format="HH:mm" type="time" placeholder="断开定时时间">
                </el-time-picker>
              </el-form-item>
              <el-form-item size="mini" class="margin_b2" label="闭合定时时间">
                <el-time-picker size="mini" :clearable="false" v-model="item.times1" format="HH:mm" type="time" placeholder="闭合定时时间">
                </el-time-picker>
              </el-form-item>
              <el-form-item size="mini" class="margin_b2" label="重复日期选择">
                <div style="width:100%">
                  <el-checkbox v-model="item.checked3" label="周一" border size="mini"></el-checkbox>
                  <el-checkbox v-model="item.checked4" label="周二" border size="mini"></el-checkbox>
                  <el-checkbox v-model="item.checked5" label="周三" border size="mini"></el-checkbox>
                  <el-checkbox v-model="item.checked6" label="周四" border size="mini"></el-checkbox>
                  <el-checkbox v-model="item.checked7" label="周五" border size="mini"></el-checkbox>
                  <el-checkbox v-model="item.checked8" label="周六" border size="mini"></el-checkbox>
                  <el-checkbox v-model="item.checked9" label="周日" border size="mini"></el-checkbox>
                </div>
              </el-form-item>
              <el-form-item size="mini">
                <el-button size="mini" type="danger" @click="Delete(i)">{{$t("button.delete")}}</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="demo-drawer__footer2">
          <el-button class="button" size="small" @click="dialog=false">{{$t("button.cancel")}}</el-button>
          <el-button class="button" size="small" type="primary" @click="dialog=false">{{$t("button.save")}}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import api from 'api';
import http from 'http';
import { Popover, Dialog, Table, TableColumn, DatePicker, TimePicker, Link } from 'element-ui';
import { mapGetters } from 'vuex';
import { dragscroll } from 'vue-dragscroll'
export default {
  name: "TreeChart",
  props: ["json"],
  directives: {
    'dragscroll': dragscroll
  },
  data() {
    return {
      treeData: {},
      dialogVisible: false,
      modalDate: {},
      dialog: false,
      FormArr: {
        orderList: [
          {
            times: '',
            times1: ''
          }
        ]
      },
      controlForm: {},//远程控制对象

      measureData: {}
    }
  },
  components: {
    elPopover: Popover,
    elDialog: Dialog,
    elDatePicker: DatePicker,
    elTimePicker: TimePicker,
    elLink: Link,
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  watch: {
    json: {
      handler: function(Props) {
        let extendKey = function(jsonData) {
          jsonData.extend = (jsonData.extend === void 0 ? true : !!jsonData.extend);
          if(Array.isArray(jsonData.children)) {
            jsonData.children.forEach(c => {
              extendKey(c)
            })
          }
          return jsonData;
        }
        if(Props) {
          this.treeData = extendKey(Props);
        }
      },
      immediate: true
    }
  },
  methods: {
    toggleExtend: function(treeData) {
      treeData.extend = !treeData.extend;
      this.$forceUpdate();
    },
    goDetails(item, i) {

      let mess = ''
      if(!i.breakerCode) {
        mess = '该回路未绑定设备，请先绑定设备'
      } else if(!i.gatewayAddress) {
        mess = '该设备未绑定网关，请先绑定网关'
      }
      if(!i.gatewayAddress || !i.breakerCode) {
        this.$alert(mess, "提示", {
          confirmButtonText: this.$t("button.confirm"),
          callback: action => {
          }
        });
        return
      }
      this.$router.push({
        path: "/productDetails",
        query: {
          breakerCode: i.breakerCode,
        }
      });


    },
    editStock() {

    },

    modalInfo(item) {
      http(api.getProductInfoByBreakerCode, { breakerAddress: item.breakerAddress, gatewayAddress: item.gatewayAddress }).then(res => {
        this.modalDate = res
      })

    },

    AddForm() {
      if(this.FormArr.orderList.length >= 5) {
        this.$alert("最多设置5个定时控制", "提示", {
          confirmButtonText: this.$t("button.confirm"),
          callback: action => {
          }
        });
        return;
      } else {
        this.FormArr.orderList.push({
          //  index: this.FormArr.length,
          times: '',
          times1: '',
          checked: [],
        })
      }

    },
    Delete(index) {
      if(this.FormArr.orderList.length == 1) {
        this.$alert("已是最后1个定时控制", "提示", {
          confirmButtonText: this.$t("button.confirm"),
          callback: action => {
          }
        });
        return;
      }
      this.FormArr.orderList.splice(index, 1)
      for(let i in this.FormArr.orderList) {
        this.FormArr.orderList[i].index = i
      }
    },

    showPop(item) {
      let condition = {
        breakerCode: item.breakerCode,
      }
      this.measureData = {}
      http(api.getMeasureData, condition).then(res => {
        this.measureData = res
      })

    },
    goDIDO(Flag, j, item) {
      let obj = {};
      if(Flag == '1') {
        obj = {
          breakerCode: item.breakerCode,
          refKey: '022D',
          refValue: '0000'
        }
      } else {
        let spstr = j.refKeyHex.split("");
        // let refKey = "022D." + spstr[spstr.length - 1]
        let refValue = ''
        switch(spstr[spstr.length - 1]) {
          case "0":
            refValue = '0001'
            break;
          case "1":
            refValue = '0002'
            break;
          case "2":
            refValue = '0004'
            break;
          case "3":
            refValue = '0008'
            break;
          case "4":
            refValue = '0010'
            break;
          case "5":
            refValue = '0020'
            break;
          default:
            refValue = ''
            break;
        }
        obj = {
          breakerCode: item.breakerCode,
          refKey: '022D',
          refValue: refValue
        }
      }
      console.log(obj)
      http(api.breakerCmdIo, obj).then(res => {
        this.$message({
          type: "success",
          message: "命令已发送"
        });
      })

    }
  }
}
</script>

<style scoped>
table {
  border-collapse: separate !important;
  border-spacing: 0 !important;
  width: 100%;
  overflow: auto;
  min-height: 100%;
}
td {
  position: relative;
  vertical-align: top;
  padding: 0 0 50px 0;
  text-align: center;
  min-width: 200px;
}

.extend_handle {
  position: absolute;
  left: 50%;
  bottom: 45px;
  width: 20px;
  height: 20px;
  margin-left: 9px;
  z-index: 1000;
  /* padding: 10px; */
  transform: translate3d(-15px, 0, 0);
  cursor: pointer;
}
.extend_handle:before {
  content: "";
  background: url("../../../assets/center/icon_zk.png");
  background-size: 100% 100%;
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.extend_handle:hover:before {
  border-color: #333 #333 transparent transparent;
}
.extend .extend_handle:before {
  /* transform: rotateZ(-45deg); */
  background: url("../../../assets/center/icon_sq.png");
  background-size: 100% 100%;
}

.extend::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 8px;
  height: 40px;
  border-left: 8px solid #bbc8e0;
  transform: translate3d(-1px, 0, 0);
}
.childLevel::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 100%;
  height: 15px;
  border-left: 8px solid #bbc8e0;
  transform: translate3d(-1px, 0, 0);
}
.childLevel::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -15px;
  border-top: 8px solid #bbc8e0;
}
.childLevel:first-child:before,
.childLevel:last-child:before {
  display: none;
}
.childLevel:first-child:after {
  left: 50%;
  height: 15px;
  border: 8px solid;
  border-color: #bbc8e0 transparent transparent #bbc8e0;
  border-radius: 6px 0 0 0;
  transform: translate3d(10px, 0, 0);
}
.childLevel:last-child:after {
  right: 51%;
  height: 15px;
  border-top: 8px solid;
  border-right: 8px solid;
  border-color: #bbc8e0 #bbc8e0 #bbc8e0 #bbc8e0;
  border-radius: 0 6px 0 0;
  /* transform: translate3d(5px, 5px, 5px); */
}
.childLevel:first-child.childLevel:last-child::after {
  left: auto;
  border-radius: 0;
  border-color: transparent transparent transparent transparent;
  /* transform: translate3d(7px, 0, 0); */
}

.node {
  position: relative;
  display: inline-block;
  margin: 0 1em;
  box-sizing: border-box;
  text-align: center;
}
.node .person {
  position: relative;
  display: inline-block;
  z-index: 2;
  /* width: 6em; */
  overflow: hidden;
}
.node .person .avat {
  display: block;
  width: 4em;
  height: 4em;
  margin: auto;
  overflow: hidden;
  background: #fff;
  border: 8px solid #bbc8e0;
  box-sizing: border-box;
}
.node .person .avat img {
  width: 100%;
  height: 100%;
}
.node .person .name {
  background: -moz-linear-gradient(top, #bbc8e0 0%, #ffffff 100%);
  background: linear-gradient(to right, #248fff 0%, #1bbce4 100%);
  border-radius: 5px;
  padding: 8px 15px;
  margin-bottom: 10px;
  margin-right: 5px;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}
.node.hasMate::after {
  content: "";
  position: absolute;
  left: 2em;
  right: 2em;
  top: 2em;
  border-top: 8px solid #bbc8e0;
  z-index: 1;
}
/* 横板 */
.landscape {
  transform: translate(-100%, 0) rotate(-90deg);
  transform-origin: 100% 0;
}
.landscape .node {
  text-align: left;
  height: 8em;
  width: 8em;
}
.landscape .person {
  position: relative;
  transform: rotate(90deg);
  padding-left: 4.5em;
  height: 4em;
  top: 4em;
  left: -1em;
}
.landscape .person .avat {
  position: absolute;
  left: 0;
}
.landscape .person .name {
  height: 4em;
  line-height: 4em;
}
.landscape .hasMate {
  position: relative;
}
.landscape .hasMate .person {
  position: absolute;
}
.landscape .hasMate .person:first-child {
  left: auto;
  right: -4em;
}
.landscape .hasMate .person:last-child {
  left: -4em;
  margin-left: 0;
}
.boxHl {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.name2 {
  display: block;
  max-width: 400px;
  min-width: 100px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 10px;
  margin-right: 10px;
  color: #333;
  font-size: 1.2rem;
  text-align: left;
  width: 95%;
  /* padding: 10px 0; */
  cursor: pointer;
  position: relative;
}
.name2:first-child {
  margin-top: 0px;
}
.name2 img {
  vertical-align: middle;
  margin: 0 5px;
}
.m_l_r {
  margin-right: 5px;
}
.i-success {
  width: 3px;
  height: 100%;
  background: #0eb554;
  border-radius: 4px;
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 0;
}
.i-success3 {
  width: 8px;
  height: 8px;
  background: #248fff;
  border-radius: 4px;
  display: inline-block;
}
.i-error {
  width: 3px;
  height: 100%;
  background: #f46b6c;
  border-radius: 4px;
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 0;
}
</style>
<style lang="less" scoped>
.popoverBox {
  padding-bottom: 10px;
  .popTit {
    line-height: 20px;
    span {
      display: inline-block;
      // width: 8px;
      // height: 8px;
      // background: #409eff;
      // border-radius: 4px;
      margin-right: 3px;
    }
  }
}
.popnr {
  span {
    display: inline-block;
    width: 50%;
    line-height: 28px;
    color: #666;
    font-size: 1.4rem;
  }
}
.b_datas2 {
  text-align: left;
  .btnSty {
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .inputs {
    width: 60%;
    display: block;
    margin: 0 auto;
  }
}
.el-form-item {
  margin-bottom: 12px !important;
}
.icons {
  float: right;
  margin-top: 3px;
  img {
    width: 48px;
    margin: 0;
  }
}
.i-success2 {
  // width: 30px;
  padding: 2px 4px;
  // height: 18px;
  font-size: 1rem !important;
  border-radius: 4px;
  color: RGBA(60, 195, 117, 1);
  display: inline-block;
  text-align: center;
  line-height: 16px;
  background: RGBA(60, 195, 117, 0.2);
  display: inline-block;
}
.i-error2 {
  // width: 30px;
  padding: 0px 2px;
  // height: 18px;
  margin-left: 5px;
  font-size: 1rem !important;
  border-radius: 4px;
  color: RGBA(245, 131, 131, 1);
  display: inline-block;
  text-align: center;
  line-height: 16px;
  background: RGBA(245, 131, 131, 0.2);
  display: inline-block;
}
.demo-form-inline {
  background: #f0f0f0;
  border: 1px solid #eeeeee;
  margin-top: 20px;
  padding: 10px;
}
.el-checkbox {
  margin: 5px;
}
.demo-drawer__footer2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;

  .button {
    flex: 0.5;
    margin: 30px;
  }
}
.title {
  color: #409eff;
  padding-left: 10px;
  border-left: 3px solid #409eff;
  line-height: 14px;
  margin: 5px 0;
}
.flexsX {
  display: flex;
  align-items: center;
  line-height: 20px;
  padding: 10px 0 10px 10px;
  .flexsY {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-content: space-around;
  }
  .flexsY2 {
    min-width: 10%;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: center;
    text-align: center;
    margin-left: auto;
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
}
.titImg3 {
  background: url("./../../../assets/center/room.png") no-repeat;
  width: 240px;
  height: 80px;
  line-height: 80px;
  color: #fff;
}
.titImg2 {
  background: url("./../../../assets/center/ggd.png") no-repeat;
  width: 240px;
  height: 80px;
  line-height: 80px;
  color: #fff;
}
.titImg1 {
  background: url("./../../../assets/center/NEA3.png") no-repeat;
  width: 240px;
  height: 80px;
  line-height: 80px;
  color: #fff;
}
.nametit div {
  font-size: 1.4rem;
  color: #fff;
  font-weight: bold;
}
.stateShow {
  display: inline-block;
}
.tree {
  width: 100%;
  overflow: auto;
}
.green {
  color: #8ddb77;
}
.gray {
  color: #999;
}
.orgin {
  color: #e19f53;
}
.red {
  color: #cd0f0f;
}
.Fr {
  // float: right;
  padding-left: 20px;
}
</style>
