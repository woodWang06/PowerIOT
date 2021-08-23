<template>
  <div class="content lingBut">
    <div class="warrp">
      <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="能耗预测分析" name="1"></el-tab-pane>
        <el-tab-pane label="能耗分时分析" name="2"></el-tab-pane>
        <el-tab-pane label="能耗同比分析" name="3"></el-tab-pane>
        <el-tab-pane label="能耗环比分析" name="4"></el-tab-pane>
        <el-tab-pane label="跑冒滴漏分析" name="5"></el-tab-pane>
      </el-tabs>
      <div class="disFlex">
        <div class="left ">
          <!-- <el-input placeholder="请输入搜索内容" suffix-icon="el-icon-search">
          </el-input> -->
          <div class="scrollWarrp ">
            <el-tree :data="dataTree" v-if="activeName!='5'" :show-checkbox='falgcheckbox' default-expand-all node-key="id" ref="tree" highlight-current check-strictly :props="defaultProps" @check-change="handleCheckChange" @node-click="handleCheckClick">
            </el-tree>
            <el-tree :data="dataTree3" v-if="activeName=='5'" :show-checkbox='falgcheckbox' default-expand-all node-key="id" ref="tree" highlight-current check-strictly :props="defaultProps" @check-change="handleCheckChange" @node-click="handleCheckClick">
            </el-tree>
          </div>
        </div>
        <div class="right">
          <div>
            <div class="datesStyle">
              <el-date-picker v-if="activeName=='1'||activeName=='2'" suffix-icon="el-icon-date" v-model="dayValue" type="date" :clearable="false" value-format="yyyy-MM-dd" placeholder="选择日期" @change="handleClick2">
              </el-date-picker>
              <common v-if="activeName=='3'||activeName=='4' ||activeName=='5'" :activeName='activeName' :searchObj.sync="timeObj"></common>
              <el-button class="Fr" @click="clickParent">导出</el-button>
            </div>
            <div class="aysBox">
              <div class="title">数据图表
                <span v-if="domainOBJ3.domainName&&activeName==5">({{domainOBJ3.domainName}})</span>
                <span v-if="domainOBJ.domainName&&activeName!=5">({{domainOBJ.domainName}})</span>
              </div>
              <chartsL ref='mychild' v-if="(activeName==1|activeName==2)&&JSON.stringify(chartData) != '{}'" unit='kW·h' :isnh='isnh' :chartData="chartData" :tablelist='tablelist' :tableData='tableData' width="100%" :activeName='activeName' :keys='keys' :activeNameName='activeNameName'></chartsL>
              <chartsL2 ref='mychild' v-if="(activeName==3||activeName==4)&&JSON.stringify(chartData) != '{}'" unit='kW·h' :isnh='isnh' :chartData="chartData" :tablelist='tablelist' :tableData='tableData' width="100%" :activeName='activeName' :keys='keys' :activeNameName='activeNameName'></chartsL2>
              <sankey ref='mychild' :datess="rows" :linkss='linkss' :activeName='activeName' v-if="activeName==5&&rows.length>0"></sankey>
            </div>
            <div class="datesStyle" v-if="activeName!=5">
              <el-button class="Fr" @click="$exportToExcel(activeNameName)">导出</el-button>
            </div>
            <div class="aysBox" v-if="JSON.stringify(chartData) != '{}'&&activeName!=5">
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
                <el-table-column v-for="(item ,index) in tableData" :key="index" :label="keys[item]" v-if='activeName==1'>
                  <template slot-scope="scope">
                    <div> {{tablelist[item][scope.$index]}}{{tablelist[item][scope.$index]?'kW·h':''}}</div>
                  </template>
                </el-table-column>
                <el-table-column v-for="(i ,j) in tableData" :key="j" :label="activeName==2?'能耗':keys[i]?keys[i]:i" v-if='activeName!=1'>
                  <template slot-scope="scope">
                    <div v-if="keys[i]!='环比'&&keys[i]!='同比'"> {{tablelist[i][scope.$index]}}kW·h</div>
                    <div v-else> {{tablelist[i][scope.$index]=='Na'?tablelist[i][scope.$index]:tablelist[i][scope.$index]+'%'}}</div>
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
import { Table, TableColumn, Tree, Tabs, DatePicker, TabPane } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapGetters } from 'vuex';
import chartsL from "../chart/chartsL";
import chartsL2 from "../chart/chartsL2";
import sankey from "../chart/sankey"
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
    common,
    sankey
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
      domainOBJ3: {},
      domainCodes: '',
      activeNameName: ''
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
    ...mapGetters('login', ['getStationInfo']),
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
      switch(this.activeName) {
        case '1':
          this.activeNameName = '能耗预测分析' + this.domainOBJ.domainName
          break;
        case '2':
          this.activeNameName = '能耗分时分析' + this.domainOBJ.domainName
          break;
        case '3':
          this.activeNameName = '能耗同比分析' + this.domainOBJ.domainName
          break;
        case '4':
          this.activeNameName = '能耗环比分析' + this.domainOBJ.domainName
          break;
        case '5':
          this.activeNameName = '跑冒滴漏分析' + this.domainOBJ3.domainName
          break;
        default:
          this.activeNameName = ''
      }
      this.other()
    },
    other() {
      if(this.activeName == '1') {
        this.isnh = '';
        this.mess = '时';
        this.getDayTrendWithForecast()
      } else if(this.activeName == '2') {
        this.isnh = '1'
        this.mess = '时';
        this.getDayTrend()
      } else if(this.activeName == '3') {
        this.isnh = ''
        this.keys.rList = '同比'
        if(this.timeObj.tabPosition == '2') {
          this.getMonthYy()
        } else if(this.timeObj.tabPosition == '3') {
          this.getYearYy()
        }
      } else if(this.activeName == '4') {
        this.isnh = ''
        this.keys.rList = '环比'
        if(this.timeObj.tabPosition == '2') {
          this.getMonthMm()
        } else if(this.timeObj.tabPosition == '3') {
          this.getYearMm()
        }
      } else if(this.activeName == '5') {
        this.isnh = ''
        if(this.timeObj.tabPosition == '1') {
          this.getDayLeaking()
        } else if(this.timeObj.tabPosition == '2') {
          this.getMonthLeaking()
        } else if(this.timeObj.tabPosition == '3') {
          this.getYearLeaking()
        }
      }
    },
    handleCheckClick(e) {
      if(e.domainCode == '0000000000') {
        return
      }
      this.domainCodes = e.domainCode;
      this.domainOBJ = e;
      this.domainCodes3 = e.domainCode;
      this.domainOBJ3 = e
      this.other()
    },
    //能耗预测分析
    getDayTrendWithForecast() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getDayTrendWithForecast, { day: this.dayValue, domainCodes: [this.domainCodes] }).then(res => {
        this.chartData = res;
        let arr = Object.keys(this.chartData.ymap)
        this.tablelist = this.chartData.ymap[arr[0]];
        this.tableData = Object.keys(this.tablelist)
      })
    },
    //能耗分时分析
    getDayTrend() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getDayTrend, { day: this.dayValue, domainCodes: [this.domainCodes] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = this.chartData.ymap
      })
    },
    //同比年
    getYearYy() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getYearYy, { year: this.timeObj.value3, domainCodes: [this.domainCodes] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = res.ymap;
        console.log(this.tableData)
        console.log(this.tablelist)
      })

    },
    //同比月
    getMonthYy() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getMonthYy, { month: this.timeObj.value2, domainCodes: [this.domainCodes] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = res.ymap;
        console.log(this.tableData)
        console.log(this.tablelist)
      })

    },
    //环比月
    getMonthMm() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getMonthMm, { month: this.timeObj.value2, domainCodes: [this.domainCodes] }).then(res => {
        this.chartData = res;
        this.tableData = Object.keys(res.ymap)
        this.tablelist = res.ymap;
        console.log(this.tableData)
        console.log(this.tablelist)
      })

    },
    //同比年
    getYearMm() {
      this.chartData = {};
      this.tableData = [];
      this.tablelist = {}
      http(api.getYearMm, { year: this.timeObj.value3, domainCodes: [this.domainCodes] }).then(res => {
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
      http(api.getDayLeaking, { date: this.timeObj.value1, domainCode: this.domainCodes3 }).then(res => {
        this.linkss = {
          name: this.domainOBJ3.domainName ? this.domainOBJ3.domainName : this.getStationInfo.stationName,
          valueS: res.curValue
        }
        if(res.subList.length > 0) {
          res.subList.forEach(val => {
            this.rows.push(val)
          })
        } else {
          this.rows.push({
            name: this.domainOBJ3.domainName ? this.domainOBJ3.domainName : this.getStationInfo.stationName,
            value: res.curValue
          })
        }
      })
    },
    //跑冒滴漏月
    getMonthLeaking() {
      this.linkss = {};
      this.rows = [];
      http(api.getMonthLeaking, { date: this.timeObj.value2, domainCode: this.domainCodes3 }).then(res => {

        this.linkss = {
          name: this.domainOBJ3.domainName ? this.domainOBJ3.domainName : this.getStationInfo.stationName,
          valueS: res.curValue
        }
        if(res.subList.length > 0) {
          res.subList.forEach(val => {
            this.rows.push(val)
          })
        } else {
          this.rows.push({
            name: this.domainOBJ3.domainName ? this.domainOBJ3.domainName : this.getStationInfo.stationName,
            value: res.curValue
          })
        }
      })

    },
    //跑冒滴漏年
    getYearLeaking() {
      this.linkss = {};
      this.rows = [];
      http(api.getYearLeaking, { date: this.timeObj.value3, domainCode: this.domainCodes3 }).then(res => {
        this.linkss = {
          name: this.domainOBJ3.domainName ? this.domainOBJ3.domainName : this.getStationInfo.stationName,
          value: res.curValue
        }
        if(res.subList.length > 0) {
          res.subList.forEach(val => {
            this.rows.push(val)
          })
        } else {
          this.rows.push({
            name: this.domainOBJ3.domainName ? this.domainOBJ3.domainName : this.getStationInfo.stationName,
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
    // exportToExcel: function() {
    //   let tables = document.getElementById("out-table");
    //   let table_book = $XLSX.utils.table_to_book(tables);
    //   var table_write = $XLSX.write(table_book, {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "array"
    //   });
    //   try {
    //     $FileSaver.saveAs(
    //       new Blob([table_write], { type: "application/octet-stream" }),
    //       "sheetjs.xlsx"
    //     );
    //   } catch(e) {
    //     if(typeof console !== "undefined") console.log(e, table_write);
    //   }
    //   return table_write;
    // },
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