<template>
  <div class="content">
    <el-table :data="orderList" stripe style="width: 100%">
      <el-table-column label="网关地址" prop="gateway_address" width="200px"></el-table-column>
      <el-table-column label="设备地址" prop="binding_code"></el-table-column>
      <el-table-column label="报文类型" prop="gateway_address" width="200px"></el-table-column>
      <el-table-column label="记录数" prop="binding_code"></el-table-column>
      <el-table-column label="更新时间" prop="binding_code"></el-table-column>
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
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 100,
      orderList: [
      ],
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    handleCurrentChange() {

    },
    handleSizeChange() {

    }
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
</style>