<template>
  <div class="content lingBut">
    <Warrp-temp>
      <template slot="search">
        <el-form inline>
          <el-form-item :label="$t('userMag.logintime')">
            <el-date-picker v-model="searchObj.loginStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
            </el-date-picker> -
            <el-date-picker v-model="searchObj.loginEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('userMag.userAccount')">
            <el-input v-model="searchObj.account" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('userMag.role')">
            <el-select v-model="searchObj.roleCode" clearable>
              <el-option v-for="item in roleList" :value="item.roleCode" :label="item.roleName">{{item.roleName}}</el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="searchClick">{{$t('button.search')}}</el-button>

        </el-form>
      </template>
      <template slot="created">
        <el-button @click="addOne">{{$t('button.add')}}</el-button>
      </template>

      <template slot="table">
        <el-table :data="tableList" stripe style="width: 100%">
          <el-table-column :label="$t('userMag.table0')" prop="accountName" fixed></el-table-column>
          <el-table-column :label="$t('userMag.table1')" prop="accountNameCn"></el-table-column>
          <el-table-column :label="$t('userMag.table2')" min-width="100px">
            <template slot-scope="scope">
              <div v-if="scope.row.stations&&scope.row.stations.length<5">
                <el-tag type="warning" v-for="item in scope.row.stations">{{item.stationName}}</el-tag>
              </div>
              <div v-if="scope.row.stations&&scope.row.stations.length>=5">
                <el-popover placement="right" width="400" trigger="click">
                  <el-tag type="warning" v-for="item in scope.row.stations">{{item.stationName}}</el-tag>
                  <el-button slot="reference" type="text">查看详情</el-button>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('userMag.table3')" prop="roleCode_dictText" width="200px"></el-table-column>
          <el-table-column :label="$t('userMag.table4')" prop="contactTelephone"></el-table-column>
          <el-table-column :label="$t('userMag.table5')" prop="pwLastLogin"></el-table-column>
          <el-table-column :label="$t('table.operate')" min-width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="editOne(scope.row)">{{$t('button.edit')}}</el-button>
              <!-- <el-button type="text" @click="resetPwdOne(scope.row)">{{$t('button.resetPassword')}}</el-button> -->
              <el-button type="text" @click="delOne(scope.row)">{{$t('button.delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
      </template>
    </Warrp-temp>
    <el-drawer :title="modalType==1?$t('button.add'):$t('button.edit')" :visible.sync="dialogVisible" direction="rtl" size="38%" custom-class="demo-drawer" ref="drawer">
      <div class="demo-drawer__content" v-if="dialogVisible">
        <el-form inline label-width="80px" size="small" :model="modelData" :rules="rules" ref="modelData">
          <el-form-item label="登录账户" prop="accountName">
            <el-input v-model="modelData.accountName" :maxlength="50" :disabled="modalType==1?false:true"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="accountPassword" v-if='modalType==1'>
            <el-input type='password' :maxlength="50" v-model.native="modelData.accountPassword">
            </el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="accountNameCn">
            <el-input v-model="modelData.accountNameCn" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="用户职位" prop="positionName">
            <el-input v-model="modelData.positionName" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactTelephone">
            <el-input v-model="modelData.contactTelephone" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="modelData.email" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model="modelData.companyName" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="departmentName">
            <el-input v-model="modelData.departmentName" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" prop="roleCode">
            <el-select placeholder="选择角色" style="width:100%" v-model="modelData.roleCode">
              <el-option v-for="item in roleList" :value="item.roleCode" :label="item.roleName">{{item.roleName}}</el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="所属项目" prop="stationCodes">
            <el-select placeholder="选择项目" multiple style="width:100%" v-model="modelData.stationCodes">
              <el-option v-for="item in stationList" :value="item.stationCode" :label="item.stationName">{{item.stationName}}</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button class="button" size="small" @click="dialogVisible=false">{{$t("button.cancel")}}</el-button>
          <el-button class="button" size="small" type="primary" @click="confirmAdd('modelData')">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Drawer, DatePicker, Tag, Popover } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapGetters } from 'vuex';
import { checkPhone, checkEmailRule, checkLogin } from 'utils/rules';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elDialog: Dialog,
    elDrawer: Drawer,
    elTag: Tag,
    elDatePicker: DatePicker,
    elPopover: Popover
  },
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 100,
      searchObj: {},
      dialogVisible: false,
      dialog: false,
      namesele: '',
      name: '',
      tableList: [],
      activeName: '1',
      beginDate: '',
      endDate: '',
      modelData: {},
      modalType: 1,
      roleList: [],
      rules: {
        accountName: [
          { required: true, message: '请输入登录账户', trigger: 'blur' },
        ],
        accountPassword: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { validator: checkLogin, trigger: 'blur' },
        ],
        accountNameCn: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        positionName: [
          { required: true, message: '请输入用户职位', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
        ],
        contactTelephone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmailRule, trigger: 'blur' },
        ],
        stationCodes: [
          { required: true, message: '请选择项目', trigger: 'change' },
        ],
        roleCode: [
          { required: true, message: '请输入角色编号', trigger: 'change' }
        ],
      },
      stationList: []
    }
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    // this.searchObj.stationCode = this.getStationCode
  },
  mounted() {
    this.sysAccountList();
    this.sysRoleAllList();
    this.getAllStation()
  },

  methods: {
    search() {
      this.sysAccountList()
    },
    searchClick() {
      this.paginationData.pageNo = 1;
      this.sysAccountList()
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
      this.modelData = {
        stationCodes: []
      };
      this.dialogVisible = true;
      this.modalType = 1;
    },
    editOne(item) {
      this.modelData = JSON.parse(JSON.stringify(item));
      delete this.modelData.accountPassword
      this.dialogVisible = true;
      this.modalType = 2;
    },
    //用户列表
    sysAccountList() {
      let obj = {
        ...this.searchObj,
        ...this.paginationData,
      }
      http(api.queryAccountList, obj).then(res => {
        this.tableList = res.records;
        this.tableList.forEach(val => {
          val.stationCodes = [];
          if(val.stations) {
            val.stations.forEach(i => {
              val.stationCodes.push(i.stationCode)
            })
          }
        })
        this.total = res.total;
      })
    },
    //角色列表
    sysRoleAllList() {
      http(api.sysRoleAllList).then(res => {
        this.roleList = res
      })
    },
    //新增

    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          let pwd = ''
          pwd = hex_md5(this.modelData.accountPassword);
          this.modelData.accountPassword = pwd
          if(this.modalType == 1) {
            this.sysAccountAdd()
          } else {
            this.sysAccountUpdate()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    sysAccountAdd() {
      console.log(this.modelData)
      // delete this.modelData.accountPassword
      http(api.sysAccountAdd, { ...this.modelData }).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.dialogVisible = false;
        this.search();
      })
    },
    //修改
    sysAccountUpdate() {
      delete this.modelData.accountPassword
      http(api.sysAccountUpdate, { ...this.modelData }).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.dialogVisible = false;
        this.search();
      })
    },
    //停用
    delOne(item) {
      this.$confirm("确定删除此用户？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          let obj = {
            accountCode: item.accountCode
          }
          this.sysAccountDel(obj, '删除');

        })
        .catch(() => { });
    },
    sysAccountDel(obj, mess) {
      http(api.sysAccountDel, obj).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search();
      })
    },
    getAllStation() {
      http(api.getStationStat).then(res => {
        this.stationList = res
      })
    },
    //停用
    resetPwdOne(item) {
      this.$confirm("确定重置密码此用户？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          let obj = {
            accountCode: item.accountCode
          }
          this.resetPwd(obj, '重置密码');

        })
        .catch(() => { });
    },
    resetPwd(obj, mess) {
      http(api.resetPwd, obj).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search();
      })




    },

  },
  watch: {
  }

}
</script>
<style lang="less" scoped>
.el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>