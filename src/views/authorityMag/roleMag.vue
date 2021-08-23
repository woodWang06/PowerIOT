<template>
  <div class="content lingBut">
    <Warrp-temp>
      <template slot="search">
        <el-form inline label-width="80px">
          <el-form-item :label="$t('roleMag.roleID')">
            <el-input v-model="searchObj.roleCode" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('roleMag.roleName')">
            <el-input v-model="searchObj.roleName" clearable></el-input>
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
          <el-table-column :label="$t('roleMag.roleID')" prop="roleCode" fixed></el-table-column>
          <el-table-column :label="$t('roleMag.roleName')" prop="roleName"></el-table-column>
          <el-table-column :label="$t('roleMag.stopStatus')" prop="deleteFlag">
            <template slot-scope="scope">
              {{dictionaries.deleteFlag[scope.row.deleteFlag]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.operate')" min-width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="editOne(scope.row)">{{$t("button.edit")}}</el-button>
              <el-button type="text" @click="editauth(scope.row)">{{$t("button.authority")}}</el-button>
              <el-button type="text" plain v-if="scope.row.deleteFlag" @click="delOne(scope.row,1)">{{$t("button.enable")}}</el-button>
              <el-button type="text" v-if="!scope.row.deleteFlag" @click="delOne(scope.row,0)">{{$t("button.suspend")}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
      </template>
    </Warrp-temp>
    <el-dialog :title="modalType==1?'新增角色':'修改角色'" class="dialogClass" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px">
      <div class="b_datas " v-if="dialogVisible">
        <el-form inline size="small" :model="ruleForm" ref="ruleForm" :rules="rules">
          <el-form-item :label="$t('roleMag.roleName')" prop="roleName">
            <el-input placeholder="请输入角色名称" v-model="ruleForm.roleName" class="inputs"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button size="small" type="primary" @click="addConfirm2('ruleForm')">{{$t("button.confirm")}}</el-button>
      </span>
    </el-dialog>
    <el-drawer title="权限管理" :visible.sync="dialog" direction="rtl" size="35%" custom-class="demo-drawer" ref="drawer">
      <div class="demo-drawer__content" v-if="dialog">
        <el-checkbox-group v-model="checkedCities" @change="checkboxList">
          <div class="checkedBox" v-for="(item,index) in autList" :key="index">
            <el-checkbox border size="medium" v-model="item.perms" :label="item.perms">{{item.title}}</el-checkbox>
          </div>
        </el-checkbox-group>
        <div class="demo-drawer__footer">
          <el-button class="button" size="small" @click="dialog=false">{{$t("button.cancel")}}</el-button>
          <el-button class="button" size="small" type="primary" @click="bindMenu">{{$t("button.save")}}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Drawer } from 'element-ui';
import api from 'api';
import http from 'http';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elDialog: Dialog,
    elDrawer: Drawer,
  },
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      searchObj: {},
      dialogVisible: false,
      dialog: false,
      namesele: '',
      ruleForm: { roleName: '' },
      tableList: [
      ],
      activeName: '1',
      beginDate: '',
      endDate: '',
      modalType: 1,
      autList: [
      ],
      checkedCities: [],
      sysPermissionRoleList: [],
      roleCodeMenu: "",
      rules:
      {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.sysRoleList();

  },
  computed: {
  },
  methods: {
    //搜索
    search() {
      this.sysRoleList()
    },
    searchClick() {
      this.paginationData.pageNo = 1
      this.sysRoleList()
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
    addOne() {
      this.roleCode = ''
      this.ruleForm.roleName = ''
      this.dialogVisible = true;
      this.modalType = 1
    },
    editOne(item) {
      this.roleCode = item.roleCode;
      this.ruleForm.roleName = item.roleName
      this.dialogVisible = true;
      this.modalType = 2;
    },
    //列表查询
    sysRoleList() {
      let obj = {
        ...this.searchObj,
        ...this.paginationData
      }
      http(api.sysRolePageList, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      })
    },
    //弹窗确定
    addConfirm2(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.addConfirm()
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    addConfirm() {
      if(this.modalType == 1) {
        this.sysRoleAdd()
      } else {
        this.sysRoleUpdate()
      }

    },
    //新增角色
    sysRoleAdd() {
      http(api.sysRoleAdd, { roleName: this.ruleForm.roleName }).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.dialogVisible = false;
        this.search();
      })
    },
    //修改角色
    sysRoleUpdate() {
      http(api.sysRoleUpdate, { roleName: this.ruleForm.roleName, roleCode: this.roleCode }).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.dialogVisible = false;
        this.search();
      })
    },
    //停用
    delOne(item, falg) {
      let mess = '';
      if(falg) {
        mess = this.$t("button.enable")
      } else {
        mess = this.$t("button.suspend")
      }
      this.$confirm("确定 " + mess + " 此角色？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          if(!item.deleteFlag) {
            let obj = {
              deleteFlag: 1,
              roleCode: item.roleCode
            }
            this.sysRoleChangeStatus(obj, this.$t("button.suspend"));
          } else {
            let obj = {
              deleteFlag: 0,
              roleCode: item.roleCode
            }
            this.sysRoleChangeStatus(obj, this.$t("button.enable"));
          }

        })
        .catch(() => { });
    },
    sysRoleChangeStatus(obj, mess) {
      http(api.sysRoleChangeStatus, obj).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search();
      })
    },
    sysPermissionRole(roleCode) {
      this.autList = [];
      this.checkedCities = []
      http(api.sysPermissionRole, { roleCode, roleCode }).then(res => {
        this.autList = res;
        this.autList.forEach(val => {
          if(val.isCheck == 1) {
            this.checkedCities.push(val.perms)
          }

        })
      })
    },
    editauth(item) {
      this.roleCodeMenu = item.roleCode
      this.sysPermissionRole(item.roleCode);
      this.dialog = true
    },
    checkboxList(e) {
    },
    bindMenu() {
      let str = ''
      this.checkedCities.forEach(val => {
        str += val + ','
      })
      str = str.slice(0, str.length - 1)
      http(api.bindMenu, { abilities: str, roleCode: this.roleCodeMenu }).then(res => {
        this.$message({
          type: "success",
          message: "绑定成功"
        });
        this.search();
        this.dialog = false
      })
    }
  },
  watch: {
  }

}
</script>
<style lang="less" scoped>
.checkedBox {
  width: 40%;
  display: inline-block;
  margin-bottom: 10px;
}
</style>