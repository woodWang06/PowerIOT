<template>
  <div class="content lingBut">
    <div class="warrp">
      <div class="tabs">
        谐波检测
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
            <div class="datesStyle">
              <el-date-picker suffix-icon="el-icon-date" v-model="dayValue" type="date" :clearable="false" value-format="yyyy-MM-dd" placeholder="选择日期" @change="handleClick2">
              </el-date-picker>
              <el-select v-model="searchObj.type1" clearable>
                <el-option v-for="(item,index) in type1" :key="index" :label="item.label" :value="item"></el-option>
              </el-select>
              <div class="checkBox">
                <el-checkbox-group v-model="searchObj.checkList">
                  <el-checkbox v-for="(item,index) in type3" :key="index" :label="item.value" :value="item.value">{{item.label}}</el-checkbox>
                  <!-- <el-checkbox value='2' label="B相"></el-checkbox>
                  <el-checkbox value='3' label="C相"></el-checkbox> -->
                </el-checkbox-group>
              </div>
              <!-- <el-select v-model="searchObj.list" multiple collapse-tags placeholder="请选择" @change="selectchange">
                <el-checkbox class="checkall" label="全选" @change="AllChange"></el-checkbox>
                <el-option v-for="item in type2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
              <el-select v-model="searchObj.list" collapse-tags placeholder="请选择">
                <el-option v-for="item in type2" :key="item.value" :label="item.label" :value="item">
                </el-option>
              </el-select>
              <el-button type="primary" @click="search">查询</el-button>
            </div>
            <div class="aysBox">
              <el-button class="Fr" @click="clickParent">导出</el-button>
              <div class="title">数据图表<span v-if="domainOBJ.domainName">({{domainOBJ.domainName}})</span></div>
              <chartsL ref='mychild' v-if="ylist.length>0" :ylist="ylist" :xlist="xlist" width="100%" :activeNameName="domainOBJ.domainName+searchObj.type1.label+searchObj.list.label+'图'"></chartsL>
            </div>
            <div class="datesStyle">
              <el-button class="Fr" @click="$exportToExcel('谐波检测'+domainOBJ.domainName)">导出</el-button>
            </div>
            <div class="aysBox">

              <div class="title2">数据报表</div>
              <el-table border :data="xlist" class="tableBox " id="out-table">
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
                <el-table-column v-for="(item ,index) in ylist" :key="index" :label="item.fPhase">
                  <template slot-scope="scope">
                    <div> {{item.valuelist[scope.$index]}}</div>
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
import { Table, TableColumn, Dialog, Tree, Drawer, Tabs, TabPane, DatePicker } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
import chartsL from "../chart/hamLine";
import { formatDate, formatMonth, formatYear } from 'utils';
import json from './json/json';
import scripts from './min/script';
export default {
  mixins: [scripts],
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elDialog: Dialog,
    elTree: Tree,
    elDrawer: Drawer,
    elTabs: Tabs,
    elTabPane: TabPane,
    elDatePicker: DatePicker,
    chartsL,
  },
  data() {
    return {
      startDatepickerOptions: {
        disabledDate: (time) => {
          if(this.beginDate) {
            return time.getTime() > new Date(this.beginDate).getTime()
          } else {
            return false
          }
        }
      },
      endDatepickerOptions: {
        disabledDate: (time) => {
          if(this.endDate) {
            return time.getTime() < new Date(this.endDate).getTime()
          } else {
            return false
          }
        }
      },
      searchObj: {
        checkList: ['1'],
        list: {
          value: '0',
          label: '总谐波'
        },
        type1: {
          value: '1',
          label: '电流谐波'
        },
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
      zid: {},
      chartData: {
        ylist: []
      },
      ylist: [],
      xlist: [],
      type1: [
        {
          value: '1',
          label: '电流'
        },
        {
          value: '2',
          label: '电压'
        }
      ],
      type3: [
        {
          value: '1',
          label: 'A相'
        },
        {
          value: '2',
          label: 'B相'
        },
        {
          value: '3',
          label: 'C相'
        }
      ],
      type2: [
        {
          value: '0',
          label: '总谐波'
        }, {
          value: '3',
          label: '3次谐波'
        }, {
          value: '5',
          label: '5次谐波'
        },
        {
          value: '7',
          label: '7次谐波'
        },
        {
          value: '9',
          label: '9次谐波'
        },
        {
          value: '11',
          label: '11次谐波'
        },
        {
          value: '13',
          label: '13次谐波'
        },
        {
          value: '15',
          label: '15次谐波'
        },
        {
          value: '17',
          label: '17次谐波'
        },
        {
          value: '19',
          label: '19次谐波'
        },
        {
          value: '20',
          label: '21次谐波'
        },
        {
          value: '23',
          label: '23次谐波'
        },
        {
          value: '24',
          label: '25次谐波'
        },

        {
          value: '25',
          label: '27次谐波'
        },
        {
          value: '26',
          label: '29次谐波'
        },
        {
          value: '27',
          label: '31次谐波'
        },
      ],
      domainCode: ''

    }
  },
  mounted() {
    // this.search();
    this.queryHarmonic()
    // this.getDomainTopoSimple('1');

  },
  computed: {
    ...mapGetters('login', ['getStationCode']),

  },
  created() {
  },
  methods: {
    other() { },
    search() {
      this.queryHarmonic()
    },
    handleClick2() {

    },
    handleClick() {

    },
    handleCheckClick(e) {
      this.domainCode = e.domainName;
      this.search()
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
    selectchange(val, $event) {
      debugger
      this.searchObj.list = val
    },
    //获取前30天能耗数据
    getStationThirtyDaysEnergy() {
      this.rows = [];
      this.tableData = [];
      this.tableDataLable = [];
      this.datekeys = []
      this.chartData = json
    },
    //设备递归循环
    traverseTree(data) {
      if((data.domainType == 'D5' || data.domainType == 'D6') && data.breakerCode) {
        data.disabled = false
        if(this.activeName == '6') {
          data.domainName = data.loadNameText
        }
      } else {
        data.disabled = true;
      }
      if(data.children) {
        data.children.forEach(element => {
          this.traverseTree(element)
        });
      }
    },
    //设备选择
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      this.queryHarmonic()
    },
    //侧边设备
    clickParent() {
      this.$refs.mychild.download();
    },
    queryHarmonic() {
      let obj = {
        'breakerCode': 'B04aba00d',
        'day': '2021-06-01',
        'harmonicCode': this.searchObj.checkList,
        'harmonicNumber': 0,
        'harmonicType': this.searchObj.type1.value,
      }
      this.ylist = []
      http(api.queryHarmonic, obj).then(res => {
        this.xlist = res.xlist;
        let tableData = []
        let that = this
        tableData = Object.keys(res.ymap).sort();
        tableData.forEach(val => {
          that.ylist.push(
            {
              "valuelist": res.ymap[val],
              "fPhase": val,
              "fname": "总谐波",
            }
          )
        })
        console.log(this.ylist)

        // this.ylist = res.ymap
      })
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
          this.mess = ''
        } else if(this.timeObj.tabPosition == '3') {
          this.mess = '月'
        }

      }

    },
    mutListName: {
      handler(val) {
        for(let i in this.mutListName) {
          this.zid[this.mutListName[i].code] = this.mutListName[i].name
        }
      },
      deep: true
    }
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
  // display: flex;
  align-items: center;
  margin-bottom: 30px;
  > div {
    margin-right: 30px;
  }
  .Fr {
    float: right;
  }
}
.aysBox {
  padding: 20px 20px 0 20px;
  width: 99%;
  position: relative;
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
  overflow-x: auto;
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
  margin-bottom: 10px;
}
.checkall {
  margin: 10px 20px;
}

.el-select {
  width: 250px !important;
}
</style>