<template>
  <div>
    <el-row :gutter="12" class="cuttop">
      <el-col :span="24">
        <el-card :body-style="{ padding:'0px 30px'}" v-if="obj.xlist&&obj.xlist.length>0&&options.length>0">
          <div class="blueSelect">
            <el-select v-model="value" placeholder="请选择" @change="changes">
              <!-- <el-option v-for="item in options" :key="item.value" :label="item.lable" :value="item.value">
              </el-option> -->
              <el-option :value="i" :key="i" :label="j" v-for="(j,i) in obj.xlist"></el-option>

            </el-select>
          </div>
          <div class="cardTitle">
            <img src="../../../assets/newW/detailsTitleIcon1.png">
            <span>电气</span>
          </div>
          <div class="b_datas" v-if="obj.xlist[value]!='温度'&&obj.xlist[value]!='谐波畸变率'&&obj.xlist[value]!='电能'&& status">
            <div class='charts' v-for="(item,index) in obj.ylist[value]" :key="index">
              <gauge :chartData='item' :maxValue='value' :options='options'></gauge>
            </div>
          </div>
          <div class="b_datas" v-else-if="obj.xlist[value]=='电能'&& status">
            <div class='charts' v-for="(item,index) in obj.ylist[value]" :key="index">
              <hishome :chartData='item' :option='options'>
              </hishome>
            </div>
            <!-- <hishome :chartData='obj.ylist[value]' :option='options'>
            </hishome> -->
          </div>
          <div class="b_datas" v-else-if="obj.xlist[value]=='温度'&& status">
            <div class='charts' v-for="(item,index) in obj.ylist[value]" :key="index">
              <bar :chartData='item' :maxValue='value' :option='options'></bar>
            </div>
          </div>
          <div class="b_datas" v-else-if="obj.xlist[value]=='谐波畸变率'&& status">
            <div class=' charts' v-for="(item,index) in obj.ylist[value]" :key="index">
              <bar2 :chartData='item' :maxValue='value' :option='options'></bar2>
            </div>
          </div>
          <div v-if="obj.ylist[value].length==0" class="nodata">暂无数据</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Card, Row, Col } from 'element-ui';
import gauge from "../../chart/gauge";
import bar from "../../chart/bar";
import bar2 from "../../chart/bar2";
import hishome from "../../chart/hishome";
import http from 'http';
import api from 'api';
export default {
  components: {
    elCard: Card,
    gauge,
    bar,
    bar2,
    hishome,
    elRow: Row,
    elCol: Col

  },
  data() {
    return {
      value: 0,
      options: [
      ],
      status: true,
      options2: [
        {
          'value': 'xiangdianliu',
          'lable': '相电流',
          'max': '30',
        },
        {
          'value': 'xiangdianya',
          'lable': '相电压',
          'max': '100',
        },
        {
          'value': 'xiandianya',
          'lable': '线电压',
          'max': '100',
        },
        {
          'value': 'gonglv',
          'lable': '功率',
          'max': '50',
        },
        {
          'value': 'dianneng',
          'lable': '电能',
          'max': '100',
        },
        {
          'value': 'pinlv',
          'lable': '频率',
          'max': '100',
        },
        {
          'value': 'gonglvyinshu',
          'lable': '功率因数',
          'max': '1',
        },
        {
          'value': 'wendu',
          'lable': '温度',
          'max': '30',
        },
        {
          'value': 'xiebo',
          'lable': '谐波',
          'max': '1',
        },
      ],
      list: [],
      obj: {}
    }
  },
  props: {
    condition: {
      type: Object,

    },

  },
  created() {

  },
  mounted() {
    this.getMeasureData();
  },
  methods: {
    //设备测量数据
    getMeasureData() {
      this.options = [];
      let that = this
      http(api.getMeasureData, this.condition).then(res => {
        res.xlist.forEach((element, index) => {
          that.options2.forEach((val, i) => {
            if(element == val.lable) {
              that.options.push(that.options2[i])
            }
          });
        });
        this.obj = res;
        this.list = this.obj.ylist[this.value];
      })
    },
    changes(e) {
      this.status = false;
      // this.list = [];
      this.$nextTick(() => {
        this.status = true;
        // this.list = this.obj.ylist[e]
      })

    },
  }
}
</script>

<style lang="less" scoped>
@import "../less/product.less";
.b_datas {
  // min-height: 350px;
  .charts {
    height: 300px;
    width: 33%;
    display: inline-block;
    text-align: center;
  }
}
.nodata {
  text-align: center;
  color: rgba(165, 167, 170, 1);
  font-size: 1.4rem;
  min-height: 350px;
  line-height: 350px;
}
</style>
