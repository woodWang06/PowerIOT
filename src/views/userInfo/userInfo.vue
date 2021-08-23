<template>
  <div class="modal">
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="查看个人信息" name="1"></el-tab-pane>
      <el-tab-pane label="编辑个人信息" name="2"></el-tab-pane>
    </el-tabs>
    <div class="demo-drawer__content">
      <el-form label-width="80px" :model="modelData" :rules="rules" ref="modelData">
        <el-form-item label="登录账户" prop="accountName">
          <el-input v-model="modelData.accountName" :maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="accountNameCn">
          <el-input v-model="modelData.accountNameCn" :maxlength="50" :disabled="activeName==1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="用户职位" prop="positionName">
          <el-input v-model="modelData.positionName" :maxlength="50" :disabled="activeName==1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactTelephone">
          <el-input v-model="modelData.contactTelephone" :maxlength="50" :disabled="activeName==1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="modelData.email" :maxlength="50" :disabled="activeName==1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="modelData.companyName" :maxlength="50" :disabled="activeName==1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="modelData.departmentName" :maxlength="50" :disabled="activeName==1?true:false"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button class="button" size="small" type="primary" v-if="activeName==2" @click="confirmAdd('modelData')">{{$t("button.save")}}</el-button>
      </div>

    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Tree, Drawer, Tabs, TabPane, DatePicker } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
import { checkPhone, checkEmailRule } from 'utils/rules';
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
      modelData: {},
      falg: "",
      activeName: '1',
      rules: {
        accountName: [
          { required: true, message: '请输入登录账户', trigger: 'blur' },
        ],
        accountPassword: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
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
      },
    }
  },
  mounted() {
    this.getByAccountCode()
  },
  computed: {
    ...mapGetters('login', ['getAccountNameCn']),
  },
  created() {
    this.accountCode = this.getAccountNameCn.accountCode
  },
  methods: {
    getByAccountCode() {
      http(api.getAccountDetail).then(res => {
        this.modelData = res;
      })
    },
    handleClick() {

    },
    //新增
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.sysAccountUpdate()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //修改
    sysAccountUpdate() {
      http(api.sysAccountUpdate, { ...this.modelData }).then(res => {
        this.$message({
          type: "success",
          message: "保存成功"
        });
      })
      this.activeName = '1';
      this.getByAccountCode();
    },
  },
  watch: {
  }

}
</script>
<style lang="less" scoped>
.modal {
  width: 99%;
  height: 100%;
  background: #fff;
  margin: 10px;
  padding: 20px;
}
.el-form {
  margin: 50px 100px;
}
.el-form-item {
  width: 400px;
}
.btn {
  width: 500px;
  text-align: right;
}
</style>

