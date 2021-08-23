<template>
  <div class="content lingBut">
    <Warrp-temp>
      <template slot="search">
        <el-form inline>
          <el-form-item :label="$t('dictionaryName.dictionaryName')">
            <el-input placeholder="请输入字典名称" v-model="searchObj.dictName" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('dictionaryName.dictionaryCode')">
            <el-input placeholder="请输入字典编码" v-model="searchObj.dictCode" clearable></el-input>
          </el-form-item>
          <el-button type="primary" @click="searchClick">{{$t("button.search")}}</el-button>
        </el-form>
      </template>
      <template slot="created">
        <el-button @click="addOne">{{$t("button.add")}}</el-button>
      </template>
      <template slot="table">
        <el-table :data="tableList" stripe style="width: 100%">
          <el-table-column :label="$t('dictionaryName.dictionaryCode')" prop="dictCode" fixed></el-table-column>
          <el-table-column :label="$t('dictionaryName.dictionaryName')" prop="dictName"></el-table-column>
          <el-table-column :label="$t('dictionaryName.statusEnable')" prop="deleteFlag">
            <template slot-scope="scope">
              {{dictionaries.deleteFlag[scope.row.deleteFlag]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.operate')" min-width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="editSon(scope.row)">{{$t("dictionaryName.subitem")}}</el-button>
              <el-button type="text" @click="editOne(scope.row)">{{$t("button.edit")}}</el-button>
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
    <el-drawer :title="$t('dictionaryName.editSubitem')" class="dialogClass " :visible.sync="dialogVisible" :close-on-click-modal="false" size="50%">
      <div class="b_datas lingBut">
        <div>
          <el-form inline>
            <el-form-item :label="$t('dictionaryName.dictionaryValue')">
              <el-input placeholder="请输入字典值" v-model="searchObj2.dictKey" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search2">{{$t("button.search")}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="addSubOne">{{$t("button.add")}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="drawerList" stripe style="width: 100%">
          <el-table-column :label="$t('dictionaryName.dictionaryKey')" prop="dictKey" fixed></el-table-column>
          <el-table-column :label="$t('dictionaryName.dictionaryValue')" prop="dictValue"></el-table-column>
          <el-table-column :label="$t('dictionaryName.dictionarySequence')" prop="sort"></el-table-column>
          <el-table-column :label="$t('dictionaryName.state')">
            <template slot-scope="scope">
              {{dictionaries.deleteFlag[scope.row.deleteFlag]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.operate')" min-width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="editSubOne(scope.row)">{{$t("button.edit")}}</el-button>
              <el-button type="text" v-if="scope.row.deleteFlag" @click="deSublOne(scope.row)">{{$t("button.enable")}}</el-button>
              <el-button type="text" v-if="!scope.row.deleteFlag" @click="deSublOne(scope.row)">{{$t("button.suspend")}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageSty">
          <el-pagination background @current-change="handleCurrentChange2" :current-page="paginationData2.pageNo" @size-change="handleSizeChange2" :page-size="paginationData2.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total2"></el-pagination>
        </div>
      </div>
    </el-drawer>
    <el-dialog :title="modalType==1?'新增字典':'修改字典'" class="dialogClass" :visible.sync="dialog" :close-on-click-modal="false" width="500px">
      <div class="b_datas">
        <el-form inline label-width="140px" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item :label="$t('dictionaryName.dictionaryCode')" v-if="modalType==1" prop="dictCode">
            <el-input placeholder="请输入字典编码" v-model="ruleForm.dictCode" class="inputs">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('dictionaryName.dictionaryName')" prop="dictName">
            <el-input placeholder="请输入字典名称" v-model="ruleForm.dictName" class="inputs">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">{{$t("button.cancel")}}</el-button>
        <el-button type="primary" @click="confirmAdd('ruleForm')">{{$t("button.confirm")}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="subModalType==1?'新增子项':'修改子项'" class="dialogClass" :visible.sync="dialog2" :close-on-click-modal="false" width="500px">
      <div class="b_datas" v-if="dialog2">
        <el-form inline label-width="140px" :model="editForm" :rules="rules" ref="editForm">
          <el-form-item :label="$t('dictionaryName.dictionaryKey')" v-if="subModalType==1" prop="dictKey">
            <el-input placeholder="请输入字典键" v-model="editForm.dictKey" class="inputs">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('dictionaryName.dictionaryValue')" prop="dictValue">
            <el-input placeholder="请输入字典值" v-model="editForm.dictValue" class="inputs">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('dictionaryName.dictionarySequence')" prop="sort">
            <el-input placeholder="请输入字典顺序" type="age" v-model.number="editForm.sort" class="inputs">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">{{$t("button.cancel")}}</el-button>
        <el-button type="primary" @click="confirmSubAdd('editForm')">{{$t("button.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Tree, Drawer, Tabs, TabPane, DatePicker, Upload } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
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
    elUpload: Upload
  },
  data() {
    return {
      searchObj: {},
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      paginationData2: {
        pageNo: 1,
        pageSize: 10
      },//子集
      total2: 0,//子集
      searchObj2: {},////子集
      dialog2: false,//子集弹窗
      dialog: false,//父级弹窗
      dialogVisible: false,//抽屉
      tableList: [
      ],//父级列表
      ruleForm: {},//父级编辑
      editForm: {},//子集编辑
      modalType: 1,//父级新增修改
      subModalType: 1,//子集新增修改
      rules: {
        dictCode: [
          { required: true, message: '请输入字典编码', trigger: 'blur' },
          { validator: benAndNumber, trigger: 'blur' },
        ],
        dictName: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        dictKey: [
          { required: true, message: '请输入字典键', trigger: 'blur' },
          { validator: benAndNumber, trigger: 'blur' },
        ],
        dictValue: [
          { required: true, message: '请输入字典值', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入字典顺序', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ],
      },
      drawerList: [],//子集列表
      subInfo: {}
    }
  },
  mounted() {
    this.sysDictList();
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    // this.searchObj.stationCode = this.getStationCode
  },
  methods: {
    search() {
      this.sysDictList()
    },
    searchClick() {
      this.paginationData.pageNo = 1;
      this.sysDictList()
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
    handleCurrentChange2(e) {
      this.paginationData2.pageNo = e;
      this.search2()
    },
    handleSizeChange2(e) {
      this.paginationData2.pageSize = e;
      this.paginationData2.pageNo = 1;
      this.search2()
    },
    //列表接口
    sysDictList() {
      let obj = {
        ...this.searchObj,
        ...this.paginationData,
      }
      http(api.sysDictList, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      })
    },
    addOne() {
      this.ruleForm = {
        dictCode: '',
        dictName: '',
      }
      this.dialog = true;
      this.modalType = 1
    },
    editOne(item) {
      this.ruleForm = JSON.parse(JSON.stringify(item))
      this.dialog = true;
      this.modalType = 2;
    },
    editSon(item) {
      this.searchObj2 = {}
      this.subInfo = JSON.parse(JSON.stringify(item))
      this.subList();
      this.dialogVisible = true;
    },
    //新增修改校验
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.modalType == 1) {
            this.sysDictAdd()
          } else {
            this.sysDictUpdate()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //新增
    sysDictAdd() {
      http(api.sysDictAdd, this.ruleForm).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.search();
        this.dialog = false;
      })
    },
    sysDictUpdate() {
      http(api.sysDictUpdate, this.ruleForm).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.search();
        this.dialog = false;
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
      this.$confirm("确定" + mess + "此字典？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          if(!item.deleteFlag) {
            let obj = {
              deleteFlag: 1,
              dictCode: item.dictCode
            }
            this.sysDictStatus(obj, '停用');
          } else {
            let obj = {
              deleteFlag: 0,
              dictCode: item.dictCode
            }
            this.sysDictStatus(obj, '启用');
          }

        })
        .catch(() => { });
    },
    sysDictStatus(obj, mess) {
      http(api.sysDictStatus, obj).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search();
      })
    },
    search2() {
      this.subList();
    },
    //子集
    subList(item) {
      let obj = {
        dictCode: this.subInfo.dictCode,
        ...this.searchObj2,
        ...this.paginationData2,
      }
      http(api.subList, obj).then(res => {
        this.drawerList = res.records;
        this.total2 = res.total;
      })
    },
    addSubOne() {
      this.editForm = {
        dictKey: '',
        dictValue: '',
        sort: ""
      }
      this.dialog2 = true;
      this.subModalType = 1
    },
    editSubOne(item) {
      this.editForm = {
        dictCode: item.dictCode,
        dictKey: item.dictKey,
        dictValue: item.dictValue,
        sort: item.sort,
      }
      this.dialog2 = true;
      this.subModalType = 2;
    },
    //新增修改校验
    confirmSubAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.subModalType == 1) {
            this.subAdd()
          } else {
            this.subUpdate()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    subAdd() {
      http(api.subAdd, { ...this.editForm, dictCode: this.subInfo.dictCode }).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.search2();
        this.dialog2 = false;
      })
    },
    subUpdate() {
      http(api.subUpdate, { ...this.editForm }).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.search2();
        this.dialog2 = false;
      })
    },
    //停用
    deSublOne(item) {
      let mess = '';
      if(!item.deleteFlag) {
        mess = '停用'
      } else {
        mess = '启用'
      }
      this.$confirm("确定" + mess + "此字典？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          if(!item.deleteFlag) {
            let obj = {
              deleteFlag: 1,
              dictCode: item.dictCode,
              dictKey: item.dictKey
            }
            this.subChangeStatus(obj, '停用');
          } else {
            let obj = {
              deleteFlag: 0,
              dictCode: item.dictCode,
              dictKey: item.dictKey
            }
            this.subChangeStatus(obj, '启用');
          }

        })
        .catch(() => { });
    },
    subChangeStatus(obj, mess) {
      http(api.subChangeStatus, obj).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search2();
      })
    },

  },
  watch: {
  }

}
</script>
<style lang="less" scoped>
.demo-drawer__content .el-form-item {
  min-width: 48%;
}
.el-form-item__content {
  width: 180px !important;
}
//上传图片
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}
.b_datas {
  padding: 0 10px;
}
.pageSty {
  text-align: center;
  margin-top: 10px;
}
</style>