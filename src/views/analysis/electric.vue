<template>
  <div class="content lingBut">
    <div class="warrp">
      <div class="tabs">
        分时段用电
      </div>
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
            <div class="datesStyle ">
              <!-- <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker> -->
              <common activeName='5' :searchObj.sync="timeObj" v-if="domainOBJ.domainName"></common>
              <el-button class="Fr" @click="clickParent">导出</el-button>
            </div>
            <div class="aysBox">
              <div class="title">数据图表<span v-if="domainOBJ.domainName">({{domainOBJ.domainName}})</span></div>
              <chartH ref='mychild' v-if="xlist.length>0&&mess!='时'" :mess='mess' :ylist="ylist" :xlist="xlist" width="100%" :activeNameName="'分时段用电'+domainOBJ.domainName">
              </chartH>
              <chartH2 ref='mychild2' v-if="xlist.length>0&&mess=='时'" width="100%" :ylist="ylist2" :xlist="xlist" :zid="zid" :activeNameName="'分时段用电'+domainOBJ.domainName">
              </chartH2>
            </div>
            <div class="datesStyle" v-if="activeName!=5">
              <el-button class="Fr" @click="$exportToExcel('分时段用电'+domainOBJ.domainName)">导出</el-button>
            </div>
            <div class="aysBox">
              <div class="title2">数据报表</div>
              <el-table border :data="xlist" class="tableBox" v-if="mess!='时' &&tableDataLable.length>0" id="out-table">
                <el-table-column label="回路名称" min-width="100px">
                  <template slot-scope="scope">
                    <div>{{domainOBJ.domainName}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="时间" min-width="100px">
                  <template slot-scope="scope">
                    <div> {{xlist[scope.$index]}}</div>
                  </template>
                </el-table-column>
                <el-table-column v-for="(item ,index) in tableDataLable" :key="index" :label="item.name">
                  <template slot-scope="scope">
                    <div> {{item.valuelist[scope.$index]}}kW·h</div>
                  </template>
                </el-table-column>
                <el-table-column label="总汇" min-width="100px">
                  <template slot-scope="scope">
                    <div> {{(Number(tableDataLable[0].valuelist[scope.$index])+Number(tableDataLable[1].valuelist[scope.$index])+Number(tableDataLable[2].valuelist[scope.$index])).toFixed(2)}}kW·h</div>
                  </template>
                </el-table-column>
              </el-table>
              <el-table border :data="xlist" class="tableBox" v-if="mess=='时'" id="out-table">
                <el-table-column label="回路名称" min-width="100px">
                  <template slot-scope="scope">
                    <div>{{domainOBJ.domainName?domainOBJ.domainName:'项目'}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="时间" min-width="100px">
                  <template slot-scope="scope">
                    <div> {{xlist[scope.$index]}}时</div>
                  </template>
                </el-table-column>
                <el-table-column label="用电量" min-width="100px">
                  <template slot-scope="scope">
                    <div> {{ylist2[scope.$index]}}kW·h</div>
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
import { Table, TableColumn, Tree, DatePicker } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapGetters } from 'vuex';
import chartH from "../chart/chartH";
import chartH2 from "../chart/chartH2";
import { formatDate, formatMonth, formatYear } from 'utils';
import json from './json/json';
import scripts from './min/script';
import common from "./common/common";
export default {
  mixins: [scripts],
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elTree: Tree,
    elDatePicker: DatePicker,
    chartH,
    chartH2,
    common,
  },
  data() {
    return {
      searchObj: {
      },
      orderList: [],
      tableData: [],
      activeName: '1',
      beginDate: '',
      endDate: '',
      yearValue: '',
      dayValue: '',
      dataTree: [],
      defaultProps: {
        children: 'children',
        label: 'domainName'
      },
      datekeys: [],
      tableDataLable: [],
      mutList: [],
      mutListName: [],
      timeObj: {},
      falgcheckbox: false,
      zid: [],
      ylist: [],
      ylist2: [],
      xlist: [],

      value1: [],
      domainCode: '',
      mess: '',
      domainOBJ: ''
    }
  },
  mounted() {
    // this.getDomainTopoSimple('1');
    // this.getStationThreeYear()
    // this.getFpgYear()
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),

  },
  created() {
    this.searchObj.stationCode = this.getStationCode;
    let myDate = new Date();
    this.yearValue = formatYear(myDate);
    let myDate2 = new Date();
    this.dayValue = formatDate(myDate2);
    this.beginDate = formatDate(myDate2);
    this.endDate = formatDate(myDate2 - (8.64e7 * 20));
    this.datekeys.push(this.yearValue, String(this.yearValue - 1), String(this.yearValue - 2))
  },
  methods: {
    other() {
      debugger
      this.getFpgYear()
    },
    search() {

    },
    handleClick2() {

    },
    handleClick() {

    },

    handleCheckClick(e) {
      this.domainCodes = e.domainCode;
      this.domainOBJ = e
      this.timess()

    },
    AllChange(val) {
      console.log(this.searchObj.list)
      if(val) {
        this.type2.forEach((val) => {
          this.searchObj.list.push(val.value)
        })
      } else {
        this.searchObj.list = []
      }
    },
    selectchange(val) {
      this.searchObj.list = val
    },

    //获取前30天能耗数据
    getFpgDay() {
      http(api.getFpgDay, { day: this.timeObj.value1, domainCodes: [this.domainCodes] }).then(res => {
        this.xlist = res.xlist;
        this.ylist2 = res.ylist;
        this.zid = res.type
      })
    },
    //获取前30天能耗数据
    getFpgMonth() {
      this.tableDataLable = []
      http(api.getFpgMonth, { month: this.timeObj.value2, domainCodes: [this.domainCodes] }).then(res => {
        this.ylist = res.ymap
        this.xlist = res.xlist;
        let keys = Object.keys(this.ylist).sort();
        keys.forEach(val => {
          this.tableDataLable.push({
            name: val,
            valuelist: this.ylist[val]
          })
        })

      })
    },
    //获取前30天能耗数据
    getFpgYear() {
      this.tableDataLable = [];
      this.xlist = []
      http(api.getFpgYear, { year: this.timeObj.value3, domainCodes: [this.domainCodes] }).then(res => {
        this.ylist = res.ymap
        this.xlist = res.xlist;
        let keys = Object.keys(this.ylist).sort();
        keys.forEach(val => {
          this.tableDataLable.push({
            name: val,
            valuelist: this.ylist[val]
          })
        })
      })
    },
    //设备选择
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    clickParent() {
      if(this.mess == '时') {
        this.$refs.mychild2.download();
      } else {
        this.$refs.mychild.download();
      }

    },
    timess() {
      this.xlist = []
      this.$nextTick(() => {
        if(this.timeObj.tabPosition == '1') {
          this.mess = '时';
          this.getFpgDay()
        } else if(this.timeObj.tabPosition == '2') {
          this.mess = '日';
          this.getFpgMonth();
        } else if(this.timeObj.tabPosition == '3') {
          this.mess = '月';
          this.getFpgYear()
        }
      });
    }
  },
  watch: {
    // 因为不能直接修改 props 里的属性，所以不能直接把 formData 通过v-model进行绑定
    // 在这里我们需要监听 formData，当它发生变化时，立即将值赋给 data 里的 form
    timeObj: {
      // immediate: true,
      deep: true,
      handler(val) {
        this.xlist = []
        this.$nextTick(() => {
          if(this.timeObj.tabPosition == '1') {
            this.mess = '时';
            this.getFpgDay()
          } else if(this.timeObj.tabPosition == '2') {
            this.mess = '日';
            this.getFpgMonth();
          } else if(this.timeObj.tabPosition == '3') {
            this.mess = '月';
            this.getFpgYear()
          }
        });


      }

    },
  },

}
</script>
<style lang="less" scoped>
.tabs {
  line-height: 3.5rem;
  font-weight: bold;
  font-size: 1.6rem;
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
  .Fr {
    margin-left: 20px;
  }
}
.aysBox {
  padding: 20px 20px 0 20px;
  width: 99%;
  min-height: 100px;
  .title {
    line-height: 1.6rem;
    font-size: 1.6rem;
    font-weight: bold;
  }
  .Fr {
    float: right;
  }
  .title2 {
    line-height: 1.6rem;
    font-size: 1.6rem;
    font-weight: bold;
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
.checkBox {
  display: inline-block;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  outline: 0;
  margin-top: 2px;
  padding: 0 15px;
}
.checkall {
  margin: 10px 20px;
}
</style>