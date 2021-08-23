<template>
  <ul class="seamless-warps scrollWarrp">
    <div v-if="breakerFaultList.length>0">
      <li class="listbox" v-for="(item,index) in breakerFaultList" :key="index" @click="childMethod(item)">
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
  created() {
    console.log(this.flag)
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
    childMethod(item) {
      // this.$parent.goother(flag, item);
      let name = ''
      if(this.flag == 3) {
        name = 'repairMag'
      } else {
        name = 'faultMag'
      }
      this.$router.push('/' + name);
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
  background-size: 100% 3px;
  background-position: left bottom;
  .oneBg {
    background: rgba(255, 124, 72, 0.1);
    border: 1px solid rgba(255, 124, 72, 0.4);
    color: rgba(255, 124, 72, 1);
  }
  .twoBg {
    background: rgba(42, 121, 255, 0.1);
    border: 1px solid rgba(42, 121, 255, 0.4);
    color: rgba(42, 121, 255, 1);
  }
  .listIndex {
    background-size: 100% 100%;
    width: 36px !important;
    height: 36px;
    margin-right: 10px;
    float: left;
    text-align: center;
    line-height: 34px;
    font-weight: bold;
    border-radius: 10px;
    margin-top: 5px;
  }
  .listR {
    width: 90%;
  }
  .one {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #8590b3;
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
      color: #8590b3;
    }
    .three {
      overflow: hidden;
      color: #333333;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
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