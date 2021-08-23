<template>
  <div class="contents lingBut">
    <div class="warrp">
      <div class="tabs">
        {{keyss[type]}}详情
      </div>
      <div class="detailBox">
        <div class="title"><img src='../../assets/newW/detailicon1.png'><span> {{keyss[type]}}描述</span>
          <el-tag size="small" type="danger">等级： {{dictionaries.criticality[faultObj.faultWarningCriticality]}}</el-tag>
        </div>
        <div class="a_datas">
          <div class="a_right">
            <div class="one">
              <img src="../../assets/newW/f_d_icon1.png">
              <span> {{keyss[type]}}时间</span>
              <span class="fR">{{faultObj.faultWarningTime}}</span>
            </div>
            <div class="one">
              <img src="../../assets/newW/f_d_icon2.png">
              <span> {{keyss[type]}}位置</span>
              <span class="fR">{{faultObj.domainNameStr}}</span>
            </div>
          </div>
          <div class="a_right">
            <div class="one">
              <img src="../../assets/newW/f_d_icon3.png">
              <span> {{keyss[type]}}类型</span>
              <span class="fR">
                {{faultObj.faultWarningContent}}
              </span>
            </div>
            <div class="one">
              <img src="../../assets/newW/f_d_icon5.png">
              <span> {{keyss[type]}}设备</span>
              <span class="fR">{{faultObj.breakerName}}</span>
            </div>
            <!-- <div class="one">
              <img src="../../assets/newW/f_d_icon5.png">
              <span>故障参数</span>
              <span class="fR">{{faultObj.faultWarningContent}}</span>
            </div> -->

          </div>
          <div class="a_right">
            <div class="one">
              <img src="../../assets/newW/f_d_icon1.png">
              <span> {{keyss[type]}}持续</span>
              <span class="fR">{{faultObj.faultWarningDuration}}</span>
            </div>
            <!-- <div class="one">
              <img src="../../assets/newW/f_d_icon3.png">
              <span>设备型号</span>
              <span class="fR">NDM5E-400L 400/3/22</span>
            </div> -->
          </div>

        </div>
      </div>
      <div class="detailBox">
        <div class="title"><img src='../../assets/newW/detailicon2.png'><span> {{keyss[type]}}可能产生的原因</span>
        </div>
        <div class="b_datas">
          <div class="words" v-html="faultObj.preReason"></div>
        </div>
      </div>
      <div class="detailBox">
        <div class="title"><img src='../../assets/newW/detailicon3.png'><span>指导建议</span>
        </div>
        <div class="b_datas">
          <div class="words" v-html="faultObj.preSolution"></div>
        </div>
      </div>
      <div class="detailBox" v-if="faultObj.repairState==9||faultObj.repairState==6">
        <div class="title"><img src='../../assets/newW/detailicon4.png'><span>真实原因</span>
        </div>
        <div class="b_datas">
          <div class="words">{{faultObj.realReason}}</div>
        </div>
      </div>
      <div class="detailBox" v-if="faultObj.repairState==9||faultObj.repairState==6">
        <div class="title"><img src='../../assets/newW/detailicon5.png'><span>处理方案</span>
        </div>
        <div class="b_datas">
          <div class="words">{{faultObj.realSolution}}</div>
        </div>
      </div>
      <div class="detailBox" v-if="faultObj.repairState==9||faultObj.repairState==6">
        <div class="title"><img src='../../assets/newW/detailicon6.png'><span>附件</span>
        </div>
        <div class="b_datas">
          <div class="listData imageBox" v-for="(item,index) in faultObj.repairFileList" :key="index">
            <el-button type="text" class="FR" @click="lookimag(item)"> 查看 </el-button>
            <el-button type="text" class="FR" @click="downimag(item)">下载 </el-button>
            <img src="../../assets/newW/fd_fjicon.png"><span>附件{{index+1}}</span>

          </div>
        </div>
      </div>
      <div class="detailBox">
        <div class="title"><img src='../../assets/newW/detailicon7.png'><span>运维人员</span>
        </div>
        <div class="b_datas">
          <div class="words imageBox Flex">
            <div class="words_go">
              <div class="one">默认</div>
              <div><span class="two">{{faultObj.handleAccountName}}</span><span class="three">送达<i class="el-icon-check"></i></span></div>
              <div>{{faultObj.dispatchTime}}</div>
            </div>
            <div class="words_go"><img src="../../assets/newW/fd_jt.png"></div>
            <div class="words_go">
              <div class="one" v-if="faultObj.repairState==9||faultObj.repairState==6">已处理</div>
              <div class="oness" v-else>待处理</div>
              <div><span class="two">{{faultObj.handleAccountName}}</span><span class="three" v-if="faultObj.repairState==9||faultObj.repairState==6">送达<i class="el-icon-check"></i></span></div>
              <div v-if="faultObj.repairState==9||faultObj.repairState==6">{{faultObj.toAuditTime}}</div>
              <div v-else>{{faultObj.handleTime}}</div>
            </div>
            <div class="words_go"><img src="../../assets/newW/fd_jt.png"></div>
            <div class="words_go">
              <div class="one" v-if="faultObj.repairState==9">已审核</div>
              <div class="oness" v-else>待审核</div>
              <div><span class="two">{{faultObj.auditAccountName}}</span><span class="three" v-if="faultObj.repairState==9">送达<i class="el-icon-check"></i></span></div>
              <div v-if="faultObj.repairState==9">{{faultObj.auditTime}}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <modal :repairId='String(repairId)' :dialog='dialog' v-if="dialog"></modal>
    <imagess :objImage="objImage" v-if="imageDioag"></imagess>
  </div>
