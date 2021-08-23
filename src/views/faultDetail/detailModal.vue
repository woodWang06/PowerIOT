<template>
  <div>
    <el-dialog title="工单详情" class="dialogClass" :visible.sync="dialog" :before-close="handleClose" :close-on-click-modal="false" width="900px">
      <div v-if="dialog">
        <div class="detailBox">
          <div class="title"><img src='../../assets/newW/detailicon1.png'><span> {{keyss[type]}}描述</span>
            <!-- <el-tag size="small" type="danger">等级：{{dictionaries.repairLevel[addObj.repairLevel]}}</el-tag> -->
          </div>
          <div class="a_datas">
            <div class="b_right">
              <div class="one">
                <img src="../../assets/newW/f_d_icon2.png">
                <span> {{keyss[type]}}位置</span>
                <span class="fR">{{addObj.domainNameStr}}</span>
              </div>
              <div class="one">
                <img src="../../assets/newW/f_d_icon3.png">
                <span> {{keyss[type]}}类型</span>
                <span class="fR"> {{addObj.faultWarningContent}}</span>
              </div>
              <div class="one">
                <img src="../../assets/newW/f_d_icon1.png">
                <span> {{keyss[type]}}时间</span>
                <span class="fR">{{addObj.dispatchTime}}</span>
              </div>
            </div>
            <div class="b_right">
              <div class="one">
                <img src="../../assets/newW/f_d_icon5.png">
                <span> {{keyss[type]}}设备</span>
                <span class="fR">{{addObj.breakerName}}</span>
              </div>
              <div class="one">
                <img src="../../assets/newW/f_d_icon1.png">
                <span> {{keyss[type]}}持续</span>
                <span class="fR">{{addObj.faultWarningDuration}}</span>
              </div>
              <div class="one">
                <img src="../../assets/newW/f_d_icon8.png">
                <span> {{keyss[type]}}等级</span>
                <span class="fR"> {{dictionaries.criticality[addObj.faultWarningCriticality]}}</span>
              </div>

              <!-- <div class="one">
                <img src="../../assets/newW/f_d_icon9.png">
                <span>故障处理</span>
                <span class="fR"> {{addObj.realSolution}}</span>
              </div>
              <div class="one">
                <img src="../../assets/newW/f_d_icon5.png">
                <span>故障参数</span>
                <span class="fR">{{addObj.preReason}}</span>
              </div> -->
            </div>

          </div>
        </div>
        <div class="detailBox">
          <div class="title"><img src='../../assets/newW/detailicon4.png'><span>真实原因</span>
          </div>
          <div class="b_datas">
            <div class="words">{{addObj.realReason}}</div>
          </div>
        </div>
        <div class="detailBox">
          <div class="title"><img src='../../assets/newW/detailicon5.png'><span>处理方案</span>
          </div>
          <div class="b_datas">
            <div class="words">
              {{addObj.realSolution}}
            </div>
          </div>
        </div>
        <div class="detailBox">
          <div class="title"><img src='../../assets/newW/detailicon6.png'><span>附件</span>
          </div>
          <div class="b_datas">
            <div class="listData imageBox" v-for="(item,index) in addObj.repairFileList" :key="index">
              <el-button type="text" class="FR" @click="lookimag(item)"> 查看 </el-button>
              <el-button type="text" class="FR" @click="downimag(item)">下载 </el-button>
              <img src="../../assets/newW/fd_fjicon.png"><span>附件{{index+1}}</span>

            </div>
          </div>
        </div>

        <div class="detailBox">
          <div class="title"><img src='../../assets/newW/detailicon8.png'><span>其他信息</span>
            <!-- <el-tag size="small" type="danger">等级：高</el-tag> -->
          </div>
          <div class="a_datas">
            <div class="b_right">
              <div class="one">
                <img src="../../assets/newW/f_d_icon12.png">
                <span>运维人员</span>
                <span class="fR"> {{addObj.handleAccountName}}</span>
              </div>
              <div class="one">
                <img src="../../assets/newW/f_d_icon1.png">
                <span>工单生成时间</span>
                <span class="fR"> {{addObj.dispatchTime}}</span>
              </div>
              <div class="one">
                <img src="../../assets/newW/f_d_icon1.png">
                <span>完成时间</span>
                <span class="fR"> {{addObj.toAuditTime}}</span>
              </div>

            </div>
            <div class="b_right">
              <div class="one">
                <img src="../../assets/newW/f_d_icon11.png">
                <span>处理状态</span>
                <span class="fR"> {{dictionaries.repairState[addObj.repairState]}}</span>

              </div>
              <div class="one">
                <img src="../../assets/newW/f_d_icon1.png">
                <span>开始时间</span>
                <span class="fR"> {{addObj.handleTime}}</span>
              </div>
              <div class="one">
                <img src="../../assets/newW/f_d_icon1.png">
                <span>处理周期</span>
                <span class="fR">
                  {{addObj.faultWarningDuration}}
                </span>
              </div>
            </div>

          </div>
        </div>
        <div class="detailBox">
          <div class="title"><img src='../../assets/newW/detailicon3.png'><span>领导意见</span>
          </div>
          <div class="b_datas">
            <div class="words">
              <el-input type="textarea" placeholder="请填写" v-model="description" maxlength="200" show-word-limit>
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer-center">
        <el-button type="danger" @click="auditReject">
          驳回
        </el-button>
        <el-button type="primary" @click="auditPass">
          批准
        </el-button>
      </span>
    </el-dialog>
    <imagess :objImage="objImage" v-if="imageDioag"></imagess>
  </div>
</template>

<script>
import { Dialog, Tag } from 'element-ui';
import http from 'http';
import api from 'api';
import scripts from '../faultDetail/js/min';
import imagess from './images';
export default {
  mixins: [scripts],
  components: {
    elDialog: Dialog,
    elTag: Tag,
    imagess
  },
  props: {
    addObj: {
      type: Object,
      default: '',

    },
  },
  mounted() {
    this.type = this.addObj.repairType
  },
  data() {
    return {
      dialog: true,
      description: '',
      type: '',
      keyss: {
        1: '故障',
        2: '预警'
      }
    }
  },
  methods: {
    auditReject() {
      http(api.auditReject, { repairId: this.addObj.repairId, description: this.description }).then(res => {
        this.$message({
          type: "success",
          message: "驳回成功"
        });
        this.handleClose()
      });
    },
    auditPass() {
      http(api.auditPass, { repairId: this.addObj.repairId, description: this.description }).then(res => {
        this.$message({
          type: "success",
          message: "批准成功"
        });
        this.handleClose()
      });
    },
    handleClose(done) {
      this.$parent.fatherMethod();
    }
  }
}
</script>

<style lang="less" scoped>
@import "./less/less";
</style>