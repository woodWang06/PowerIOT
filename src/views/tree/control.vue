<template>
  <div class="content">
    <div class="warrp">
      <div class="search">
        <el-button type="primary" size="small" class="m_l" @click='goDomainTopo'>{{$t("button.back")}}</el-button>
      </div>
      <div class="disFlex">
        <div class="left">
          <div class="aysBox">
            <div class="title">{{$t("tree.controlBatch")}}</div>
            <el-tree :data="data" :show-checkbox='falgcheckbox' default-expand-all node-key="id" ref="tree" highlight-current check-strictly :props="defaultProps" @check-change="handleCheckChange">
            </el-tree>
          </div>

        </div>
        <div class="right">
          <div class="aysBox">
            <div class="title">{{$t("tree.openingControl")}}</div>
            <el-button type="primary" size="small" class="m_l" @click='batchCmdOpenClose($t("tree.openingRemote"),"0")'>{{$t("tree.openingRemote")}}</el-button>
            <el-button type="primary" size="small" class="m_l" @click='batchCmdOpenClose($t("tree.closingRemote"),"1")'>{{$t("tree.closingRemote")}}</el-button>
          </div>
          <div class="aysBox">
            <div class="title">{{$t("tree.ControlTimed")}}</div>
            <el-button type="primary" size="small" class="m_l" @click='timeControl'>{{$t("tree.timeControlBatch")}}</el-button>
            <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-for="(item,index) in mutListName" :label="item.label" :key="index" :name="item.name"></el-tab-pane>
            </el-tabs>
            <div v-if="mutListName.length">
              <div class="timeBox" v-for="item in timeList">
                <div>
                  <div>
                    <span> 定时任务：
                      <span v-if="item.switchType=='0'">断开 </span>
                      <span v-if="item.switchType=='1'">闭合 </span>
                    </span> 定时时间： {{dictionaries.timeList[item.timingWeek]}} {{item.timingHour}}:{{item.timingMinute}}
                  </div>
                </div>
                <div>
                  <i style="color:#F56C6C ;  cursor: pointer;" class="el-icon-delete-solid" @click="delthis(item)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="新增定时任务" class="dialogClass" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px">
      <div class="b_datas">
        <el-form inline label-width="80px" size="small" :model="addFrom" ref="addFrom">
          <el-form-item label="重复">
            <el-select v-model="addFrom.timingWeeks" placeholder="请选择重复时间" multiple>
              <el-option v-for="item in options.timeList" :value="item.value" :label="item.label">{{item.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="闭合">
            <el-time-picker v-model="addFrom.closeTiming" placeholder="闭合时间" value-format="HH:mm" format="HH:mm">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="断开">
            <el-time-picker v-model="addFrom.breakTiming" placeholder="断开时间" value-format="HH:mm" format="HH:mm">
            </el-time-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button size="small" type="primary" @click="confirmAdd('addFrom')">{{$t("button.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Tree, Drawer, Tabs, TabPane, DatePicker, TimePicker } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
import { formatDate, formatMonth, formatYear } from 'utils';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elDialog: Dialog,
    elTree: Tree,
    elDrawer: Drawer,
    elTabs: Tabs,
    elTabPane: TabPane,
    elDatePicker: DatePicker,
    elTimePicker: TimePicker
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'domainName'
      },

      falgcheckbox: true,
      searchObj: {},
      mutList: [],
      mutListName: [],
      activeName: 0,
      dialogVisible: false,

      addFrom: {},
      timeList: [],
      activeNameObj: {}
    }
  },
  mounted() {
    // this.dataAyas();
    this.getDomainTopoSimple();

  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    this.searchObj.stationCode = this.getStationCode;
  },
  methods: {
    handleClick(e) {
      this.activeName = e.name;
      this.activeNameObj = e;
      this.queryBreakerTimingList(e)
    },
    timeControl() {
      if(this.mutList.length == 0) {
        this.$message({
          type: "error",
          message: "请先选择设备"
        });
        return;
      }
      this.addFrom = {};
      this.dialogVisible = true
    },
    //设备递归循环
    traverseTree(data) {
      if((data.domainType == 'D5' || data.domainType == 'D6') && data.breakerCode) {
        data.disabled = false
        data.domainName = data.domainName + ' / ' + data.breakerName

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
      if(checked) {
        this.mutList.push(data.breakerCode);
        let obj = {
          name: data.breakerCode,
          label: data.domainName
        }
        this.mutListName.push({
          ...obj
        })
      } else {
        let index = this.mutList.indexOf(data.breakerCode)
        this.mutList.splice(index, 1);
        this.mutListName.splice(index, 1);
      }
      this.activeName = this.mutListName[0].name;
      this.activeNameObj = this.mutListName[0]
      this.queryBreakerTimingList(this.mutListName[0])
      console.log(data, checked, indeterminate);
    },
    //侧边设备
    getDomainTopoSimple() {
      this.data = [];
      this.mutList = [];
      this.mutListName = [];
      this.falgcheckbox = true;
      http(api.getDomainTopoSimple, { ...this.searchObj, withLoop: true }).then(res => {
        this.data.push(res);
        this.traverseTree(res)
      })
    },
    goControl(res) {
      if(this.mutList.length == 0) {
        this.$message({
          type: "error",
          message: "请先选择设备"
        });
        return;
      }
      let that = this
      this.$ingAnimate.open();
      setTimeout(function() {
        that.$ingAnimate.close();
        that.$alert(res + "成功", "提示", {
          confirmButtonText: this.$t("button.confirm"),
          callback: action => {
          }
        });
      }, 3000);
    },
    goDomainTopo() {
      this.$router.push('/tree');
    },
    //新增
    confirmAdd(formName) {
      // this.$refs[formName].validate((valid) => {
      // if(valid) {
      //   if(this.modalType == 1) {
      //     this.sysAccountAdd()
      //   } else {
      //     this.sysAccountUpdate()
      //   }
      // } else {
      //   console.log('error submit!!');
      //   return false;
      // }
      http(api.breakerTimingadd, { breakerCodes: this.mutList, ...this.searchObj, ...this.addFrom }).then(res => {
        if(res) {
          this.$message({
            type: "success",
            message: "新增定时控制成功"
          });
          this.dialogVisible = false;
          this.queryBreakerTimingList(this.activeNameObj)
        }

      })

      // });
    },
    queryBreakerTimingList(obj) {
      http(api.queryBreakerTimingList, { breakerCodes: obj.name }).then(res => {
        this.timeList = res[obj.name]
      })
    },
    //停用
    delthis(item) {
      this.$confirm("确定删除此定时任务？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          this.queryBreakerTimingdel(item, '删除');
        })
        .catch(() => { });
    },
    queryBreakerTimingdel(obj, mess) {
      http(api.queryBreakerTimingdel, { id: obj.id }).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.queryBreakerTimingList(this.activeNameObj);
      })
    },
    batchCmdOpenClose(name, type) {
      if(this.mutList.length == 0) {
        this.$message({
          type: "error",
          message: "请先选择设备"
        });
        return;
      }
      http(api.batchCmdOpenClose, { ...this.searchObj, breakerCodes: this.mutList, openClose: type }).then(res => {
        this.$message({
          type: "success",
          message: name + "命令已发送"
        });

      })
    }
  },
  watch: {

  }}
</script>
<style lang="less" scoped>
.warrp {
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  // display: flex;
  // flex-direction: column;
  background: #fff;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;
}
.dates {
  text-align: right;
}
.aysBox {
  padding: 20px 20px 0 20px;
  width: 99%;
  .title {
    line-height: 16px;
    border-left: 3px solid #409eff;
    padding-left: 8px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
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
  margin: 20px;
  .left {
    flex: 0.2;
  }
  .right {
    width: 89%;
  }
}
.timeBox {
  background: #f5f5f5;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  line-height: 28px;
  margin-top: 15px;
  span {
    margin-right: 20px;
  }
  i {
    font-size: 20px;
  }
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 200px !important;
}
.search {
  text-align: right;
}
</style>