<template>
  <div class="content lingBut">
    <Warrp-temp>
      <template slot="search">
        <el-form inline>
          <el-form-item label="关键字">
            <!-- <el-select v-model="searchObj.gatewayAddress" :placeholder="$t('equipment.gatewayAddressTS')">
              <el-option v-for="item in gatewayList" :value="item.gatewayAddress" :label="item.gatewayAddress">{{item.gatewayAddress}} / {{item.gatewayName}}</el-option>
            </el-select> -->
            <el-input placeholder="输入关键字" v-model="searchObj.keywords"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="$t('equipment.equipmentCategory')">
            <el-select :placeholder="$t('equipment.equipmentCategoryTS')" v-model="searchObj.breakerLargeType" clearable>
              <el-option v-for="item in typeAllList" :value="item.breakerLargeType" :label="item.breakerLargeTypeName">{{item.breakerLargeTypeName}}</el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item> -->
          <el-button type="primary" size="small" @click="searchClick">{{$t("button.search")}}</el-button>
          <!-- </el-form-item> -->
        </el-form>

      </template>
      <template slot="created">
        <div>
          <el-button @click="addOne">{{$t("button.add")}}</el-button>
        </div>
      </template>
      <!-- <template slot="butted">
        <div>
          <el-button type="primary" @click="addOne">{{$t("button.add")}}</el-button>
        </div>
      </template> -->
      <template slot="table">
        <el-table :data="tableList" stripe style="width: 100%">
          <!-- <el-table-column label="设备编号" prop="breakerCode" ></el-table-column> -->
          <el-table-column :label="$t('equipment.equipmentName')" prop="breakerName" fixed></el-table-column>
          <el-table-column :label="$t('equipment.equipmentCategory')" prop="breakerLargeTypeName"></el-table-column>
          <!-- <el-table-column :label="$t('equipment.project')" prop="stationCode_dictText" min-width="80"></el-table-column> -->
          <!-- <el-table-column :label="$t('equipment.region')" prop="domainCode_dictText" min-width="80"></el-table-column> -->
          <el-table-column :label="$t('equipment.gatewayAddress')" prop="gatewayAddress"></el-table-column>
          <el-table-column :label="$t('equipment.equipmentAddress')" prop="breakerAddress"></el-table-column>
          <el-table-column :label="$t('table.operate')" width="440" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="editOne(scope.row)">{{$t("button.edit")}}</el-button>
              <!-- <el-button type="text" @click="getProtectionByBreakerCode(scope.row)">{{$t("equipment.protectionParameter")}}</el-button> -->
              <el-button type="text" @click="bindGra(scope.row)">{{$t("equipment.bindingGateway")}}</el-button>
              <el-button type="text" @click="delOne(scope.row)">{{$t("button.delete")}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
      </template>
    </Warrp-temp>
    <el-dialog :title="modalType==1?'新增设备':'修改设备'" class="dialogClass" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px">
      <div class="b_datas " v-if="dialogVisible">
        <el-form inline label-width="140px" size="small" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item :label="$t('equipment.equipmentCategory')" prop="breakerLargeType">
            <el-select v-model="ruleForm.breakerLargeType" :placeholder="$t('equipment.equipmentCategoryTS')">
              <el-option v-for="item in typeAllList" :value="item.breakerLargeType" :label="item.breakerLargeTypeName">{{item.breakerLargeTypeName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('equipment.equipmentName')" prop="breakerName">
            <el-input placeholder="请输入设备名称" :maxlength="50" v-model="ruleForm.breakerName" class="inputs">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button size="small" type="primary" @click="confirmAdd('ruleForm')">{{$t("button.confirm")}}</el-button>
      </span>
    </el-dialog>
    <!-- ===============================绑定网关================================== -->
    <el-dialog :title="$t('equipment.bindingGateway')" class="dialogClass" :visible.sync="dialogVisible2" :close-on-click-modal="false" width="500px">
      <div class="b_datas " v-if="dialogVisible2">
        <el-form inline label-width="140px" size="small" :model="bindForm" :rules="rules" ref="bindForm">
          <el-form-item :label="$t('equipment.gatewayAddress')" prop="gatewayAddress">
            <el-select v-model="bindForm.gatewayAddress" placeholder="请选择网关">
              <el-option v-for="item in gatewayList" :value="item.gatewayAddress" :label='item.gatewayAddress'>{{item.gatewayAddress}} / {{item.gatewayName}}</el-option>
            </el-select>
            <!-- <el-input placeholder="请输入网关地址" v-model="bindForm.gatewayAddress" class="inputs"> -->
            <!-- </el-input> -->
          </el-form-item>
          <el-form-item :label="$t('equipment.equipmentAddress')" prop="breakerAddress">
            <el-input placeholder="请输入设备地址" :maxlength="50" v-model="bindForm.breakerAddress" class="inputs">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible2 = false">{{$t("button.cancel")}}</el-button>
        <el-button size="small" type="primary" @click="confirmBind('bindForm')">{{$t("button.confirm")}}</el-button>
      </span>
    </el-dialog>
    <el-drawer :title="$t('equipment.protectionParameter' )" :visible.sync="dialog" direction="rtl" size="40%" custom-class="demo-drawer" ref="drawer">
      <div class="demo-drawer__content" v-if="dialog">
        <div class="times">
          <span>最新上传时间：{{editForm.updateTime}} </span>
        </div>
        <el-form inline="" size="small" label-width="200px">
          <el-form-item :label="item.key" v-for="(item,index) in editForm.breakerPointCurrentDtoList" :key="index">
            <div class="disFle">
              <el-input v-model="item.value" @blur="editInfo(item,index)" :disabled="item.falg"></el-input>
              <el-button class="icons" icon="el-icon-edit" type="text" @click="statuschange(item,index)"></el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Drawer, DatePicker } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapGetters } from 'vuex';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elDialog: Dialog,
    elDrawer: Drawer,
    elDatePicker: DatePicker
  },
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      searchObj: {},
      dialog: false,
      dialogVisible: false,
      tableList: [
      ],
      ruleForm: {},
      editForm: {},
      bindForm: {},//网关绑定
      typeAllList: [],
      modalType: 1,
      rules: {
        breakerName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
        ],
        breakerLargeType: [
          { required: true, message: this.$t('equipment.equipmentCategoryTS'), trigger: 'change' }
        ],
        gatewayAddress: [
          { required: true, message: this.$t('equipment.gatewayAddressTS'), trigger: 'change' }
        ],
        breakerAddress: [
          { required: true, message: '请输入设备地址', trigger: 'blur' },
        ],
      },
      dialogVisible2: false,
      bindBreakerCode: '',
      gatewayList: []
    }
  },
  mounted() {
    this.breakerLargeTypeQueryList();
    this.breakerQueryList();

    this.gatewayQueryList()
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    this.searchObj.stationCode = this.getStationCode
  },
  methods: {
    searchClick() {
      this.paginationData.pageNo = 1;
      this.search();
    },
    search() {
      this.breakerQueryList()
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
    //列表接口
    breakerQueryList() {
      let obj = {
        ...this.searchObj,
        ...this.paginationData,
      }
      http(api.breakerQueryList, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      })
    },
    //设备大类类别
    breakerLargeTypeQueryList() {
      http(api.breakerLargeTypeQueryList).then(res => {
        this.typeAllList = res
      })
    },
    addOne() {
      this.ruleForm = {}
      this.dialogVisible = true;
      this.modalType = 1
    },
    editOne(item) {
      this.ruleForm = JSON.parse(JSON.stringify(item))
      this.dialogVisible = true;
      this.modalType = 2;
    },
    //新增修改校验
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.modalType == 1) {
            this.breakerAdd()
          } else {
            this.breakerUpdate()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //新增
    breakerAdd() {
      http(api.addBreaker, { ...this.ruleForm, stationCode: this.searchObj.stationCode }).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.search();
        this.dialogVisible = false;
      })
    },
    breakerUpdate() {
      http(api.updateBreaker, this.ruleForm).then(res => {
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
      this.$confirm("确定删除此设备？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          let obj = {
            breakerCode: item.breakerCode
          }
          this.breakerDel(obj, '删除');

        })
        .catch(() => { });
    },
    breakerDel(obj, mess) {
      http(api.delBreaker, obj).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search();
      })
    },
    getProtectionByBreakerCode(item) {
      http(api.getProtectionByBreakerCode, { breakerAddress: item.breakerAddress, gatewayAddress: item.gatewayAddress }).then(res => {
        res.breakerPointCurrentDtoList.forEach(element => {
          element.falg = true;
        });
        this.editForm = JSON.parse(JSON.stringify(res));
        this.dialog = true
      })
    },
    bindGra(item) {
      this.bindForm = {
        breakerCode: item.breakerCode
      }
      this.dialogVisible2 = true;
    },
    confirmBind(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.breakerBindGateway()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    breakerBindGateway() {
      http(api.breakerBindGateway, this.bindForm).then(res => {
        this.$message({
          type: "success",
          message: "绑定成功"
        });
        this.dialogVisible2 = false;
        this.search();
      })
    },
    statuschange(item, index) {
      // debugger;
      this.editForm.breakerPointCurrentDtoList[index].falg = false
    },
    editInfo(item, index) {
      let obj = {
        "breakerAddress": this.editForm.breakerAddress,
        "gatewayAddress": this.editForm.gatewayAddress,
        "keyHex": item.keyHex,
        // "value": item.value,
        "valueHex": item.valueHex,
        "valueNew": item.value
      }
      http(api.breakerCmdProtection, obj).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.editForm.breakerPointCurrentDtoList[index].falg = true;
      });
    },
    gatewayQueryList() {
      http(api.gatewayQueryList, { stationCode: this.searchObj.stationCode }).then(res => {
        this.gatewayList = res
      });
    },
    lastTime() {
      this.getProtectionByBreakerCode(this.editForm)
    }
  },
  watch: {
  }

}
</script>
<style lang="less" scoped>
.demo-drawer__content {
  min-height: 100%;
  // margin-bottom: 100px;
}
.demo-drawer__content .el-form-item {
  min-width: 48%;
}
.el-form-item__content {
  width: 180px !important;
}
.demo-drawer__content .disFle {
  width: 200px;
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  .icons {
    margin-left: 5px;
  }
}
.el-input {
  width: 200px;
}
.times {
  text-align: right;
  color: #999;
  font-size: 12px;
  margin-right: 30px;
  margin-bottom: 20px;
  span {
    // cursor: pointer;
  }
}
</style>