</template>
<script>
import { Dialog, Tag } from 'element-ui';
import modal from './detailModalInput'
import http from 'http';
import api from 'api';
import scripts from './js/min';
import imagess from './images';
export default {
  mixins: [scripts],
  components: {
    elDialog: Dialog,
    elTag: Tag,
    modal,
    imagess
  },
  data() {
    return {
      dialog: false,
      repairId: '',
      iid: '',
      faultObj: {},
      fileList: [],
      type: '',
      keyss: {
        1: '故障',
        2: '预警'
      }
    }
  },
  created() {
    this.getNum()
  },
  computed: {
  },
  mounted() {
    if(this.$route.query.type && this.$route.query.type == 2) {
      this.type = this.$route.query.type
      this.detail2()
    } else if(this.$route.query.type && this.$route.query.type == 1) {
      this.type = this.$route.query.type
      this.detail()
    }
  },

  methods: {
    getNum() {

      this.iid = this.$route.query.id;
    },
    detail() {
      this.fileList = []
      http(api.detailfault, { id: this.iid }).then(res => {
        this.faultObj = res;
        this.faultObj.repairFileList.forEach((element, index) => {
          this.fileList.push(this.base(element.fileContent, index))
        });

      });
    },
    detail2() {
      this.fileList = []
      http(api.detailwarning, { id: this.iid }).then(res => {
        this.faultObj = res;
        this.faultObj.repairFileList.forEach((element, index) => {
          this.fileList.push(this.base(element.fileContent, index))
        });

      });
    },

    // start() {
    //   this.$confirm('确定开始处理此工单?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.repairHandle()


    //   }).catch(() => {

    //   });
    // },
    // repairHandle() {
    //   http(api.repairHandle, { repairId: this.repairId }).then(res => {
    //     this.$message({
    //       type: "success",
    //       message: "开始处理此工单"
    //     });
    //     this.detail()
    //   });
    // },
    // audit() {
    //   this.dialog = true
    // },
    // fatherMethod() {
    //   this.dialog = false;
    //   this.detail()
    // },

  }
}
</script>
<style lang="less" scoped>
@import "./less/less";
.oness {
  color: #ff453f;
}
</style>