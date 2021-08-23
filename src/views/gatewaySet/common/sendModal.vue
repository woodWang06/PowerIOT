<template>
  <div class="content">
    <div class="searchBox">
      <el-form class="left" inline size="small" label-width="80px">
        <el-form-item label="时间">
          <el-date-picker v-model="searchObj.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable>
          </el-date-picker> -
          <el-date-picker v-model="searchObj.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下发状态" v-if="type==1">
          <el-select v-model="searchObj.accessState" clearable>
            <el-option v-for="item in downList" :value="item.dictKey" :label="item.dictValue">{{item.dictValue}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上送状态" v-if="type==2">
          <el-select v-model="searchObj.recordState" clearable>
            <el-option v-for="item in upList" :value="item.dictKey" :label="item.dictValue">{{item.dictValue}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字" clearable>
          <el-input placeholder="设备地址/流水号/内容类型" v-model="searchObj.keyword"></el-input>
        </el-form-item>
      </el-form>
      <div class="right">
        <el-button type="primary" size="small" @click="search" icon="el-icon-search">{{$t("button.search")}}</el-button>
      </div>
    </div>
    <el-table :data="tableList" stripe style="width: 100%">
      <el-table-column label="网关地址" prop="gatewayAddress" width="200px"></el-table-column>
      <el-table-column label="设备地址" prop="breakerAddress"></el-table-column>
      <el-table-column label="下发状态" v-if="type==1" prop="accessState_dictText "></el-table-column>
      <!-- <el-table-column label="上送状态" v-if="type==2" prop="recordState"></el-table-column> -->
      <el-table-column label="流水号" prop="serialNumber	"></el-table-column>
      <!-- <el-table-column label="内容类型" prop="contentType"></el-table-column> -->
      <el-table-column label="内容" prop="content	"></el-table-column>
      <!-- <el-table-column label="提交用户" prop="submitAccount"></el-table-column> -->
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <!-- <el-table-column label="更新时间" prop="updateTime"></el-table-column> -->
    </el-table>
    <div class="pagination">
      <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Tree, Drawer, Tabs, TabPane, DatePicker } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elDialog: Dialog,
    elTree: Tree,
    elDrawer: Drawer,
    elTabs: Tabs,
    elTabPane: TabPane,
    elDatePicker: DatePicker

  },
  props: {
    type: {
      type: String,
    },
    gatewayAddress: {
      type: String,
    },
  },
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      tableList: [
      ],
      upList: [],
      downList: [],
      searchObj: {}
    }
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  mounted() {
    this.sysDictSubList();

    if(this.type == 1) {
      this.gatewayAccess()
    } else {
      this.gatewayRecord()
    }
  },
  created() {
    this.searchObj.stationCode = this.getStationCode;
  },
  methods: {
    search() {
      if(this.type == 1) {
        this.gatewayAccess()
      } else {
        this.gatewayRecord()
      }
    },
    handleCurrentChange(e) {
      this.paginationData.pageNo = e;
      this.search()
    },
    handleSizeChange(e) {
      this.paginationData.pageSize = e;
      this.paginationData.pageNo = 1;
      this.search()
    },
    //搜索条件
    sysDictSubList() {
      http(api.sysDictSubList, { dictCode: 'D3011' }).then(res => {
        this.upList = res
      });
      http(api.sysDictSubList, { dictCode: 'D3021' }).then(res => {
        this.downList = res
      });
    },
    gatewayAccess() {
      let obj = {
        ...this.searchObj,
        ...this.paginationData,
        gatewayAddress: this.gatewayAddress,
      }
      http(api.gatewayAccess, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      })
    },
    gatewayRecord() {
      let obj = {
        ...this.searchObj,
        ...this.paginationData,
        gatewayAddress: this.gatewayAddress,
      }
      http(api.gatewayRecord, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      })
    },
  },
  watch: {
  }

}
</script>
<style lang="less" scoped>
.green {
  color: #2cb531;
}
.red {
  color: #2cb531;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
.searchBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  .left {
    flex: 0.9;
  }
  .right {
    flex: 0.1;
    margin-bottom: 18px;
  }
}
</style>