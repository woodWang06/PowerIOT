<template>
  <div class="content lingBut">
    <Warrp-temp>
      <template slot="search">
        <el-form inline label-width="100px">
          <el-form-item :label="$t('gatewaySet.gatewayName')">
            <el-input v-model="searchObj.gatewayName" placeholder="请输入网关名称"></el-input>
          </el-form-item>
          <el-button type="primary" @click="search">{{$t("button.search")}}</el-button>
        </el-form>

      </template>
      <template slot="created">
        <div>
          <el-button @click="addOne">{{$t("button.add")}}</el-button>
        </div>
      </template>

      <template slot="table">
        <el-table :data="tableList" stripe style="width: 100%">
          <el-table-column :label="$t('gatewaySet.gatewayName')" prop="gatewayName"></el-table-column>
          <el-table-column :label="$t('gatewaySet.gatewayAddress')" prop="gatewayAddress" width="200px"></el-table-column>
          <el-table-column :label="$t('gatewaySet.startstopStatus')" prop="deleteFlag">
            <template slot-scope="scope">
              {{dictionaries.deleteFlag[scope.row.deleteFlag]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.operate')" width="510" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="editOne(scope.row)">{{$t("button.edit")}}</el-button>
              <!-- <el-button type="primary" size="mini" plain @click="rateClick(scope.row)">{{$t("gatewaySet.frequencyCommunication")}}</el-button> -->
              <!-- <el-button type="primary" size="mini" plain @click="sendClick('2',scope.row)">{{$t("gatewaySet.upload")}}</el-button> -->
              <!-- <el-button type="primary" size="mini" plain @click="sendClick('1',scope.row)">{{$t("gatewaySet.release")}}</el-button> -->
              <el-button type="text" v-if="scope.row.deleteFlag" @click="delOne(scope.row)">{{$t("button.enable")}}</el-button>
              <el-button type="text" v-if="!scope.row.deleteFlag" @click="delOne(scope.row)">{{$t("button.suspend")}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
      </template>
    </Warrp-temp>
    <el-dialog :title="modalType==1?'新增网关':'修改网关'" class="dialogClass" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px">
      <div class="b_datas ">
        <el-form inline label-width="140px" size="small" :model="editForm" :rules="rules" ref="editForm">
          <el-form-item :label="$t('gatewaySet.gatewayName')" prop="gatewayName">
            <el-input placeholder="请输入网关名称" v-model="editForm.gatewayName" :maxlength="50" class="inputs"></el-input>
          </el-form-item>
          <el-form-item :label="$t('gatewaySet.gatewayAddress')" prop="gatewayAddress">
            <el-input placeholder="请输入网关地址" :maxlength="50" v-model="editForm.gatewayAddress" class="inputs"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button size="small" type="primary" @click="confirmAdd('editForm')">{{$t("button.confirm")}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('gatewaySet.frequencyEdit')" class="dialogClass" :visible.sync="dialogVisible3" :close-on-click-modal="false" width="500px">
      <div class="b_datas ">
        <el-form inline size="small" :model="minForm" :rules="rules" ref="minForm">
          <el-form-item :label="$t('gatewaySet.frequencyCommunicationM')" prop="min">
            <el-input placeholder="输入值必须是15的倍数" :maxlength="50" type="ahe" v-model.number="minForm.min" class="inputs"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible3 = false">{{$t("button.cancel")}}</el-button>
        <el-button size="small" type="primary" @click="confirmMin('minForm')">{{$t("button.confirm")}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('gatewaySet.record')" width="75%" class="dialogClass" :visible.sync="dialogVisible2" :close-on-click-modal="false">
      <tableDate v-if="dialogVisible2"></tableDate>
    </el-dialog>
    <el-dialog :title="istype==1?$t('gatewaySet.releaseRecord'):$t('gatewaySet.uploadRecord')" width="75%" class="dialogClass" :visible.sync="dialogVisible4" :close-on-click-modal="false">
      <sendModal :type="istype" :gatewayAddress='gatewayAddress' v-if="dialogVisible4"></sendModal>
    </el-dialog>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Tree, Drawer, Tabs, TabPane, DatePicker } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
import tableDate from "./common/tableDate";
import sendModal from "./common/sendModal";
import { benAndNumber } from 'utils/rules';
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
    tableDate,
    sendModal

  },
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      searchObj: {},
      dialogVisible: false,//新增编辑弹窗
      minForm: {},
      dialogVisible2: false,//记录弹窗
      dialogVisible3: false,//通讯频率弹窗
      dialogVisible4: false,//上送下发弹窗
      tableList: [],
      istype: 1,
      modalType: 1,
      editForm: {},
      gatewayAddress: '',
      rules: {
        gatewayName: [
          { required: true, message: '请输入网关名称', trigger: 'blur' },
        ],
        gatewayAddress: [
          { required: true, message: '请输入网关地址', trigger: 'blur' },
          { validator: benAndNumber, trigger: 'blur' },
        ],
        min: [
          { required: true, message: '请输入通讯频率', trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
    this.gatewayList()
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    this.searchObj.stationCode = this.getStationCode
  },
  methods: {
    search() {
      this.gatewayList()
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
    //记录
    recordClick() {
      this.dialogVisible2 = true;
    },
    //通讯频率
    rateClick(item) {
      this.minForm = {
        gatewayAddress: item.gatewayAddress
      }
      this.dialogVisible3 = true;
    },
    sendClick(falg, item) {
      this.gatewayAddress = item.gatewayAddress
      this.istype = falg;
      this.dialogVisible4 = true;
    },
    //列表接口
    gatewayList() {
      let obj = {
        ...this.searchObj,
        ...this.paginationData,
      }
      http(api.gatewayList, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      })
    },
    addOne() {
      this.editForm = {};
      this.modalType = 1;
      this.dialogVisible = true;

    },
    editOne(item) {
      this.editForm = JSON.parse(JSON.stringify(item));
      this.modalType = 2;
      this.dialogVisible = true;

    },
    //新增修改校验
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.modalType == 1) {
            this.gatewayAdd()
          } else {
            this.gatewayUpdate()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    gatewayAdd() {
      http(api.gatewayAdd, { ...this.editForm, stationCode: this.searchObj.stationCode }).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.search();
        this.dialogVisible = false;
      })
    },
    gatewayUpdate() {
      http(api.gatewayUpdate, this.editForm).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.search();
        this.dialogVisible = false;
      })
    },
    //停用
    delOne(item) {
      let mess = '';
      if(!item.deleteFlag) {
        mess = '停用'
      } else {
        mess = '启用'
      }
      this.$confirm("确定" + mess + "此网关？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          if(!item.deleteFlag) {
            let obj = {
              deleteFlag: 1,
              gatewayCode: item.gatewayCode
            }
            this.gatewayChangeStatus(obj, '停用');
          } else {
            let obj = {
              deleteFlag: 0,
              gatewayCode: item.gatewayCode
            }
            this.gatewayChangeStatus(obj, '启用');
          }

        })
        .catch(() => { });
    },
    gatewayChangeStatus(obj, mess) {
      http(api.gatewayChangeStatus, obj).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search();
      })
    },
    confirmMin(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.gatewayCmdFrequency()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    gatewayCmdFrequency() {
      http(api.gatewayCmdFrequency, this.minForm).then(res => {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.search();
        this.dialogVisible3 = false;
      })
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
</style>