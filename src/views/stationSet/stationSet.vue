<template>
  <div class="content lingBut">
    <div class="warrp">
      <div>
        <el-button class="btnBox tableBox" type="primary" @click="addOne" v-if="hasPerm('2002')"> {{$t("button.add")}}</el-button>
      </div>
      <el-table :data="tableList">
        <el-table-column :label="$t('stationSet.table0')" prop="stationName"></el-table-column>
        <el-table-column :label="$t('stationSet.table1')" prop="populationSize"></el-table-column>
        <el-table-column :label="$t('stationSet.table2')" prop="stationArea"></el-table-column>
        <el-table-column :label="$t('stationSet.table3')" prop="stationAddress"></el-table-column>
        <el-table-column :label="$t('stationSet.table4')">
          <template slot-scope="scope">
            {{scope.row.positionX}},{{scope.row.positionY}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('stationSet.table5')">
          <template slot-scope="scope">
            <span v-if="scope.row.isFocusOn">重点建筑</span>
            <span v-if="!scope.row.isFocusOn">否</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('stationSet.table6')" width="300" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="goMap(scope.row)">{{$t("button.setBreakpoints")}}</el-button>
            <el-button type="text" @click="editOne(scope.row)">{{$t("button.edit")}}</el-button>
            <!-- <el-button type="primary" size="mini" plain @click="goTree(scope.row)">画图</el-button> -->
            <el-button type="text" v-if="scope.row.deleteFlag" @click="delOne(scope.row)">{{$t("button.enable")}}</el-button>
            <el-button type="text" v-if="!scope.row.deleteFlag" @click="delOne(scope.row)">{{$t("button.suspend")}}</el-button>
            <el-button type="text" @click="updatePwd(scope.row)">控制密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" @size-change="handleSizeChange" :page-size="paginationData.pageSize" :page-sizes="[10, 20, 50]" layout="total,sizes,prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
    <el-dialog title="新增项目" class="dialogClass" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px">
      <div class="b_datas ">
        <el-form inline label-width="80px" size="small" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="项目名称" prop="stationName">
            <el-input placeholder="请输入项目名称" :maxlength="50" v-model="ruleForm.stationName" class="inputs">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button size="small" type="primary" @click="confirmAdd('ruleForm')">{{$t("button.confirm")}}</el-button>
      </span>
    </el-dialog>
    <el-drawer title="编辑项目" :visible.sync="dialog" direction="rtl" size="40%" custom-class="demo-drawer" ref="drawer">
      <div class="demo-drawer__content" v-if="dialog">
        <el-form :model="editForm" ref="editForm" :rules="rules" label-width="120px" inline size="small">
          <el-form-item label="项目名称" prop="stationName">
            <el-input v-model="editForm.stationName" :maxlength="50" AUTOCOMPLETE="off"></el-input>
          </el-form-item>
          <el-form-item label="是否重点建筑">
            <el-switch active-color="#13ce66" inactive-color="#999" v-model="editForm.isFocusOn"></el-switch>
          </el-form-item>
          <el-form-item label="项目地址">
            <el-input v-model="editForm.stationAddress" :maxlength="50" AUTOCOMPLETE="off"></el-input>
          </el-form-item>
          <el-form-item label="项目人数" prop="populationSize">
            <el-input v-model.number="editForm.populationSize" :maxlength="50" type="age" AUTOCOMPLETE="off"></el-input>
          </el-form-item>
          <el-form-item label="项目面积(m²)" prop="stationArea">
            <el-input v-model.number="editForm.stationArea" type="age" :maxlength="50" AUTOCOMPLETE="off"></el-input>
          </el-form-item>
          <el-form-item label="参照能耗值(kW·h)" prop="refElectricEnergy">
            <el-input v-model.number="editForm.refElectricEnergy" type="age" :maxlength="50" AUTOCOMPLETE="off"></el-input>
          </el-form-item>
          <el-form-item label="项目图片">
            <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="handleAvatarSuccess" :auto-upload="false">
              <img v-if="editForm.stationPic" :src="$imageUrls+editForm.stationPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button class="button" size="small" @click="dialog=false">{{$t("button.cancel")}}</el-button>
          <el-button class="button" size="small" type="primary" @click="sumbit('editForm')">{{$t("button.confirm")}}</el-button>
        </div>
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
      htt: window.IPConfig,
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      tableList: [
      ],
      dialog: false,
      dialogVisible: false,
      editForm: {},
      searchObj: {},
      ruleForm: {},
      imageUrl: '',
      rules: {
        stationName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        populationSize: [
          { type: 'number', message: '项目人数必须为数字值', trigger: 'blur' }
        ],
        stationArea: [
          { type: 'number', message: '项目面积必须为数字值', trigger: 'blur' }
        ],
        refElectricEnergy: [
          { type: 'number', message: '参照能耗值必须为数字值', trigger: 'blur' }
        ]
      },
    }
  },
  mounted() {
    this.stationList()
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    this.searchObj.stationCode = this.getStationCode
  },
  methods: {
    ...mapMutations('login', ['setStationCode2']),
    ...mapMutations('login', ['setMapCode']),
    search() {
      this.stationList()
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
    handleAvatarSuccess(file) {
      var formData = new FormData();
      formData.append("file", file.raw);
      http(api.imageupload, formData).then(res => {
        this.editForm.stationPic = res
      })

    },
    goTree(item) {
      this.setStationCode2(item.stationCode);
      this.$router.push('/treeMag');
    },
    goMap(item) {
      this.setMapCode({ lng: item.positionX, lat: item.positionY });
      this.$router.push({
        path: "/stationMap",
        query: {
          stationCode: item.stationCode,
          stationName: item.stationName,
        }
      });
    },
    //编辑
    editOne(item) {
      this.editForm = JSON.parse(JSON.stringify(item))
      if(this.editForm.isFocusOn) {
        this.editForm.isFocusOn = true
      } else {
        this.editForm.isFocusOn = false
      }
      this.dialog = true;
    },
    //新增
    addOne() {
      this.ruleForm = {};
      this.dialogVisible = true;
    },
    //列表接口
    stationList() {
      let obj = {
        // ...this.searchObj,
        ...this.paginationData,
      }
      http(api.stationQueryPageList, obj).then(res => {
        this.tableList = res.records;
        this.total = res.total;
      })
    },
    //新增校验
    confirmAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.stationAdd()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //新增
    stationAdd() {
      http(api.stationAdd, this.ruleForm).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.search();
        this.dialogVisible = false;
      })
    },
    //修改校验
    sumbit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.stationUpdate()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //修改
    stationUpdate() {
      if(this.editForm.isFocusOn) {
        this.editForm.isFocusOn = 1
      } else {
        this.editForm.isFocusOn = 0
      }
      http(api.stationUpdate, this.editForm).then(res => {
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
      this.$confirm("确定" + mess + "此项目？", "提示", {
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        type: "warning"
      })
        .then(() => {
          if(!item.deleteFlag) {
            let obj = {
              deleteFlag: 1,
              stationCode: item.stationCode
            }
            this.stationChangeStatus(obj, '停用');
          } else {
            let obj = {
              deleteFlag: 0,
              stationCode: item.stationCode
            }
            this.stationChangeStatus(obj, '启用');
          }

        })
        .catch(() => { });
    },
    stationChangeStatus(obj, mess) {
      http(api.stationChangeStatus, obj).then(res => {
        this.$message({
          type: "success",
          message: mess + "成功"
        });
        this.search();
      })
    },
    updatePwd(obj) {

      this.$prompt('请输入修改密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9-\.&#?、@!^%+=*&$_/\u4e00-\u9fa5\s]{6,}$/,
        inputErrorMessage: '密码格式不正确，请输入6位数以上的数字+字母'
      }).then(({ value }) => {
        this.updatePwd2(obj, value)
      }).catch(() => {

      });

    },
    updatePwd2(obj, value) {
      let objs = {
        stationCode: obj.stationCode,
        pwd: value
      }
      http(api.updatePwd, objs).then(res => {
        this.$message({
          type: "success",
          message: "控制密码修改成功"
        });
      })
    }
  },
  watch: {
  }

}
</script>
<style lang="less" scoped>
.warrp {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  // display: flex;
  // flex-direction: column;
  background: #fff;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  .pagination {
    text-align: center;
  }
}
.tableBox {
  margin-top: 30px;
}
.btnBox {
  margin-bottom: 10px;
}
.demo-drawer__content .el-form-item {
  width: 48%;
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
</style>