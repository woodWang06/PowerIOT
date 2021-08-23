<template>
  <div id="delsits" class="container">
    <div>
      <!-- 1 -->
      <el-row :gutter="12">
        <el-col :span="24">
          <el-card :body-style="{ padding:'0px 30px'}">
            <div class="cardTitle2">
              <img src="../../assets/newW/detailsTitleIcon1.png">
              <span>{{breakerObj.breakerName}}</span>
              <el-button v-if="num" type="warning" size="small" class="posback" @click="goback">返回单线图</el-button>
              <el-button v-else type="warning" size="small" class="posback" @click="goback2">返回拓扑图</el-button>
            </div>
            <div class="b_datas">
              <div class="t_l_box">
                <div class="t_l_flex t_l_flex3" v-for="(j,i) in basicInfo.xlist" :key="i">
                  <div class="titClassify">{{j}}</div>
                  <div class="onebox " v-for="(item,index) in basicInfo.ylist[i]" :key="index">
                    <div class="onebox_k">
                      <img :src="$imageUrls+item.showIcon+'.png'">
                      <div>
                        <div class="small">{{item.refKey}}</div>
                        <div class="big">{{item.refValue}}{{item.refUnit}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 2 -->
      <el-row :gutter="12" class="cuttop" v-if="faultList.length>0">
        <el-col :span="24">
          <el-card :body-style="{ padding:'0px 30px 20px 30px '}">
            <div class="blueSelect">
              <el-select v-model="faultstatus">
                <el-option :value="i" :key="i" :label="'故障'+(i+1)" v-for="(j,i) in faultList"></el-option>
              </el-select>
            </div>
            <div class="cardTitle">
              <img src="../../assets/newW/detailsTitleIcon2.png">
              <span>故障</span>
            </div>

            <div class="a_datas">
              <div class="a_right">
                <div class="one">
                  <img src="../../assets/newW/d_f_icon1.png">
                  <span>故障时间</span>
                  <span class="fR">{{faultList[faultstatus].faultTime}}</span>
                </div>
                <div class="one">
                  <img src="../../assets/newW/d_f_icon2.png">
                  <span>故障类型</span>
                  <span class="fR">{{faultList[faultstatus].faultContent}}</span>
                </div>
                <!-- <div class="one">
                  <img src="../../assets/newW/d_f_icon3.png">
                  <span>故障参数</span>
                  <span class="fR">{{faultList[faultstatus].faultContent}}</span>
                </div> -->
                <div class="one">
                  <img src="../../assets/newW/d_f_icon4.png">
                  <span>故障持续时间</span>
                  <span class="fR">{{faultList[faultstatus].faultDuration}}</span>
                </div>
                <div class="one">
                  <img src="../../assets/newW/d_f_icon5.png">
                  <span>故障等级</span>
                  <span class="fR">
                    {{dictionaries.criticality[faultList[faultstatus].faultCriticality]}}
                  </span>
                </div>
              </div>
              <div class="a_right">
                <div class="one">
                  <img src="../../assets/newW/d_f_icon6.png">
                  <span>故障处理建议</span>
                </div>
                <div class="detail" v-html='faultList[faultstatus].preSolution'>

                </div>
              </div>
              <div class="a_right">
                <div class="one">
                  <img src="../../assets/newW/d_f_icon7.png">
                  <span>故障原因分析</span>
                </div>
                <div class="detail" v-html='faultList[faultstatus].preReason'>
                </div>
                <div class="warrin">
                  以上数据仅供参考,查看<el-button type="text" @click='delOne(faultList[faultstatus])'>故障录波</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 3 -->
      <el-row :gutter="12" class="cuttop" v-if="warningList.length>0">
        <el-col :span="24">
          <el-card :body-style="{ padding:'0px 30px'}">
            <div class="blueSelect">
              <el-select v-model="warningListstatus">
                <el-option :value="i" :key="i" :label="'预警'+(i+1)" v-for="(j,i) in warningList"></el-option>
              </el-select>
            </div>
            <div class="cardTitle">
              <img src="../../assets/newW/detailsTitleIcon3.png">
              <span>预警</span>
            </div>
            <!-- <div class="cardTitle cardTitle2">
              <img src="../../assets/newW/detailsTitleIcon3.png">
              <span v-for="(item,index) in warningList" :key="index" :class="warningAct==index?'active':''" @click="tabthis2(index)">预警{{index+1}}</span>
            </div> -->
            <div class="a_datas">
              <div class="a_right">
                <div class="one">
                  <img src="../../assets/newW/d_w_icon1.png">
                  <span>预警时间</span>
                  <span class="fR">{{warningList[warningListstatus].warningTime}}</span>
                </div>
                <div class="one">
                  <img src="../../assets/newW/d_w_icon2.png">
                  <span>预警类型</span>
                  <span class="fR">
                    {{warningList[warningListstatus].warningContent}}
                  </span>
                </div>
                <!-- <div class="one">
                  <img src="../../assets/newW/d_w_icon3.png">
                  <span>预警参数</span>
                  <span class="fR">{{warningObj.warningContent}}</span>
                </div> -->
                <div class="one">
                  <img src="../../assets/newW/d_w_icon4.png">
                  <span>预警持续时间</span>
                  <span class="fR">{{warningList[warningListstatus].faultDuration}}</span>
                </div>
                <div class="one">
                  <img src="../../assets/newW/d_w_icon5.png">
                  <span>预警等级</span>
                  <span class="fR">
                    {{dictionaries.criticality[warningList[warningListstatus].warningCriticality]}}
                  </span>
                </div>
              </div>
              <div class="a_right">
                <div class="one">
                  <img src="../../assets/newW/d_w_icon6.png">
                  <span>预警处理建议</span>
                </div>
                <div class="detail" v-html='warningList[warningListstatus].preSolution'>
                </div>
              </div>
              <div class="a_right">
                <div class="one">
                  <img src="../../assets/newW/d_w_icon7.png">
                  <span>预警原因分析</span>
                </div>
                <div class="detail" v-html='warningList[warningListstatus].preReason'>
                </div>
                <div class="warrin">
                  以上数据仅供参考
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 4 -->
      <el-row :gutter="12" class="cuttop corlt">
        <el-col :span="3" class="corlt2">
          <el-card :body-style="{ padding:'0px 30px'}" class="butBg corlt3" style='min-height:210px;'>
            <div class="blueSelect " @click="gomodal">
              <img src="../../assets/newW/coltrIcon.png">
              <p>远程操作</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="21">
          <el-card :body-style="{ padding:'0px 30px'}" class="scrollWarrp" style='overflow:auto;min-height:210px;'>
            <div class="blueSelect">
              <el-select v-model="status" @change="change">
                <el-option :value="i" :key="i" :label="j" v-for="(j,i) in dateRunning.xlist"></el-option>
                <!-- <el-option value="2" label="诊断信息"></el-option> -->

              </el-select>
            </div>
            <div class="cardTitle">
              <img src="../../assets/newW/detailsTitleIcon1.png">
              <span>状态</span>
            </div>
            <div class="b_datas">
              <div class="t_l_box">
                <div class="t_l_flex" v-if="dateRunning.ylist">
                  <div class="onebox " v-for="(item,index) in dateRunning.ylist[status]" :key="index">
                    <div class="onebox_k">
                      <img :src="$imageUrls+item.showIcon+'.png'" @error="defaultImg()">
                      <div>
                        <div class="big m-b">{{item.refValue}}{{item.refUnit}}</div>
                        <div class="small">{{item.refKey}}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 4 -->
      <electric :condition='condition'></electric>
      <modal :breakerObj2='breakerObj' :showF="showF" v-if="showF"></modal>
      <!-- ============================================================================================== -->
    </div>
  </div>
</template>
<script>
import { Card } from 'element-ui';
import http from 'http';
import api from 'api';
import electric from "./common/electric";
import modal from "./common/modal";
import { mapMutations, mapGetters } from 'vuex';
export default {
  components: {
    elCard: Card,
    electric,
    modal
  },
  data() {
    return {
      warningListstatus: 0,
      faultstatus: 0,
      status: 0,
      htt: window.IPConfig,
      condition: {},
      basicInfo: {},
      dateRunning: {},
      timer: null,
      runningList: [],
      breakerObj: {},
      showF: false,
      faultList: [],
      faultAct: 0,
      faultObj: {},
      timeId: '',
      warningList: [],
      warningAct: 0,
      warningObj: {},
      FaultTypeObj: {},
      warningTypeObj: {},
      num: 0,
      timer2: null,
    }
  },
  created() {
    this.getNum();
  },
  computed: {
  },
  mounted() {
    this.getCurState();
    this.getNotHandleFault()
    this.getBasicInfo();
    this.getRunningState();
    this.getNotHandleWarning()
    let that = this;
    this.timer = setInterval(function() {
      that.getNotHandleFault()
      that.getBasicInfo();
      that.getNotHandleWarning()
    }, 20000);
    this.timer2 = setInterval(function() {
      that.getRunningState();
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    this.timer = null;
    this.timer2 = null;

  },
  methods: {
    ...mapMutations('login', ['setSinglenum']),
    defaultImg() {
      let img = event.srcElement;
      img.src = require("../../assets/newW/view.png");
      img.onerror = null; //防止闪图
    },
    getNum() {
      this.condition.breakerCode = this.$route.query.breakerCode;
      if(this.$route.query.num) {
        this.num = this.$route.query.num;
      } else {
        this.num = 0
      }
    },
    goback() {
      this.setSinglenum(this.num)
      this.$router.push('/tree');
    },
    goback2() {
      this.setSinglenum('-1')
      this.$router.push('/tree');
    },
    handleClick() {

    },
    //基本信息
    getBasicInfo() {
      http(api.getBasicInfo, this.condition).then(res => {
        this.basicInfo = res
      })
    },

    //设备运行状态
    getRunningState() {
      http(api.getRunningState, this.condition).then(res => {
        // let name = 'breakerPoint' + this.status;
        this.dateRunning = res
        // this.runningList = this.dateRunning[name]
      })
    },
    change(e) {

      let name = 'breakerPoint' + e;
      this.runningList = this.dateRunning[name]
    },
    getCurState() {
      http(api.getCurState, this.condition).then(res => {
        this.breakerObj = res;
      })
    },
    gomodal() {
      this.getCurState()
      this.showF = true
    }, fatherMethod() {
      this.showF = false
    },
    getNotHandleFault() {
      http(api.getNotHandleFault, this.condition).then(res => {
        this.faultList = res;
        this.faultObj = this.faultList[this.faultAct]
      })
    },
    tabthis(index) {
      this.faultAct = index;
      this.faultObj = this.faultList[this.faultAct];

    },
    tabthis2(index) {
      this.warningAct = index;
      this.warningObj = this.warningList[this.faultAct];

    },
    getNotHandleWarning() {
      http(api.getNotHandleWarning, this.condition).then(res => {
        this.warningList = res;
        this.warningObj = this.warningList[this.warningAct]
      })
    },
    delOne(item) {
      this.$router.push({
        path: "/faultRecording",
        query: {
          breakerCode: this.breakerObj.breakerCode,
          time: item.faultTime,
          domainNameStr: this.breakerObj.breakerName
        }
      });
    },
  }
}
</script>
<style lang="less" scoped>
@import "./less/product.less";
.active {
  color: #537ffd;
}
.cardTitle2 {
  width: 100%;
  overflow: auto;
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
  span {
    display: inline-block;
    padding-left: 10px;
    font-weight: bold;
    font-size: 1.6rem;
    cursor: pointer;
  }
}
.posback {
  position: absolute;
  right: 10px;
  top: 15px;
}
</style>