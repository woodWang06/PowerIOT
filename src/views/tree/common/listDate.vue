<template>
  <div class="box">
    <!-- <div class="top">
      <span>最新上传时间：2020/9/24 8:23:17</span>
      <i class="el-icon-refresh"></i>
    </div> -->
    <div>
      <div :class="flag=='1'?'vox':flag=='0'?'vox1':'vox2'" v-for="item in data">{{item.key}}：{{item.value}}</div>
    </div>
  </div>
</template>
<script>
import { Card, DatePicker, Tabs, TabPane } from 'element-ui';
import http from 'http';
import api from 'api';
export default {
  props: ["data", 'flag'],
  components: {
    elCard: Card,
    elTabs: Tabs,
    elTabPane: TabPane
  },
  data() {
    return {
      activeName: '1'
    }
  },
  created() {
  },
  computed: {
  },
  mounted() {

  },
  methods: {
    handleClick() {

    }
  }
}
</script>
<style lang="less" scoped>
.vox {
  display: inline-block;
  width: 100%;
  text-align: left;
  // border: 1px solid #ddd;
  // margin: 10px 3% 10px 0px;
  font-size: 1.2rem;
  line-height: 30px;
  border-radius: 5px;
  color: #666;
  // padding-left: 10px;
}
.vox1 {
  display: inline-block;
  width: 25%;
  text-align: left;
  // border: 1px solid #ddd;
  // margin: 10px 3% 10px 0px;
  font-size: 1.2rem;
  line-height: 30px;
  border-radius: 5px;
  color: #666;
  // padding-left: 10px;
}
.vox2 {
  display: inline-block;
  width: 33%;
  text-align: left;
  // border: 1px solid #ddd;
  // margin: 10px 3% 10px 0px;
  font-size: 1.2rem;
  line-height: 30px;
  border-radius: 5px;
  color: #666;
  // padding-left: 10px;
}
.top {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  span {
    color: #999;
    font-size: 1.2rem;
    margin-right: 10px;
  }
}
.box {
  padding: 0 10px;
}
</style>