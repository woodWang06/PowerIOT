<template>
  <div class="concent2 scrollWarrp" :class="flag?'whit':'black'" v-dragscroll.y="true">
    <div class="search">
      <div class="lenged" v-if="!type&&flag==1">
        <div class="green"><span></span>在线设备</div>
        <div class="gray"><span></span>离线设备</div>
        <div class="red"><span></span>故障设备</div>
        <div class="orgin"><span></span>预警设备</div>
      </div>
      <el-button type="primary" size="small" class="m_l" v-if="type" @click='getDomainTopo'>{{$t("button.back")}}</el-button>
      <img v-if="flag==0" class="imgClass" src="../../assets/newW/quanp.png" @click="goallshow">
      <el-button type="primary" size="small" class="m_l" v-if="!type&&flag==0" @click='flag=1'>切换拓扑图</el-button>
      <el-button type="primary" size="small" class="m_l" v-if="!type&&flag==1&&getStationCode=='S00157'" @click='flag=0'>切换单线图</el-button>
      <!-- <el-button type="primary" size="small" class="m_l" icon="el-icon-s-grid">批量操作</el-button> -->
    </div>
    <div v-if="flag">
      <TreeChart :json="treeData" @click-node="clickNode" />
    </div>
    <div class="ifrem" v-if="!flag">
      <!-- <iframe v-if="!flag&&num==0" class="ifremBOX" width="100%" height='100%' src="http://localhost:5888/display.html?tag=displays/html/HT.json"></iframe>
      <iframe v-if="!flag&&num==4" class="ifremBOX" width="100%" height='100%' src="http://58.246.211.246:38080/share?url=displays/2c31d918-ef10-47b4-a60b-3ab43571011d.json"></iframe>
      <iframe v-if="!flag&&num==7" class="ifremBOX" width="100%" height='100%' src="http://58.246.211.246:38080/share?url=displays/3fdea48a-7028-44df-bf3a-a91c8347d5ef.json"></iframe> -->
      <iframe v-if="!flag&&num==0" class="ifremBOX" width="100%" height='100%' src="https://magic.sh-liangxin.com:38080/share?url=displays/74199f94-6a03-44ae-ad1f-c9e77be95cf8.json"></iframe>
      <iframe v-if="!flag&&num==4" class="ifremBOX" width="100%" height='100%' src="https://magic.sh-liangxin.com:38080/share?url=displays/2c31d918-ef10-47b4-a60b-3ab43571011d.json"></iframe>
      <iframe v-if="!flag&&num==7" class="ifremBOX" width="100%" height='100%' src="https://magic.sh-liangxin.com:38080/share?url=displays/3fdea48a-7028-44df-bf3a-a91c8347d5ef.json"></iframe>

      <!-- <iframe v-if="!flag" class="ifremBOX" width="100%" height='100%' src=" http://127.0.0.1:32000/share?url=displays/5aab3f8d-735e-4357-ab6c-c33155dcaa3e.json"></iframe> -->

    </div>
  </div>
</template>
<script>
import api from 'api';
import http from 'http';
import TreeChart from "./common/TreeChart";
import { mapMutations, mapGetters } from 'vuex';
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
      treeData: {},
      timer: null,
      type: 0,
      flag: 0,
      num: 0,
    }
  },
  computed: {
  },
  components: {
    TreeChart
  },
  created() {
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  mounted() {
    this.getNum()
    this.getDomainTopo();
    let that = this;
    this.timer = setInterval(function() {
      that.getDomainTopo();
    }, 5000);
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
    ...mapGetters('login', ['getSinglenum']),
  },
  destroyed() {
    this.setSinglenum('0')
  },
  methods: {
    ...mapMutations('login', ['setSinglenum']),
    getNum() {
      if(this.getStationCode == 'S00157') {
        if(this.getSinglenum == '-1') {
          this.flag = 1;
          this.num = 0
        } else if(this.getSinglenum && this.getSinglenum != '0') {
          this.flag = 0;
          this.num = this.getSinglenum
        } else {
          this.flag = 0;
          this.num = 0
        }
      } else {
        this.flag = 1;
        this.num = 0
      }


    },

    getDomainTopo() {
      let obj = {
        stationCode: this.getStationCode
      };
      http(api.getDomainTopoByStationCode, obj).then(res => {
        this.type = 0
        this.treeData = res
      })


    },
    gohome() {

    },
    goControl() {
      this.$router.push('/control');
    },
    getDomainTopoByDomainCode(item) {
      let obj = {
        stationCode: item.stationCode,
        domainCode: item.domainCode
      };
      http(api.getDomainTopoByDomainCode, obj).then(res => {
        this.type = 1
        this.treeData = res
      })
    },
    clickNode: function(node) {
      // eslint-disable-next-line
      if(node.domainCode != "0000000000") {
        this.getDomainTopoByDomainCode(node)
      }

      console.log(node)
    },
    goallshow() {
      this.$router.push('/singleLine');

    }
  }
}

</script>
<style lang="less" scoped>
.ifrem {
  width: 100%;
  height: calc(80vh);
  margin-top: 10px;
}
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
.m_l {
  margin-left: 10px;
}
.whit {
  background: #fff;
}
.black {
  background: #000;
}
.ifrem {
  border: 0 !important;
  .ifremBOX {
    border: 0 !important;
  }
}
.imgClass {
  display: inline-block;
  width: 25px;
  margin: 0px 20px;
  vertical-align: middle;
}
.lenged {
  float: left;
  font-size: 1.4rem;
  line-height: 2rem;
  vertical-align: middle;
  .gray {
    color: #999;
    vertical-align: middle;
    span {
      vertical-align: middle;
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #999;
      border-radius: 5px;
      line-height: 2rem;
      margin-top: -5px;
      margin-left: 20px;
      margin-right: 10px;
    }
  }
  .green {
    color: #8ddb77;
    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #8ddb77;
      border-radius: 5px;
      line-height: 2rem;
      margin-top: -5px;
      margin-left: 20px;
      margin-right: 10px;
    }
  }
  .orgin {
    color: #e19f53;
    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #e19f53;
      border-radius: 5px;
      line-height: 2rem;
      margin-top: -5px;
      margin-left: 20px;
      margin-right: 10px;
    }
  }
  .red {
    color: #cd0f0f;
    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #cd0f0f;
      border-radius: 5px;
      line-height: 2rem;
      margin-top: -5px;
      margin-left: 20px;
      margin-right: 10px;
    }
  }
}
</style> 

