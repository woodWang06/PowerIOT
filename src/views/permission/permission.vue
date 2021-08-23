<template>
  <div class="content lingBut">
    <Warrp-temp>
      <template slot="search">
        <el-form inline>
          <el-form-item label="菜单标题" :label="$t('permission.menuTitle')">
            <el-input placeholder="请输入菜单标题" v-model="searchObj.title" clearable></el-input>
          </el-form-item>
          <el-button type="primary" @click="searchClick">{{$t("button.search")}}</el-button>
        </el-form>

      </template>
      <template slot="created">
        <div>
          <el-button @click="addOne">{{$t("button.add")}}</el-button>
        </div>
      </template>

      <template slot="table">
        <el-table :data="tableList" stripe style="width: 100%">
          <el-table-column :label="$t('permission.menuId')" prop="id" fixed></el-table-column>
          <el-table-column :label="$t('permission.menuSorting')" prop="sortNo"></el-table-column>
          <el-table-column :label="$t('permission.parentMenu')" prop="parentId"></el-table-column>
          <el-table-column :label="$t('permission.menuCode')" prop="perms"></el-table-column>
          <el-table-column :label="$t('permission.menuTitle')" prop="title"></el-table-column>
          <el-table-column :label="$t('permission.menuType')" prop="menuType">
            <template slot-scope="scope">
              {{dictionaries.menuType[scope.row.menuType]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('permission.categoryMenu')" prop="menuClass" width="120px">
            <template slot-scope="scope">
              {{dictionaries.menuClass[scope.row.menuClass]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('permission.strategyAuthority')" prop="permsType" width="135px">
            <template slot-scope="scope">
              {{dictionaries.permsType[scope.row.permsType]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('permission.path')" prop="url" min-width="115px">
          </el-table-column>
          <el-table-column :label="$t('permission.iconMenu')" prop="icon" min-width="135px">
          </el-table-column>
          <el-table-column :label="$t('permission.leafNode')" prop="isLeaf" width="135px">
            <template slot-scope="scope">
              {{dictionaries.isLeaf[scope.row.isLeaf]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('permission.description')" prop="describe">
          </el-table-column>
          <el-table-column :label="$t('table.operate')" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="editOne(scope.row)">{{$t("button.edit")}}</el-button>
              <!-- <el-button type="success" size="mini" plain v-if="scope.row.deleteFlag" @click="delOne(scope.row)">{{$t("button.enable")}}</el-button> -->
              <el-button type="text" @click="delOne(scope.row)">{{$t("button.delete")}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
      </template>
    </Warrp-temp>
    <el-drawer :title="modalType==1?'新增菜单':'修改菜单'" class="dialogClass" :visible.sync="dialogVisible" :close-on-click-modal="false" size="40%">
      <div class="b_datas " v-if="dialogVisible">
        <el-form inline label-width="122px" size="small" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item :label="$t('permission.menuTitle')" prop="title">
            <el-input placeholder="请输入菜单标题" v-model="ruleForm.title" class="inputs" :maxlength="50">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('permission.menuCode')" prop="perms" v-if="modalType==1">
            <el-input placeholder="请输入菜单编码" type="age" v-model.number="ruleForm.perms" class=" inputs" :maxlength="50">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('permission.iconMenu')" prop="icon">
            <el-input placeholder="请输入菜单图标" v-model="ruleForm.icon" class="inputs" :maxlength="50">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('permission.path')" prop="url">
            <el-input placeholder="请输入菜单路径" v-model="ruleForm.url" class="inputs" :maxlength="50">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('permission.leafNode')" prop="isLeaf">
            <el-select v-model="ruleForm.isLeaf" clearable placeholder="请选择菜单叶子节点">
              <el-option v-for="item in options.isLeaf" :value="item.value" :label="item.key">{{item.key}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('permission.categoryMenu')" prop="menuClass">
            <el-select v-model="ruleForm.menuClass" clearable placeholder="请选择菜单类别">
              <el-option v-for="item in options.menuClass" :value="item.value" :label="item.key">{{item.key}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('permission.menuType')" prop="menuType">
            <el-select v-model="ruleForm.menuType" clearable placeholder="请选择菜单类型">
              <el-option v-for="item in options.menuType" :value="item.value" :label="item.key">{{item.key}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('permission.strategyAuthority')" prop="permsType">
            <el-select v-model="ruleForm.permsType" clearable placeholder="请选择权限策略">
              <el-option v-for="item in options.permsType" :value="item.value" :label="item.key">{{item.key}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('permission.parentMenu')" prop="parentId">
            <el-select v-model="ruleForm.parentId" clearable placeholder="请选择父级">
              <el-option v-for="item in tableTypeList" :value="item.id" :label="item.title">{{item.title}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('permission.menuSorting')" prop="sortNo">
            <el-input v-model.number="ruleForm.sortNo" type='age' placeholder="请输入菜单排序" AUTOCOMPLETE="off" class="inputs" :maxlength="50">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('permission.description')" prop="describe">
            <el-input placeholder="请输入描述" v-model="ruleForm.describe" class="inputs" :maxlength="100">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer">
        <el-button class="button" size="small" @click="dialogVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button class="button" size="small" type="primary" @click="confirmAdd('ruleForm')">{{modalType==1?$t("button.add"):'确定'}}</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Tree, Drawer, Tabs, TabPane, DatePicker, Upload } from 'element-ui';
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
    elDatePicker: DatePicker,
    elUpload: Upload

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
      typeAllList: [],
      modalType: 1,
      tableTypeList: [],
      rules: {
        title: [
          { required: true, message: '请输入菜单标题', trigger: 'blur' },
        ],
        perms: [
          { required: true, message: '请输入菜单编码', trigger: 'blur' },
          { type: 'number', message: '菜单编码必须为数字值', trigger: 'blur' }
        ],
        menuType: [
          { required: true, message: '请选择菜单类型', trigger: 'change' }
        ],
        menuClass: [
          { required: true, message: '请选择菜单类别', trigger: 'change' }
        ],
        isLeaf: [
          { required: true, message: '请选择是否叶子节点', trigger: 'change' }
        ],
      },
    }
  },
  mounted() {
    this.sysPermissionList();
    this.queryListForType()
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    // this.searchObj.stationCode = this.getStationCode
  },
  methods: {
    search() {
      this.sysPermissionList()
    },
    searchClick() {
      this.paginationData.pageNo = 1;
      this.sysPermissionList()
    },
    handleCurrentChange(e) {
      this.paginationData.pageNo = e;
      this.sysPermissionList()
    },
    handleSizeChange(e) {
      this.paginationData.pageSize = e;
      this.paginationData.pageNo = 1;
      this.sysPermissionList()
    },
    //列表接口
    sysPermissionList() {
      let obj = {
        ...this.searchObj,
        ...this.paginationData,
      }
      http(api.sysPermissionList, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      })
    },
    addOne() {
      this.ruleForm = {
        pic: '',
        closePic: '',
        openPic: '',
      }
      this.dialogVisible = true;
      this.modalType = 1
    },
    editOne(item) {
      this.ruleForm = JSON.parse(JSON.stringify(item))
      this.dialogVisible = true;
      this.modalType = 2;
    },
    queryListForType() {
      http(api.queryListForType, { menuType: 0 }).then(res => {
        this.tableTypeList = res;
      })
    },
    //新增修改校验
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.modalType == 1) {
            this.sysPermissionAdd()
          } else {
            this.sysPermissionUpdate()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //新增
    sysPermissionAdd() {
      http(api.sysPermissionAdd, this.ruleForm).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.search();
        this.dialogVisible = false;
      })
    },
    sysPermissionUpdate() {
      http(api.sysPermissionUpdate, this.ruleForm).then(res => {
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
      this.$confirm("确定删除此菜单？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          this.sysPermissionDel(item, '删除');

        })
        .catch(() => { });
    },
    sysPermissionDel(item, mess) {
      http(api.sysPermissionDel, { id: item.id, deleteFlag: 1, }).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search();
      })
    },
    handleAvatarSuccess1(file) {
      var formData = new FormData();
      formData.append("file", file.raw);
      http(api.fileUpload, formData).then(res => {
        this.ruleForm.pic = res
      })

    },
    handleAvatarSuccess2(file) {
      var formData = new FormData();
      formData.append("file", file.raw);
      http(api.fileUpload, formData).then(res => {
        this.ruleForm.closePic = res
      })

    },
    handleAvatarSuccess3(file) {
      var formData = new FormData();
      formData.append("file", file.raw);
      http(api.fileUpload, formData).then(res => {
        this.ruleForm.openPic = res
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
.el-input {
  width: 200px;
}
</style>