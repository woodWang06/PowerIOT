<template>
  <div class="content lingBut">
    <Warrp-temp>
      <template slot="search">
        <el-form inline>
          <el-form-item label="关键字">
            <el-input placeholder="请输入关键字" v-model="searchObj.keywords" clearable></el-input>
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
          <el-table-column :label="$t('equipmentType.categoryEquipment')" prop="breakerLargeType" fixed></el-table-column>
          <el-table-column :label="$t('equipmentType.categoryName')" prop="breakerLargeTypeName"></el-table-column>
          <el-table-column :label="$t('equipmentType.statusEnable')" prop="deleteFlag">
            <template slot-scope="scope">
              {{dictionaries.deleteFlag[scope.row.deleteFlag]}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.operate')" width="250" fixed="right">
            <template slot-scope="scope">
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
    <el-drawer :title="modalType==1?'新增设备大类':'修改设备大类'" class="dialogClass" :visible.sync="dialogVisible" :close-on-click-modal="false" size="30%">
      <div class="b_datas ">
        <el-form inline label-width="180px" size="small" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item :label="$t('equipmentType.categoryEquipment')" v-if="modalType==1" prop="breakerLargeType">
            <el-input placeholder="请输入设备大类" v-model="ruleForm.breakerLargeType" class="inputs">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('equipmentType.categoryName')" prop="breakerLargeTypeName">
            <el-input placeholder="请输入大类名称" v-model="ruleForm.breakerLargeTypeName" class="inputs">
            </el-input>
          </el-form-item>
          <el-form-item label="设备图片">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="handleAvatarSuccess1" :auto-upload="false">
              <img v-if="ruleForm.pic&&ruleForm.pic!='无'" :src="$imageUrls+ruleForm.pic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="合闸图片">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="handleAvatarSuccess2" :auto-upload="false">
              <img v-if="ruleForm.closePic" :src="$imageUrls+ruleForm.closePic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="分闸图片">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="handleAvatarSuccess3" :auto-upload="false">
              <img v-if="ruleForm.openPic" :src="$imageUrls+ruleForm.openPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer">
        <el-button class="button" size="small" @click="dialogVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button class="button" size="small" type="primary" @click="confirmAdd('ruleForm')">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Drawer, Upload } from 'element-ui';
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elDialog: Dialog,
    elDrawer: Drawer,
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
      rules: {
        breakerLargeTypeName: [
          { required: true, message: '请输入大类名称', trigger: 'blur' },
        ],
        breakerLargeType: [
          { required: true, message: '请输入设备大类', trigger: 'change' }
        ],
      },
    }
  },
  mounted() {
    this.breakerLargeTypeList();
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    // this.searchObj.stationCode = this.getStationCode
  },
  methods: {
    searchClick() {
      this.paginationData.pageNo = 1;
      this.search();
    },
    search() {
      this.breakerLargeTypeList()
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
    breakerLargeTypeList() {
      let obj = {
        ...this.searchObj,
        ...this.paginationData,
      }
      http(api.breakerLargeTypeList, obj).then(res => {
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
    //新增修改校验
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.modalType == 1) {
            this.breakerLargeTypeAdd()
          } else {
            this.breakerLargeTypeUpdate()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //新增
    breakerLargeTypeAdd() {
      http(api.breakerLargeTypeAdd, this.ruleForm).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.search();
        this.dialogVisible = false;
      })
    },
    breakerLargeTypeUpdate() {
      http(api.breakerLargeTypeUpdate, this.ruleForm).then(res => {
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
      this.$confirm("确定" + mess + "此设备大类？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          if(!item.deleteFlag) {
            let obj = {
              deleteFlag: 1,
              breakerLargeType: item.breakerLargeType
            }
            this.breakerLargeTypeCchangeStatus(obj, '停用');
          } else {
            let obj = {
              deleteFlag: 0,
              breakerLargeType: item.breakerLargeType
            }
            this.breakerLargeTypeCchangeStatus(obj, '启用');
          }

        })
        .catch(() => { });
    },
    breakerLargeTypeCchangeStatus(obj, mess) {
      http(api.breakerLargeTypeCchangeStatus, obj).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search();
      })
    },
    handleAvatarSuccess1(file) {
      if(file.raw.type == 'image/jpeg' || file.raw.type == 'image/png' || file.raw.type == 'image/jpg') {
        var formData = new FormData();
        formData.append("file", file.raw);
        http(api.fileUpload, formData).then(res => {
          this.ruleForm.pic = res
        })
      } else {
        this.$message({
          type: "warning",
          message: '请上传正确的图片格式'
        });
      }
    },
    handleAvatarSuccess2(file) {
      if(file.raw.type == 'image/jpeg' || file.raw.type == 'image/png' || file.raw.type == 'image/jpg') {
        var formData = new FormData();
        formData.append("file", file.raw);
        http(api.fileUpload, formData).then(res => {
          this.ruleForm.closePic = res
        })
      }
    },
    handleAvatarSuccess3(file) {
      if(file.raw.type == 'image/jpeg' || file.raw.type == 'image/png' || file.raw.type == 'image/jpg') {
        var formData = new FormData();
        formData.append("file", file.raw);
        http(api.fileUpload, formData).then(res => {
          this.ruleForm.openPic = res
        })
      }

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
// .el-form-item {
//   width: 51%;
// }
</style>