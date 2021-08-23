<template>
  <div class="contents lingBut">
    <Warrp-temp>
      <template slot="tabs">
      </template>
      <template slot="search">
        <el-form inline>
          <el-form-item label="时间">
            <el-date-picker v-model="searchObj.value1" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="设备">
            <el-select v-model="searchObj.breakerCode" clearable>
              <el-option v-for="item in typeAllList" :value="item.breakerCode" :label="item.breakerName">{{item.breakerNameStr}}/{{item.breakerName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick">查询</el-button>
          </el-form-item>
        </el-form>

      </template>
      <template slot="created">
        <!-- <el-button @click="searchClick">导出</el-button> -->
      </template>
      <template slot="table">
        <!-- =================================tab=============================== -->
        <div>
          <el-table :data="tableList" stripe>

            <el-table-column label="发生时间">
              <template slot-scope="scope">
                <span> {{scope.row.eventTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="区域" prop="domainNameStr" min-width='150px'></el-table-column>
            <el-table-column label="类型">
              <template slot-scope="scope">
                <span> {{scope.row.eventType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="设备名称" prop="breakerName"></el-table-column>
            <el-table-column label="网关地址">
              <template slot-scope="scope">
                {{scope.row.gatewayAddress}} / {{scope.row.breakerAddress}}
              </template>
            </el-table-column>

          </el-table>
        </div>
      </template>
      <template slot="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
      </template>
    </Warrp-temp>
  </div>
</template>
<script>
import { Table, TableColumn, DatePicker } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapGetters } from 'vuex';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elDatePicker: DatePicker
  },
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      searchObj: {
        stationCodes: []
      },
      tableList: [],
      activeName: '3',
      typeAllList: [],
      statusList: [],
      typeList: [],
      readType: '0',//未读已读类型
      multipleTable: []
    }
  },
  mounted() {
    this.breakerEventList()
    this.getBreakerListByStationCode()
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {

  },
  methods: {
    searchClick() {
      this.paginationData.pageNo = 1;
      this.search();
    },
    search() {
      this.multipleTable = []
      this.breakerEventList()
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
    handleClick() {
      this.breakerEventList()
    },
    //事件
    breakerEventList() {
      let arr = [];
      arr.push(this.getStationCode)
      let obj
      if(this.searchObj.value1 && this.searchObj.value1.length > 0) {
        obj = {

          ...this.searchObj,
          ...this.paginationData,
          stationCodes: arr,
          beginTime: this.searchObj.value1[0],
          endTime: this.searchObj.value1[1],
        }
      } else {
        obj = {

          ...this.searchObj,
          ...this.paginationData,
          stationCodes: arr,
        }
      }

      this.tableList = []
      http(api.eventQueryPageList, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      })
    },
    //搜索条件
    getBreakerListByStationCode() {
      http(api.getBreakerListByStationCode, { stationCode: this.getStationCode }).then(res => {
        this.typeAllList = res
      })
    },
  },
  watch: {
  }

}
</script>
<style lang="less" scoped>
.fl {
  text-align: right;
}
.flexs {
  display: flex;
  justify-content: space-between;
}
.contents {
  height: 100%;
  padding: 10px 0;
}
</style>