<template>
  <ul class="seamless-warps scrollCenter">
    <div v-if="breakerFaultList.length>0">
      <li class="listbox" v-for="(item,index) in breakerFaultList" :key="index" v-if="index<5" @click="childMethod('2',item)">
        <div class="listIndex" :class="flag=='3'?'twoBg':'oneBg'">{{index+1}}</div>
        <div class="listR">
          <div class="listBot" v-if="flag==1">
            <span class="three">{{item.faultContent}}</span>
            <span class="one">{{item.faultTime}}</span>
          </div>
          <div class="listBot" v-if="flag==2">
            <span class="three">{{item.warningContent}}</span>
            <span class="one">{{item.warningTime}}</span>
          </div>
          <div class="listBot" v-if="flag==3">
            <span class="three" v-if="item.repairState==0">待处理</span>
            <span class="three" v-if="item.repairState==3">处理中</span>
            <span class="three" v-if="item.repairState==6">待审核</span>
            <span class="one">{{item.submitTime}}</span>
          </div>
          <div class="listBot">
            <span class="two">{{item.domainNameStr}}/{{item.breakerName}}
            </span>
          </div>
        </div>
      </li>
    </div>
    <div v-else class="nodata">暂无数据</div>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      timeId: '',
      sday: '',
      wearther: {},
    }
  },
  props: {
    breakerFaultList: {
      type: Array,
    },
    flag: {
      type: String,
    },
  },
  methods: {
    childMethod(flag, item) {
      this.$parent.goother(flag, item);
    }
  }
}
</script>

<style lang="less" scoped>
.seamless-warps {
  width: 98%;
  overflow: auto;
  padding-bottom: 10px;
  height: 90%;
  margin-bottom: 10px;
}
ul li:nth-child(odd) {
  // background: url("../../assets/center/listBg.png") no-repeat;
  background-size: 100% 100%;
}
.listbox {
  font-size: 1.3rem;
  line-height: 2.1rem;
  height: 4.5rem;
  text-align: left;
  list-style: none;
  cursor: pointer;
  padding: 5px 0;
  background: url("../../../assets/new/listLine.png") no-repeat;
  background-size: 100% 3px;
  background-position: left bottom;
  .oneBg {
    background: url("../../../assets/new/listicon1.png") no-repeat;
  }
  .twoBg {
    background: url("../../../assets/new/listicon2.png") no-repeat;
  }
  .listIndex {
    background-size: 100% 100%;
    width: 32px !important;
    height: 32px;
    color: #000;
    margin-right: 10px;
    float: left;
    text-align: center;
    line-height: 32px;
    font-weight: bold;
  }
  .listR {
    width: 90%;
  }
  .one {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #6f7385;
  }
  .listBot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .two {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #d5d5d5;
    }
    .three {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #de731c;
    }
  }
}
.nodata {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  color: #86a6d9;
}
</style>