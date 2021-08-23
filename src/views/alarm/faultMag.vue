<template>
  <div class="contents lingBut">
    <Warrp-temp>
      <template slot="tabs">
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label=" 历史故障 " name="0"></el-tab-pane>
          <el-tab-pane label=" 历史预警 " name="1"></el-tab-pane>
        </el-tabs>
      </template>
      <template slot="search">
        <el-form inline>
          <el-form-item label="等级">
            <el-select v-model="searchObj.criticality" clearable>
              <el-option v-for="item in options.criticality" :value="item.value" :label="item.label">{{item.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker v-model="searchObj.value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="设备">
            <el-select v-model="searchObj.breakerCode" clearable>
              <el-option v-for="item in breakerList" :value="item.breakerCode" :label="item.breakerName">{{item.breakerNameStr}}/{{item.breakerName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchObj.isHandle" :clearable='false'>
              <el-option v-for="item in isHandlelList" :value="item.value" :label="item.label">{{item.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="searchClick">{{$t("button.search")}}</el-button>

        </el-form>

      </template>
      <template slot="created">
        <!-- <el-button @click="searchClick">导出</el-button> -->
      </template>
      <template slot="table">
        <div v-if="tableList">
          <el-table :data="tableList" ref="singleTable" highlight-current-row @current-change="handleCurrentChange2">
            <el-table-column label="等级" width="80px">
              <template slot-scope="scope">
                <span>
                  <el-tag size="small" type="danger">
                    {{dictionaries.criticality[scope.row.criticality]}}
                  </el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="发生时间" prop="" min-width='100px'>
              <template slot-scope="scope">
                <span v-if="activeName==0">
                  {{scope.row.faultTime}}
                </span>
                <span v-if="activeName==1">
                  {{scope.row.warningTime}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="区域" prop="domainNameStr" min-width='150px'></el-table-column>
            <el-table-column label="类型" prop="">
              <template slot-scope="scope">
                <span v-if="activeName==0">
                  {{scope.row.faultContent}}
                </span>
                <span v-if="activeName==1">
                  {{scope.row.warningContent}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="设备名称" prop="breakerName"></el-table-column>
            <el-table-column label="网关地址" min-width="130">
              <template slot-scope="scope">
                {{scope.row.gatewayAddress}} / {{scope.row.breakerAddress}}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="editOne(scope.row)">查看详情</el-button>
                <el-button type="text" v-if="activeName=='0'" @click="delOne(scope.row)">故障录波</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template slot="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
      </template>
    </Warrp-temp>
    <!-- ===============================新增报修================================== -->
  </div>
</template>
<script>
import { Table, TableColumn, Tabs, TabPane, DatePicker, Tag } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapGetters } from 'vuex';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elTabs: Tabs,
    elTabPane: TabPane,
    elDatePicker: DatePicker,
    elTag: Tag
  },
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      stationCode: '',
      total: 0,
      searchObj: {
        isHandle: '0',
      },
      tableList: [],
      activeName: '0',
      stateList: [],//搜索条件
      typeList: [],//搜索条件
      isOffList: [],//是否列表
      breakerList: [],//设备列表
      levelList: [],
      currentRow: null,
      isHandlelList: [
        {
          value: '0',
          label: '待处理'
        },
        {
          value: '1',
          label: '已处理'
        },
        {
          value: '-1',
          label: '全部'
        },
      ],
      FaultTypeObj: {}
    }
  },
  mounted() {
    this.gum()


  },

  created() {

  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
    ...mapGetters('login', ['getStationInfo'])

  },
  methods: {
    gum() {
      if(this.$route.query.activeName) {
        this.activeName = String(this.$route.query.activeName)
      } else {
        this.activeName = '0'
      }
      this.getBreakerListByStationCode();
      this.search();
    },
    //搜索
    searchClick() {
      this.paginationData.pageNo = 1;
      this.search()
    },
    search() {
      if(this.activeName == 0) {
        this.faultQueryPageList()
      } else {
        this.warningQueryPageListPath()
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
    handleClick(i) {
      this.tableList = []
      this.paginationData.pageNo = 1;
      this.search()
    },
    //
    faultQueryPageList() {
      this.tableList = null;
      let obj = {

      }
      if(this.searchObj.value1 && this.searchObj.value1.length > 0) {
        obj = {
          "stationCodes": [
            this.getStationCode
          ],
          ...this.searchObj,
          ...this.paginationData,
          beginTime: this.searchObj.value1[0],
          endTime: this.searchObj.value1[1],
        }
      } else {
        obj = {
          "stationCodes": [
            this.getStationCode
          ],
          ...this.searchObj,
          ...this.paginationData,

        }
      }



      http(api.faultQueryPageList, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      });
    },
    warningQueryPageListPath() {
      this.tableList = null
      if(this.searchObj.value1 && this.searchObj.value1.length > 0) {
        this.searchObj.beginTime = this.searchObj.value1[0];
        this.searchObj.endTime = this.searchObj.value1[1]
      }

      let obj = {
        "stationCodes": [
          this.getStationCode
        ],
        ...this.searchObj,
        ...this.paginationData
      }

      http(api.warningQueryPageListPath, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      });
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange2(val) {
      this.currentRow = val;
    },

    editOne(item) {
      let type = '';
      if(this.activeName == 1) {
        type = 2
      } else {
        type = 1
      }
      this.$router.push({
        path: "/faultDetails",
        query: {
          id: item.id,
          type: type
        }
      });

    },
    delOne(item) {
      this.$router.push({
        path: "/faultRecording",
        query: {
          breakerCode: item.breakerCode,
          time: item.faultTime,
          domainNameStr: item.domainNameStr
        }
      });
    },
    //设备列表
    getBreakerListByStationCode() {
      http(api.getBreakerListByStationCode, { stationCode: this.getStationCode }).then(res => {
        this.breakerList = res
      })
    },
  },
  watch: {
    '$route': function(to, from) {
      this.gum()
    }
  },
}
</script>
<style lang="less" scoped>
.contents {
  height: 100%;
  padding: 10px 0;
}
.fl {
  text-align: right;
}
.el-cascader,
.el-textarea,
.el-input {
  width: 200px !important;
}
.onehang {
  cursor: pointer;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-cascader-menu__wrap {
  height: 204px !important;
}
</style>