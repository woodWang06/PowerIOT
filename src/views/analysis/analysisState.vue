<template>
  <div class="content lingBut">
    <div class="warrp">
      <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="分时电流报表" name="1"></el-tab-pane>
        <el-tab-pane label="分时电压报表" name="2"></el-tab-pane>
        <el-tab-pane label="负载查询报表" name="3"></el-tab-pane>
        <el-tab-pane label="区域能耗报表" name="4"></el-tab-pane>
      </el-tabs>
      <div class="disFlex">
        <div class="left appendsINput">
          <!-- <el-input placeholder="请输入搜索内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
          <div class="scrollWarrp">
            <el-tree :data="dataTree" v-show="activeName!=3" :show-checkbox='falgcheckbox' default-expand-all node-key="id" ref="tree" highlight-current check-strictly :props="defaultProps" @check-change="handleCheckChange" @node-click="handleCheckClick">
            </el-tree>
            <el-tree :data="dataTree2" v-show="activeName==3" :show-checkbox='falgcheckbox' default-expand-all node-key="id" ref="tree" highlight-current check-strictly :props="defaultProps" @check-change="handleCheckChange" @node-click="handleCheckClick2">
            </el-tree>
          </div>
        </div>
        <div class="right">
          <div style="max-width:100%">
            <div class="datesStyle">
              <el-date-picker v-if="activeName=='1'||activeName=='2'" suffix-icon="el-icon-date" v-model="dayValue" type="date" :clearable="false" value-format="yyyy-MM-dd" placeholder="选择日期" @change="handleClick2">
              </el-date-picker>
              <common v-if="activeName=='3'||activeName=='4'" activeName='5' :searchObj.sync="timeObj"></common>
              <el-button class="Fr" @click="clickParent">导出</el-button>
            </div>

            <div class="aysBox">
              <div class="title">数据图表
                <span v-if="domainOBJ.domainName&&activeName==3">({{domainOBJ2.domainName}})</span>
                <span v-if="domainOBJ.domainName&&activeName!=3">({{domainOBJ.domainName}})</span>
              </div>
              <chartsL v-if="JSON.stringify(chartData) != '{}'" :chartData="chartData" ref='mychild' :unit='unit' :tablelist='tablelist' :isnh='isnh' :tableData='tableData' width="100%" :keys='keys' :activeNameName='activeNameName'></chartsL>
            </div>
            <div class="datesStyle">
              <el-button class="Fr" @click="$exportToExcel(activeNameName)">导出</el-button>
            </div>
            <div class="aysBox">
              <div class="title2">数据报表</div>
              <el-table border :data="chartData.xlist" class="tableBox" id="out-table">
                <el-table-column label="回路名称" min-width="100px">
                  <template slot-scope="scope">
                    <div>{{domainOBJ.domainName}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="时间" min-width="100px">
                  <template slot-scope="scope">
                    <div> {{chartData.xlist[scope.$index]}}</div>
                  </template>
                </el-table-column>
                <el-table-column v-for="(i ,j) in tableData" :key="j" :label="activeName==3||activeName==4?'能耗':keys[i]?keys[i]:i">
                  <template slot-scope="scope">
                    <div> {{tablelist[i][scope.$index]}}{{activeName=='1'?'A':activeName=='2'?'V':'kW·h'}}</div>
                  </template>
                </el-table-column>
              </el-table>
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
    common
  },
  data() {
    return {
      searchObj: {},
      orderList: [],
      tableData: [],
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
      mess: '',
      unit: '',
      domainCodes2: '',
      domainOBJ2: '',
      domainCodes3: '',
      domainOBJ3: '',
      activeNameName: '',
    }
  },
  mounted() {
    // this.other()
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
    handleClick(e) {
      switch(this.activeName) {
        case '1':
          this.activeNameName = '分时电流报表' + this.domainOBJ.domainName
          break;
        case '2':
          this.activeNameName = '分时电压报表' + this.domainOBJ.domainName
          break;
        case '3':
          this.activeNameName = '负载查询报表' + this.domainOBJ2.domainName
          break;
        case '4':
          this.activeNameName = '区域能耗报表' + this.domainOBJ.domainName
          break;
        default:
          this.activeNameName = ''
      }
      this.other()
      // }

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
        this.mess = '时';
        this.unit = 'A';
        this.isnh = ''
        this.getDayCurrent()
      } else if(this.activeName == '2') {
        this.mess = '时';
        this.unit = 'V';
        this.isnh = ''
        this.getDayVoltage()
      } else if(this.activeName == '3') {
        this.isnh = '1';
        this.unit = 'kW·h';
        if(this.timeObj.tabPosition == '1') {
          this.getDayTrendBreaker()
        } else if(this.timeObj.tabPosition == '2') {
          this.getMonthTrend()
        } else if(this.timeObj.tabPosition == '3') {
          this.getYearTrend()
        }
      } else if(this.activeName == '4') {
        this.unit = 'kW·h';
        this.isnh = '1'
        if(this.timeObj.tabPosition == '1') {
          this.getDayTrendDomain()
        } else if(this.timeObj.tabPosition == '2') {
          this.getMonthTrendDomain()
        } else if(this.timeObj.tabPosition == '3') {
          this.getYearTrendDomain()
        }
      }
    },
    handleCheckClick(e) {

      if(e.domainCode == '0000000000') {
        return
      }
      if(this.activeName == 3) {
        if(e.breakerCode) {
          this.domainCodes = e.breakerCode;
          this.domainOBJ = { 'domainCode': e.breakerCode, 'domainName': e.domainName };
          this.other()
        }
        return;
      }
      if((this.activeName == 1 || this.activeName == 2) && (e.domainType == 'D5' || e.domainType == 'D6')) {
        this.domainCodes = e.domainCode;
        this.domainOBJ = e
        this.other()
      } else if(this.activeName == 4) {
        this.domainCodes = e.domainCode;
        this.domainOBJ = e
        this.other()
      }

    },
    handleCheckClick2(e) {
      if(e.domainCode == '0000000000') {
        return
      }
      if(this.activeName == 3) {
        if(e.breakerCode) {
          this.domainCodes2 = e.breakerCode;
          this.domainOBJ2 = { 'domainCode': e.breakerCode, 'domainName': e.domainName };
          this.other()
        }
        return;
      }
      if((this.activeName == 1 || this.activeName == 2) && (e.domainType == 'D5' || e.domainType == 'D6')) {
        this.domainCodes = e.domainCode;
        this.domainOBJ = e
        this.other()
      } else if(this.activeName == 4) {
        this.domainCodes = e.domainCode;
        this.domainOBJ = e
        this.other()
      }

    },
    //分时电流报表
    getDayCurrent() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getDayCurrent, { day: this.dayValue, domainCode: this.domainCodes }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = this.chartData.ymap
      })
    },
    //分时电压报表
    getDayVoltage() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getDayVoltage, { day: this.dayValue, domainCode: this.domainCodes }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap).sort()
        this.tablelist = this.chartData.ymap
      })
    },
    //负载查询报表n年
    getYearTrend() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getYearTrend, { year: this.timeObj.value3, breakerCodes: [this.domainCodes2] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = res.ymap;
        console.log(this.tableData)
        console.log(this.tablelist)
      })

    },
    //负载查询报表n月
    getMonthTrend() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getMonthTrend, { month: this.timeObj.value2, breakerCodes: [this.domainCodes2] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = res.ymap;
        console.log(this.tableData)
        console.log(this.tablelist)
      })

    },
    //负载查询报表n日
    getDayTrendBreaker() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getDayTrendBreaker, { day: this.timeObj.value1, breakerCodes: [this.domainCodes2] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = res.ymap;
        console.log(this.tableData)
        console.log(this.tablelist)
      })

    },

    //区域能耗报表月
    getMonthTrendDomain() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getMonthTrendDomain, { month: this.timeObj.value2, domainCodes: [this.domainCodes] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = res.ymap;
        console.log(this.tableData)
        console.log(this.tablelist)
      })

    },
    //区域能耗报表年
    getYearTrendDomain() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getYearTrendDomain, { year: this.timeObj.value3, domainCodes: [this.domainCodes] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = res.ymap;
        console.log(this.tableData)
        console.log(this.tablelist)
      })
    },
    //区域能耗报表日
    getDayTrendDomain() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getDayTrendDomain, { day: this.timeObj.value1, domainCodes: [this.domainCodes] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = res.ymap;
        console.log(this.tableData)
        console.log(this.tablelist)
      })
    },

    //跑冒滴漏日
    getDayLeaking() {
      this.linkss = {};
      this.rows = [];
      http(api.getDayLeaking, { date: this.timeObj.value1, domainCode: this.domainCodes }).then(res => {
        this.linkss = {
          name: this.domainOBJ.domainName ? this.domainOBJ.domainName : this.getStationInfo.stationName,
          valueS: res.curValue
        }
        if(res.subList.length > 0) {
          res.subList.forEach(val => {
            this.rows.push(val)
          })
        } else {
          this.rows.push({
            name: this.domainOBJ.domainName ? this.domainOBJ.domainName : this.getStationInfo.stationName,
            value: res.curValue
          })
        }
      })
    },
    //跑冒滴漏月
    getMonthLeaking() {
      this.linkss = {};
      this.rows = [];
      http(api.getMonthLeaking, { date: this.timeObj.value2, domainCode: this.domainCodes }).then(res => {
        this.linkss = {
          name: this.domainOBJ.domainName ? this.domainOBJ.domainName : this.getStationInfo.stationName,
          valueS: res.curValue
        }
        if(res.subList.length > 0) {
          res.subList.forEach(val => {
            this.rows.push(val)
          })
        } else {
          this.rows.push({
            name: this.domainOBJ.domainName ? this.domainOBJ.domainName : this.getStationInfo.stationName,
            value: res.curValue
          })
        }
      })

    },
    //跑冒滴漏年
    getYearLeaking() {
      this.linkss = {};
      this.rows = [];
      http(api.getYearLeaking, { date: this.timeObj.value3, domainCode: this.domainCodes }).then(res => {
        this.linkss = {
          name: this.domainOBJ.domainName ? this.domainOBJ.domainName : this.getStationInfo.stationName,
          valueS: res.curValue
        }
        if(res.subList.length > 0) {
          res.subList.forEach(val => {
            this.rows.push(val)
          })
        } else {
          this.rows.push({
            name: this.domainOBJ.domainName ? this.domainOBJ.domainName : this.getStationInfo.stationName,
            value: res.curValue
          })
        }
      })
    },
    //设备选择
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    clickParent() {

      this.$refs.mychild.download(this.activeNameName);
    },
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
        if(this.activeName == '3' || this.activeName == '4' || this.activeName == '5') {
          this.other()
        }
      }

    },
  },

}
</script>
<style lang="less" scoped>
@import "./less/less.less";
</style>