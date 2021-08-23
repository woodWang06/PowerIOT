<template>
  <div class="contents lingBut">
    <Warrp-temp>
      <template slot="tabs">
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待处理" name="0"></el-tab-pane>
          <el-tab-pane label="处理中" name="3"></el-tab-pane>
          <el-tab-pane label="已处理" name="9"></el-tab-pane>
          <el-tab-pane label="待审核" name="6"></el-tab-pane>
        </el-tabs>
      </template>
      <template slot="search">
        <el-form inline>
          <el-form-item label="等级">
            <el-select v-model="searchObj.repairLevel" clearable>
              <el-option v-for="item in options.criticality" :value="item.value" :label="item.label">{{item.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工单类型">
            <el-select v-model="searchObj.repairType" clearable>
              <el-option v-for="item in typeList" :value="item.dictKey" :label="item.dictValue">{{item.dictValue}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick">查询</el-button>
          </el-form-item>
        </el-form>

      </template>
      <!-- <template slot="created">
        <el-button @click="searchClick">导出</el-button>
      </template> -->
      <template slot="table">
        <div>
          <el-table :data="tableList" ref="singleTable" highlight-current-row>
            <el-table-column label="等级" prop="repairType_dictText" width="70px">
              <template slot-scope="scope">
                <span>
                  <el-tag size="small" type="danger">
                    {{dictionaries.repairLevel[scope.row.repairLevel]}}
                  </el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="60px">
              <template slot-scope="scope">
                <span>
                  {{typeObj[scope.row.repairType]}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="维修设备" prop="breakerName"></el-table-column>
            <el-table-column label="区域" prop="domainNameStr" min-width="160px"></el-table-column>
            <el-table-column label="执行用户" prop="handleAccountName" width="90px">
            </el-table-column>
            <el-table-column label="执行状态" width="100px">
              <template slot-scope="scope">
                <span>
                  {{dictionaries.repairState[scope.row.repairState]}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="设备情况" prop="repairTask" min-width="150px">
              <template slot-scope="scope">
                <span v-html="scope.row.realReason?scope.row.realReason:scope.row.preReason">

                </span>
              </template>
            </el-table-column>
            <el-table-column label="审核用户" prop="auditAccountName"></el-table-column>
            <el-table-column label="故障时间" prop="dispatchTime" width="170px"></el-table-column>
            <el-table-column :label="$t('table.operate')" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="activeName=='6'" @click="editOne(scope.row)">审核</el-button>
                <el-button type="text" v-else @click="gofaultDetail(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template slot="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
      </template>
    </Warrp-temp>
    <!-- ===============================分派================================== -->
    <modals :addObj='addObj' :dialog='dialog' v-if="dialog">
    </modals>
  </div>

</template>
<script>
import { Table, TableColumn, Tabs, TabPane, DatePicker, Tag } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
import modals from '../faultDetail/detailModal'
import scripts from '../faultDetail/js/min';
export default {
  mixins: [scripts],
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elTabs: Tabs,
    elTabPane: TabPane,
    elDatePicker: DatePicker,
    elTag: Tag,
    modals
  },
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      searchObj: {},
      tableList: [],
      activeName: '0',
      dialog: false,
      addObj: {},
      domainList: [],
      levelList: [],
      oneInfo: {},
      currentRow: null,

    }
  },
  mounted() {
    this.repairList();
  },
  created() {
    this.gum()
    this.oneInfo = this.getStationInfo;
    if(this.oneInfo.repairIdx) {
      this.activeName = this.oneInfo.repairState
    }
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
    ...mapGetters('login', ['getStationInfo'])

  },
  methods: {
    gum() {
      if(this.$route.query.activeName) {
        this.activeName = String(this.$route.query.activeName)
      }
    },
    //搜索
    searchClick() {
      this.paginationData.pageNo = 1;
      this.search()
    },
    search() {
      this.repairList()
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
    repairList() {
      this.tableList = null
      let obj = {
        ...this.searchObj,
        ...this.paginationData,
        repairState: this.activeName,
        "stationCodes": [
          this.getStationCode
        ]
        // queryType: this.activeName,
      }
      http(api.repairQueryPageList, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;

      });
    },
    gofaultDetail(item) {
      this.$router.push({
        path: "/faultDetail",
        query: {
          repairId: item.repairId,
        }
      });
    },
    editOne(item) {
      http(api.detail, { repairId: item.repairId }).then(res => {
        this.dialog = true;
        this.addObj = res
      });

    },
    fatherMethod() {
      this.dialog = false;
      this.searchClick()
    },
  },
  watch: {
  }

}
</script>
<style lang="less" scoped>
</style>