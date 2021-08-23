<template>
  <div class="concent2 scrollWarrp" v-dragscroll.y="true">
    <div class="search">
      <!-- <el-select size="mini" v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <el-button type="primary" size="mini" @click="saveDomainTopo">{{$t("button.save")}}</el-button> -->
    </div>
    <!-- <ve-tree :data="chartData" :extend="chartExtend" :tooltip-formatter="tooltipFormatter" :settings="chartSettings">
          </ve-tree> -->
    <TreeChart :json="treeData" :DomainTopoDelParam="DomainTopoDelParam" :isFun2="isFun" @click-node="clickNode" @father="fatherGet" />
  </div>
</template>
<script>

import api from 'api';
import http from 'http';
import TreeChart from "./common/TreeChart";
import { getSen, setSen } from 'utils'
import { mapGetters, mapMutations } from 'vuex';
import { dragscroll } from 'vue-dragscroll'
export default {
  directives: {
    'dragscroll': dragscroll
  },
  data() {
    this.chartSettings = {}
    this.chartExtend = {
      tooltip: {
        alwaysShowContent: true
      }
    }
    return {
      value: '',
      treeData: {
        domainName: '',
      },
      DomainTopoDelParam: {
        domainTopoDelList: []
      },
      isFun: '0',
      getStationCodes: ''
    }
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
    ...mapGetters('login', ['getIsDomainCode']),
  },
  components: {
    TreeChart
  },
  created() {
    this.getStationCodes = this.getStationCode;
    this.setIsDomainCode(0);
    // if(getSen('treeData')) {
    //   this.treeData = getSen('treeData')
    // }
  },
  mounted() {
    this.getDomainTopoMag();
  },
  watch: {
    getIsDomainCode: {
      handler(val) {
        this.getDomainTopoMag();
      },
      // immediate: true,
      deep: true
    },
    treeData: {
      handler(val) {
        // this.getDomainTopoMag()
        console.log(this.treeData)
      },
      immediate: true,
      deep: true
    },

  },
  methods: {
    ...mapMutations('login', ['setIsDomainCode']),
    getDomainTopoMag() {
      let obj = {
        stationCode: this.getStationCodes
      };
      http(api.getDomainTopoByStationCodeCreate, obj).then(res => {
        this.treeData = res
      })
    },
    saveDomainTopo2() {
      http(api.saveDomainTopo, this.treeData).then(res => {
      })
    },
    saveDomainTopo() {
      http(api.saveDomainTopo, this.treeData).then(res => {
        // this.treeData = res
        this.delDomainTopo()
      })
    },
    delDomainTopo() {
      http(api.delDomainTopo, this.DomainTopoDelParam).then(res => {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.getDomainTopoMag()
      })
    },
    gohome() {

    },
    fatherGet(data) {
    },
    search() {
      setSen('treeData', this.treeData);
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    clickNode: function(node) {
      // eslint-disable-next-line

      console.log(node)
    },
  }
}

</script>
<style lang="less" scoped>
.concent2 {
  background: #fff;
  height: 100%;
  margin: 10px 0;
  border-radius: 5px;
  padding: 20px 10px;
  overflow: auto;
}
.search {
  text-align: right;
}
.butcolor {
  margin-left: 10px;
  background: linear-gradient(to bottom, #6abe83 0%, #92da98 100%);
}
</style> 

