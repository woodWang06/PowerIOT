<template>
  <div class="content lingBut">
    <div class="warrp">
      <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="能效分时分析" name="1"></el-tab-pane>
        <el-tab-pane label="能效同比分析" name="2"></el-tab-pane>
        <el-tab-pane label="能效环比分析" name="3"></el-tab-pane>
      </el-tabs>
      <div class="disFlex">
        <div class="left appendsINput">
          <!-- <el-input placeholder="请输入搜索内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
          <div class="scrollWarrp">
            <el-tree :data="dataTree" :show-checkbox='falgcheckbox' default-expand-all node-key="id" ref="tree" highlight-current check-strictly :props="defaultProps" @check-change="handleCheckChange" @node-click="handleCheckClick">
            </el-tree>
          </div>
        </div>
        <div class="right">
          <div style="max-width:100%">
            <div class="datesStyle">
              <el-date-picker class="ymdBox2" v-if="activeName=='1'" suffix-icon="el-icon-date" v-model="dayValue" type="date" :clearable="false" value-format="yyyy-MM-dd" placeholder="选择日期" @change="handleClick2">
              </el-date-picker>
              <common v-if="activeName=='3'||activeName=='2'" :searchObj.sync="timeObj"></common>
            </div>
            <div v-if="activeName=='1'">
              <div class="aysBox">
                <div class="title">数据图表
                  <span v-if="domainOBJ.domainName">({{domainOBJ.domainName}})</span>
                </div>
                <div v-if="JSON.stringify(chartData) != '{}'">
                  <el-button class="Fr" @click="clickParent1">导出</el-button>
                  <chartsL ref='mychild1' :isnh='isnh' unit="kW" :chartData="chartData" :tablelist='list2' :tableData='[tableData[2]]' :activeName='activeName' :keys='keys' width="100%" :activeNameName='activeNameName'></chartsL>
                </div>
              </div>
              <div class="aysBox">
                <div v-if="JSON.stringify(chartData) != '{}'">
                  <el-button class="Fr" @click="clickParent2">导出</el-button>
                  <chartsL ref='mychild2' :isnh='isnh' unit="kvar" :chartData="chartData" :tablelist='list1' :tableData='[tableData[1]]' :activeName='activeName' :keys='keys' width="100%" :activeNameName='activeNameName'></chartsL>
                </div>
              </div>
              <div class="aysBox">
                <div v-if="JSON.stringify(chartData) != '{}'">
                  <el-button class="Fr" @click="clickParent3">导出</el-button>
                  <chartsL ref='mychild3' :isnh='isnh' unit="kVA" :chartData="chartData" :tablelist='list0' :tableData='[tableData[0]]' :activeName='activeName' :keys='keys' width="100%" :activeNameName='activeNameName'></chartsL>
                </div>
              </div>
            </div>
            <div v-if="activeName!='1'">
              <div class="aysBox" v-if="tableData0.length>0">
                <div class="title">数据图表
                  <span v-if="domainOBJ.domainName">({{domainOBJ.domainName}})</span>
                </div>
                <el-button class="Fr" @click="clickParent1">导出</el-button>
                <div class="FL">有功功率</div>
                <chartsL2 ref='mychild1' :isnh='isnh' unit="kW" :chartData="chartData" :tablelist='list0' :tableData='tableData0' :activeName='activeName' :keys='keys' width="100%" :activeNameName='activeNameName'></chartsL2>
              </div>
              <div class="aysBox" v-if="tableData1.length>0">
                <el-button class="Fr" @click="clickParent2">导出</el-button>
                <div class="FL">无功功率</div>
                <chartsL2 ref='mychild2' :isnh='isnh' unit="kvar" :chartData="chartData" :tablelist='list1' :tableData='tableData1' :activeName='activeName' :keys='keys' width="100%" :activeNameName='activeNameName'></chartsL2>
              </div>
              <div class="aysBox" v-if="tableData2.length>0">
                <el-button class="Fr" @click="clickParent3">导出</el-button>
                <div class="FL">视在功率</div>
                <chartsL2 ref='mychild3' :isnh='isnh' unit="kVA" :chartData="chartData" :tablelist='list2' :tableData='tableData2' :activeName='activeName' :keys='keys' width="100%" :activeNameName='activeNameName'></chartsL2>
              </div>
            </div>
            <div>
              <div class="datesStyle" v-if="activeName!=5">
                <el-button class="Fr" @click="$exportToExcel(activeNameName)">导出</el-button>
              </div>
              <div class="aysBox">
                <div class="title2">数据报表</div>
                <el-table border :data="chartData.xlist" class="tableBox" v-if="activeName=='1'" id="out-table">
                  <el-table-column label="回路名称" min-width="100px">
                    <template slot-scope="scope">
                      <div>{{domainOBJ.domainCode?domainOBJ.domainName:'站点'}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="时间" min-width="100px">
                    <template slot-scope="scope">
                      <div> {{chartData.xlist[scope.$index]}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column v-for="(i ,j) in tableData" :key="j" :label="keys[i]?keys[i]:i">
                    <template slot-scope="scope">
                      <div> {{tablelist[i][scope.$index]}}{{i=='总无功功率'?'kvar':i=='总有功功率'?'kW':'kVA'}}</div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table border :data="chartData.xlist" class="tableBox" v-if="activeName!='1'" id="out-table">
                  <el-table-column label="回路名称" min-width="100px">
                    <template slot-scope="scope">
                      <div>{{domainOBJ.domainCode?domainOBJ.domainName:'站点'}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="时间" min-width="100px">
                    <template slot-scope="scope">
                      <div> {{chartData.xlist[scope.$index]}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="有功功率">
                    <el-table-column v-for="(i ,j) in tableData0" :key="j" :label="keys[i]?keys[i]:i">
                      <template slot-scope="scope">
                        <div v-if="keys[i]!='环比'&&keys[i]!='同比'"> {{list0[i][scope.$index]}}kW</div>
                        <div v-else> {{list0[i][scope.$index]}}</div>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="无功功率">
                    <el-table-column v-for="(i ,j) in tableData1" :key="j" :label="keys[i]?keys[i]:i">
                      <template slot-scope="scope">
                        <div v-if="keys[i]!='环比'&&keys[i]!='同比'"> {{list1[i][scope.$index]}}kvar</div>
                        <div v-else> {{list1[i][scope.$index]}}</div>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="视在功率">
                    <el-table-column v-for="(i ,j) in tableData2" :key="j" :label="keys[i]?keys[i]:i">
                      <template slot-scope="scope">
                        <div v-if="keys[i]!='环比'&&keys[i]!='同比'"> {{list2[i][scope.$index]}}kVA</div>
                        <div v-else> {{list2[i][scope.$index]}}</div>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Tree, Tabs, TabPane, DatePicker } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapGetters } from 'vuex';
import chartsL from "../chart/chartsL";
import chartsL2 from "../chart/chartsL2";
import common from "./common/common";
import { formatDate, formatMonth, formatYear } from 'utils';
import scripts from './min/script';
export default {
  mixins: [scripts],
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elTree: Tree,
    elTabs: Tabs,
    elTabPane: TabPane,
    elDatePicker: DatePicker,
    chartsL,
    chartsL2,
    common
  },
  data() {
    return {
      searchObj: {},
      orderList: [],
      tableData: [],
      tableData0: [],
      tableData1: [],
      tableData2: [],
      tablelist: {},
      activeName: '1',
      dayValue: '',
      defaultProps: {
        children: 'children',
        label: 'domainName'
      },
      datekeys: [],
      timeObj: {},
      falgcheckbox: false,
      chartData: {},
      domainCodes: '',
      domainOBJ: {},
      keys: {
        fault: '故障',
        warning: '预警',
        mm: '环比',
        rList: '同比',
        tList: '预测值',
        yList: '实际值',
      },
      linkss: {},
      rows: [],
      isnh: '',
      list0: {},
      list1: {},
      list2: {},
      mess: '',
      activeNameName: ""
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters('login', ['getStationCode']),

  },
  created() {
  },
  methods: {
    search() {

    },
    handleClick2() {
      this.other()
    },
    handleClick() {
      let name = '';
      switch(this.activeName) {
        case '1':
          this.activeNameName = '能效分时分析' + this.domainOBJ.domainName
          break;
        case '2':
          this.activeNameName = '能效同比分析' + this.domainOBJ.domainName
          break;
        case '3':
          this.activeNameName = '能效环比分析' + this.domainOBJ.domainName
          break;
        default:
          this.activeNameName = ''
      }
      this.other()
    },
    other() {
      if(this.domainCodes == '') {
        this.$message({
          type: "warning",
          message: "请先选择查看的回路"
        });
        return;
      }
      if(this.activeName == '1') {
        this.isnh = ''
        this.mess = '时'
        this.getDayPower()
      } else if(this.activeName == '2') {
        this.keys.rList = '同比'
        this.isnh = ''
        if(this.timeObj.tabPosition == '2') {
          this.getPowerMonthYy()
        } else if(this.timeObj.tabPosition == '3') {
          this.getPowerYearYy()
        }
      } else if(this.activeName == '3') {
        this.isnh = ''
        this.keys.rList = '环比'
        if(this.timeObj.tabPosition == '2') {
          this.getPowerMonthMm()
        } else if(this.timeObj.tabPosition == '3') {
          this.getPowerYearMm()
        }
      }
    },
    handleCheckClick(e) {
      if(e.domainCode == '0000000000') {
        return
      }
      if(e.domainType == 'D5' || e.domainType == 'D6') {
        this.domainCodes = e.domainCode;
        this.domainOBJ = e
        this.other()
      }

    },
    //能耗分时分析
    getDayPower() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getDayPower, { day: this.dayValue, domainCode: this.domainCodes }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = this.chartData.ymap
        let rr = ''
        this.tableData.forEach((val, index) => {
          rr = 'list' + index;
          this[rr][val] = this.chartData.ymap[val]
        })


      })
    },
    //同比年
    getPowerYearYy() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {};
      this.tableData0 = [];
      this.tableData1 = [];
      this.tableData2 = [];
      this.list0 = {};
      this.list1 = {};
      this.list2 = {};
      http(api.getPowerYearYy, { year: this.timeObj.value3, domainCode: this.domainCodes, reportCode: 7 }).then(res => {
        this.chartData = res;
        this.tableData0 = Object.keys(res.ymap)
        this.tablelist['有功功率'] = this.chartData.ymap
        this.list0 = this.chartData.ymap;
      })
      http(api.getPowerYearYy, { year: this.timeObj.value3, domainCode: this.domainCodes, reportCode: 8 }).then(res => {
        this.chartData = res;
        this.tableData1 = Object.keys(res.ymap)
        this.tablelist['无功功率'] = this.chartData.ymap
        this.list1 = this.chartData.ymap;
      })
      http(api.getPowerYearYy, { year: this.timeObj.value3, domainCode: this.domainCodes, reportCode: 9 }).then(res => {
        this.chartData = res;
        this.tableData2 = Object.keys(res.ymap)
        this.tablelist['视在功率'] = this.chartData.ymap
        this.list2 = this.chartData.ymap;

      })
      console.log(this.tablelist)
    },
    //同比月
    getPowerMonthYy() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {};
      this.tableData0 = [];
      this.tableData1 = [];
      this.tableData2 = [];
      this.list0 = {};
      this.list1 = {};
      this.list2 = {};
      http(api.getPowerMonthYy, { month: this.timeObj.value2, domainCode: this.domainCodes, reportCode: 7 }).then(res => {
        this.chartData = res;
        this.tableData0 = Object.keys(res.ymap)
        this.tablelist['有功功率'] = this.chartData.ymap
        this.list0 = this.chartData.ymap;
      })
      http(api.getPowerMonthYy, { month: this.timeObj.value2, domainCode: this.domainCodes, reportCode: 8 }).then(res => {
        this.chartData = res;
        this.tableData1 = Object.keys(res.ymap)
        this.tablelist['无功功率'] = this.chartData.ymap
        this.list1 = this.chartData.ymap;
      })
      http(api.getPowerMonthYy, { month: this.timeObj.value2, domainCode: this.domainCodes, reportCode: 9 }).then(res => {
        this.chartData = res;
        this.tableData2 = Object.keys(res.ymap)
        this.tablelist['视在功率'] = this.chartData.ymap
        this.list2 = this.chartData.ymap;

      })
      console.log(this.tablelist)
    },
    //环比年
    getPowerYearMm() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {};
      this.tableData0 = [];
      this.tableData1 = [];
      this.tableData2 = [];
      this.list0 = {};
      this.list1 = {};
      this.list2 = {};
      http(api.getPowerYearMm, { year: this.timeObj.value3, domainCode: this.domainCodes, reportCode: 7 }).then(res => {
        this.chartData = res;
        this.tableData0 = Object.keys(res.ymap)
        this.tablelist['有功功率'] = this.chartData.ymap
        this.list0 = this.chartData.ymap;
      })
      http(api.getPowerYearMm, { year: this.timeObj.value3, domainCode: this.domainCodes, reportCode: 8 }).then(res => {
        this.chartData = res;
        this.tableData1 = Object.keys(res.ymap)
        this.tablelist['无功功率'] = this.chartData.ymap
        this.list1 = this.chartData.ymap;
      })
      http(api.getPowerYearMm, { year: this.timeObj.value3, domainCode: this.domainCodes, reportCode: 9 }).then(res => {
        this.chartData = res;
        this.tableData2 = Object.keys(res.ymap)
        this.tablelist['视在功率'] = this.chartData.ymap
        this.list2 = this.chartData.ymap;

      })
      console.log(this.tablelist)
    },
    //环比月
    getPowerMonthMm() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {};
      this.tableData0 = [];
      this.tableData1 = [];
      this.tableData2 = [];
      this.list0 = {};
      this.list1 = {};
      this.list2 = {};
      http(api.getPowerMonthMm, { month: this.timeObj.value2, domainCode: this.domainCodes, reportCode: 7 }).then(res => {
        this.chartData = res;
        this.tableData0 = Object.keys(res.ymap)
        this.tablelist['有功功率'] = this.chartData.ymap
        this.list0 = this.chartData.ymap;
      })
      http(api.getPowerMonthMm, { month: this.timeObj.value2, domainCode: this.domainCodes, reportCode: 8 }).then(res => {
        this.chartData = res;
        this.tableData1 = Object.keys(res.ymap)
        this.tablelist['无功功率'] = this.chartData.ymap
        this.list1 = this.chartData.ymap;
      })
      http(api.getPowerMonthMm, { month: this.timeObj.value2, domainCode: this.domainCodes, reportCode: 9 }).then(res => {
        this.chartData = res;
        this.tableData2 = Object.keys(res.ymap)
        this.tablelist['视在功率'] = this.chartData.ymap
        this.list2 = this.chartData.ymap;

      })
      console.log(this.tablelist)
    },

    //设备选择
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    clickParent1() {

      this.$refs.mychild1.download(this.activeNameName);
    },
    clickParent2() {

      this.$refs.mychild2.download(this.activeNameName);
    },
    clickParent3() {

      this.$refs.mychild3.download(this.activeNameName);
    }
  },
  watch: {
    // 因为不能直接修改 props 里的属性，所以不能直接把 formData 通过v-model进行绑定
    // 在这里我们需要监听 formData，当它发生变化时，立即将值赋给 data 里的 form
    timeObj: {
      // immediate: true,
      deep: true,
      handler(val) {
        if(this.timeObj.tabPosition == '1') {
          this.mess = '时'
        } else if(this.timeObj.tabPosition == '2') {
          this.mess = '日'
        } else if(this.timeObj.tabPosition == '3') {
          this.mess = '月'
        }
        if(this.activeName == '3' || this.activeName == '2') {
          this.other()
        }
      }

    },
  },

}
</script>
<style lang="less" scoped>
.Fr {
  float: RIGHT;
  margin-left: 20px;
  position: relative;
  z-index: 2000;
}
.warrp {
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  // display: flex;
  // flex-direction: column;
  background: #fff;
  padding: 10px 25px;
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;
}
.datesStyle {
  text-align: right;
  float: right;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2000;
}
.aysBox {
  padding: 20px 20px 0 20px;
  width: 99%;
  position: relative;
  min-height: 100px;
  .title {
    line-height: 1.8rem;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .title2 {
    line-height: 1.8rem;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
.tableBox {
  width: 100%;
  margin-top: 20px;
}
.disFlex {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  max-width: 100%;
  width: 100%;
  margin-top: 20px;
  .left {
    width: 15%;
    margin-right: 2%;
  }
  .right {
    width: 85%;
    padding-left: 2%;
    border-left: 1px solid #f2f2f2;
  }
}
.el-table td,
.el-table th {
  width: 100px !important;
}
.scrollWarrp {
  margin-top: 20px;
  height: 100%;
  max-height: 1000px;
  overflow: auto;
}
.ymdBox2 {
  text-align: right;
  height: 32px;
  margin-right: 10px;
}
.FL {
  float: left;
  display: inline-block;
  margin-top: 20px;
  color: #6d728e;
  font-size: 1.4rem;
}
</style>