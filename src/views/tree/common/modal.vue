<template>
  <el-dialog title="远程控制" class="dialogClass  lingBut " :visible.sync="showF" :close-on-click-modal="false" :before-close="handleClose" width="700px">
    <div class="b_datas cutline" style="overflow: auto;">
      <div class="passBox" v-if="passNo">
        <el-input placeholder="请输入验证密码" v-model="passwords" type="password" class="inputs appendsINput prependINput">
          <template slot="prepend"><img src='../../../assets/newW/lock.png'></template>
          <template slot="append">
            <img src='../../../assets/newW/Group.png'>
          </template>
        </el-input>
        <div class="dialog-footer">
          <el-button type="primary" :disabled="!passwords" class="btnSty" @click="passWordConfirm">
            确定
          </el-button>
        </div>
      </div>
      <div class="b_datas3 " v-if="!passNo">
        <div>
          <div v-if="type=='DBG'&&dateRunning.ylist&&dateRunning.ylist.length>0">
            <div class="title">设备此时状态</div>
            <div>
              <div v-for="(item,index) in dateRunning.ylist[0]" :key='index' v-if="isturns(item.refKey)">
                {{item.refKey}}：{{item.refValue}}
                <el-button class="btnSty2 m_lg" v-if="item.refValue=='断开'||item.refValue=='闭合'" @click="breakerCmdDbGbe(item)">
                  {{item.refKey=='DO1'?'远程合闸':item.refKey=='DO2'?'远程分闸':'输出闭合'}}
                </el-button>
              </div>
              <!--  v-if="item.refValue==1||item.refValue==0" -->

            </div>

          </div>

        </div>

        <div v-if="type!='DBG'">
          <div>
            <div class="title">设备此时状态</div>
            <div v-if="breakerObj.linkFlag=='0'">
              <el-tag class="btnSty2 gray">
                离线
              </el-tag>
            </div>
            <div v-if="breakerObj.linkFlag=='1'">
              <el-tag class="btnSty2 red" v-if="breakerObj.faultFlag==' 1'">
                故障
              </el-tag>
              <el-tag class="btnSty2 orgia" v-if="breakerObj.warningFlag==' 1'">
                预警
              </el-tag>
              <span v-if="type=='NDM'||type=='NDB'||type=='NDW'">
                <el-tag class="btnSty2 red" v-if="breakerObj.runningFlag=='1'">
                  合闸
                </el-tag>
                <el-tag class="btnSty2 green" v-if="breakerObj.runningFlag=='0'">
                  分闸
                </el-tag>
              </span>
              <span v-if="breakerObj.breakerLargeType=='NDQ5'">
                <el-tag class="btnSty2 green" v-if="breakerObj.runningFlag=='0'">
                  全分
                </el-tag>
                <el-tag class="btnSty2 red" v-if="breakerObj.runningFlag=='1'">
                  Qs1合闸
                </el-tag>
                <el-tag class="btnSty2 red" v-if="breakerObj.runningFlag=='2'">
                  Qs2合闸
                </el-tag>
                <el-tag class="btnSty2 red" v-if="breakerObj.runningFlag=='3'">
                  Qs3合闸
                </el-tag>
              </span>
              <span v-if="breakerObj.breakerLargeType=='NDQ3'">
                <el-tag class="btnSty2 green" v-if="breakerObj.runningFlag=='0'">
                  双分
                </el-tag>
                <el-tag class="btnSty2 red" v-if="breakerObj.runningFlag=='1'">
                  常用合闸
                </el-tag>
                <el-tag class="btnSty2 red" v-if="breakerObj.runningFlag=='2'">
                  备用合闸
                </el-tag>
              </span>
            </div>
          </div>
          <div v-if="type=='NDM'||type=='NDB'">
            <div class="title">试跳指令</div>
            <el-form inline style="margin-top:10px">
              <el-form-item>
                <el-select v-model="param.protection" clearable placeholder="试跳类型">
                  <el-option v-for="item in options.trialParam" :value="item.value" :label="item.key">{{item.key}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="param.open" clearable placeholder="是否脱扣">
                  <el-option v-for="item in options.isParam" :value="item.value" :label="item.key">{{item.key}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button class="btnSty3" @click="breakerCmdTrial('0400','FFAA','远程试跳')">
                  远程试跳
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <div class="title">遥控指令</div>
            <div v-if="breakerObj.breakerLargeType=='NDQ5'">
              <el-button class="btnSty2" @click="breakerCmdControlQ('0900','aaaa','遥控命令使能')">
                遥控命令使能
              </el-button>
              <el-button class="btnSty2" @click="breakerCmdControlQ('0900','55aa','遥控Qs1合闸')">
                远程Qs1合闸
              </el-button>
              <el-button class="btnSty2" @click="breakerCmdControlQ('0900','aa55','遥控Qs2合闸')">
                远程Qs2合闸
              </el-button>
              <el-button class="btnSty2" @click="breakerCmdControlQ('0900','5a5a','遥控Qs3合闸')">
                远程Qs3合闸
              </el-button>
            </div>
            <div v-if="breakerObj.breakerLargeType=='NDQ3'">
              <el-button class="btnSty2" @click="breakerCmdControlQ('00E0','aaaa','遥控命令使能')">
                遥控命令使能
              </el-button>
              <el-button class="btnSty2" @click="breakerCmdControlQ('00E0','55aa','遥控常用合闸')">
                遥控常用合闸
              </el-button>
              <el-button class="btnSty2" @click="breakerCmdControlQ('00E0','aa55','遥控备用合闸')">
                遥控备用合闸
              </el-button>
              <el-button class="btnSty2" @click="breakerCmdControlQ('00E0','5555','遥控双分')">
                遥控双分
              </el-button>
            </div>
            <div v-if="type=='NDM'||type=='NDB'">
              <el-button class="btnSty2" @click="breakerCmdOpenClose('0400','FF00','远程分闸')">
                远程分闸
              </el-button>
              <el-button class="btnSty2" @click="breakerCmdOpenClose('0400','00FF','远程合闸')">
                远程合闸
              </el-button>
            </div>
            <div v-if="type=='NDW'">
              <el-button class="btnSty2" @click="breakerCmdControlW('0400','5555','分闸指令')">
                分闸指令
              </el-button>
              <el-button class="btnSty2" @click="breakerCmdControlW('0400','CCCC','脱扣指令')">
                脱扣指令
              </el-button>
              <el-button class="btnSty2" @click="breakerCmdControlW('0400','AAAA','合闸指令')">
                合闸指令
              </el-button>
            </div>
          </div>
          <div v-if="type=='NDM3E配电型'">
            <div class="title">脱扣试验</div>
            <div>
              <el-button class="btnSty2" @click="breakerCmdTrialM3ep('002F','ffaa ','脱口试验')">
                脱扣试验
              </el-button>
            </div>
          </div>
        </div>
        <!-- <div>
          <div class="title">定时控制</div>
          <el-button class="btnSty2" @click="timeControl">
            定时控制
          </el-button>
        </div> -->

      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Dialog, Tag } from 'element-ui';
import http from 'http';
import api from 'api';
export default {
  components: {
    elDialog: Dialog,
    elTag: Tag
  },
  props: {
    showF: {
      type: Boolean,
    },
    breakerObj2: {
      type: Object,
    }
  },
  data() {
    return {
      passNo: true,//密码
      passwords: '',
      controlForm: {},
      type: '',
      param: {},
      dateRunning: {},
      timer2: null,
      breakerObj: {}

    }
  },
  created() {
    this.breakerObj = this.breakerObj2
    if(this.breakerObj.breakerLargeType == 'NDM3E配电型 ') {
      this.type = 'NDM3E配电型';
      return
    }
    let str = this.breakerObj.breakerLargeType
    this.type = str.substring(0, 3);
    // console.log(this.type)
    if(this.type == 'DBG') {
      this.getRunningState()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer2);
    this.timer2 = null
  },
  methods: {

    isturns(data) {

      if(data) {
        let num = ''
        num = data.substring(0, 2);
        if(num == 'DO') {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    passWordConfirm() {
      http(api.checkBreakerCmdPassword, {
        pwd: this.passwords,
        stationCode: this.breakerObj.stationCode
      }).then(res => {
        if(res.type) {
          this.$message({
            type: "error",
            message: '账号密码已被锁定，请联系管理员解锁'
          });
          return;
        }
        if(res == '0') {
          this.$message({
            type: "success",
            message: '密码正确'
          });
          this.passNo = false;
        } else {
          this.$message({
            type: "error",
            message: '还有' + res + '机会，密码将被锁定'
          });
        }
      })
    },
    //分合闸命令下发 M5 M3 B5
    breakerCmdOpenClose(refKey, refValue, mess) {
      let obj = {
        breakerCode: this.breakerObj.breakerCode,
        refKey: refKey,
        refValue: refValue,
      }
      http(api.breakerCmdOpenClose, obj).then(res => {
        this.getBreakerCmdAck(res, mess)
      })
    },
    //遥控q3q5
    breakerCmdControlQ(refKey, refValue, mess) {
      let obj = {
        breakerCode: this.breakerObj.breakerCode,
        refKey: refKey,
        refValue: refValue,
      }
      http(api.breakerCmdControlQ, obj).then(res => {
        this.getBreakerCmdAck(res, mess)
      })
    },
    //遥控w2w3
    breakerCmdControlW(refKey, refValue, mess) {
      let obj = {
        breakerCode: this.breakerObj.breakerCode,
        refKey: refKey,
        refValue: refValue,
      }
      http(api.breakerCmdControlW, obj).then(res => {
        this.getBreakerCmdAck(res, mess)
      })
    },
    breakerCmdTrial(refKey, refValue, mess) {
      let obj = {
        breakerCode: this.breakerObj.breakerCode,
        refKey: refKey,
        refValue: refValue,
        ...this.param
      }
      http(api.breakerCmdTrial, obj).then(res => {
        this.getBreakerCmdAck(res, mess)
      })
    },
    breakerCmdTrialM3ep(refKey, refValue, mess) {
      let obj = {
        breakerCode: this.breakerObj.breakerCode,
        refKey: refKey,
        refValue: refValue,
      }
      http(api.breakerCmdTrialM3ep, obj).then(res => {
        this.getBreakerCmdAck(res, mess)
      })
    },
    getBreakerCmdAck(id, mess) {
      this.$message({
        type: "success",
        message: mess + "命令下发成功"
      });
      let that = this;
      let i = 0

      this.timer2 = setInterval(function() {
        that.getCurState();
        if(i > 5) {
          clearInterval(that.timer2);
          that.timer2 = null
        }
        i++
      }, 5000);


    },
    handleClose(done) {
      this.$parent.fatherMethod();
    },
    getRunningState() {
      http(api.getRunningState, { breakerCode: this.breakerObj.breakerCode, }).then(res => {
        this.dateRunning = res
      })
    },
    breakerCmdDbGbe(item) {
      let refKey = '';
      let refValue = '';
      let mess = ''
      refKey = item.refKeyHex
      if(item.refValue == '闭合') {
        refValue = 'FFFF'
        mess = '断开'
      } else {
        refValue = 'FF00'
        mess = '闭合 '
      }
      let obj = {
        breakerCode: this.breakerObj.breakerCode,
        refValue: refValue,
        refKey: refKey
      }
      http(api.breakerCmdDbGbe, obj).then(res => {
        this.getRunningState()
        this.getBreakerCmdAck(res, mess)
      })
    },
    getCurState() {
      http(api.getCurState, { breakerCode: this.breakerObj.breakerCode, }).then(res => {
        this.breakerObj = res;
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import "../less/product.less";
.b_datas {
  min-height: 300px;
  border-top: 1px solid #eee;
  padding-top: 15px;
  .passBox {
    padding: 100px 50px 0 50px;
    .dialog-footer {
      text-align: center;
      margin-top: 100px;
      .el-button {
        padding: 15px 40px !important;
      }
    }
  }
  .btnSty2 {
    padding: 8px 20px !important;
    line-height: 1.8rem;
    // width: 90px;
    text-align: center;
    height: 3rem;
    margin: 10px 10px 10px 0;
  }
  .btnSty3 {
    padding: 8px 16px !important;
    line-height: 1.8rem;
    width: 90px;
    text-align: center;
    height: 3rem;
  }
  .title {
    color: rgba(58, 63, 99, 1);
    font-size: 1.4rem;
    font-weight: bold;
  }
}
.el-form-item {
  margin-right: 10px !important;
}
.gray {
  background: #f5f5f5;
  color: #858ebd;
}
.orgia {
  background: rgba(255, 166, 29, 0.2);
  color: rgba(255, 166, 29, 1);
}
.red {
  background: rgba(255, 69, 63, 0.2);
  color: rgba(255, 69, 63, 1);
}
.green {
  background: rgba(94, 214, 200, 0.2);
  color: rgba(94, 214, 200, 1);
}
.blue {
  background: rgba(45, 120, 255, 0.2);
  color: rgba(45, 120, 255, 1);
}
.m_lg {
  margin-left: 80px !important;
}
</style>