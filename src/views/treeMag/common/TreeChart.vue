<template>
  <div>
    <div class="tree scrollWarrp" v-dragscroll>
      <table v-if="treeData.domainName">
        <tr>
          <td :colspan="Array.isArray(treeData.children) ? treeData.children.length * 2 : 1" :class="{parentLevel: Array.isArray(treeData.children) && treeData.children.length, extend: Array.isArray(treeData.children) && treeData.children.length && treeData.extend}">
            <div :class="{node: true, hasMate: treeData.mate}">
              <div class="person" :class="Array.isArray(treeData.class) ? treeData.class : []">
                <el-popover placement="top-start" width="550" trigger="hover">
                  <div>
                    <el-button plain size="mini" icon="el-icon-edit" v-if="treeData.domainCode!='0000000000'" @click="editStock">修改</el-button>
                    <el-button plain type="primary" icon="el-icon-paperclip" size="mini" v-if="treeData.domainCode!='0000000000'" @click="getDomainLoopListBreaker(treeData,1)">绑定能耗回路</el-button>
                    <el-button plain type="primary" size="mini" icon='el-icon-plus' @click="addStock">添加子节点</el-button>
                    <el-button plain type="danger" icon="el-icon-delete" size="mini" v-if="treeData.domainCode!='0000000000'" @click="deleteStock(treeData)">{{$t("button.delete")}}</el-button>
                  </div>
                  <div slot="reference">
                    <el-button class="name titImg1" v-if="treeData.domainType=='D3'">{{treeData.domainName}} <br><span class="texts" v-if="treeData.energyBreakerCode&&treeData.energyBreakerCode!=' '"> (已绑能耗回路)</span></el-button>
                    <el-button class="name titImg2" v-else-if="treeData.domainType=='D4'">{{treeData.domainName}} <span class="texts" v-if="treeData.energyBreakerCode&&treeData.energyBreakerCode!=' '"> (已绑能耗回路)</span></el-button>
                    <el-button class="name titImg3" v-else>{{treeData.domainName}} <span class="texts" v-if="treeData.energyBreakerCode&&treeData.energyBreakerCode!=' '"> (已绑能耗回路)</span></el-button>
                  </div>
                </el-popover>
              </div>
            </div>
            <div class="extend_handle" v-if="Array.isArray(treeData.children) && treeData.children.length" @click="toggleExtend(treeData)"></div>
          </td>
        </tr>
        <tr v-if="Array.isArray(treeData.children) && treeData.children.length && treeData.extend&&treeData.domainType=='D4'">
          <td colspan="2" class="childLevel">
            <div class="boxHl">
              <div v-for="(children, index) in treeData.children" :key="index" colspan="2" class="name2">
                <el-popover placement="top-start" width="550" trigger="hover">
                  <div>
                    <el-button plain size="mini" @click="editLast(children,index)">修改回路</el-button>
                    <el-button plain type="primary" size="mini" @click="queryBindingBreakerPage(children,1)">绑定设备</el-button>
                    <el-button plain type="primary" size="mini" @click="gobind(children,3)">绑定能耗设备</el-button>
                    <el-button plain type="primary" v-if="!children.mainFlag" size="mini" @click="goMain(children)">设为主进线</el-button>
                    <el-button plain type="danger" v-if="children.mainFlag" size="mini" @click="setNotMain(children)">取消主进线</el-button>
                    <el-button plain type="danger" size="mini" @click="deleteStock(children)">{{$t("button.delete")}}</el-button>
                  </div>
                  <div slot="reference">
                    <span style="color:#303133;line-height:30px;">{{children.domainName}}</span>
                    <span style="display:inline-block;color:#6B7A98">
                      <span class="m_l_r" v-for="i in children.breakerList">（{{i.breakerName}}）</span>
                    </span>
                    <span class="icons" v-if="children.mainFlag" style="display:inline-block;">
                      <span class="m_l_r">主进线 </span>
                    </span>
                    <div class="enery" v-if="children.energyBreakerCode&&children.energyBreakerCode!=' '">已绑能耗设备</div>
                  </div>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="Array.isArray(treeData.children) && treeData.children.length && treeData.extend&&treeData.domainType!='D4'">
          <td v-for="(children, index) in treeData.children" :key="index" colspan="2" class="childLevel">
            <TreeChart :json="children" :DomainTopoDelParam="DomainTopoDelParam" @click-node="$emit('click-node', $event)" />
          </td>
        </tr>
      </table>
    </div>
    <!-- 添加编辑弹框 -->
    <el-dialog :title="isEdit?'修改节点':'新增节点'" class="dialogClass" data-no-dragscroll :visible.sync="dialogVisible" @close="clearDialog" :close-on-click-modal="false" width="500px">
      <div class="tips">
        <el-form :model="ruleForm" size="small" inline ref="ruleForm" label-width="80px" :rules="rules" class="demo-ruleForm">
          <el-form-item label="类型" prop="domainType">
            <el-select v-model="ruleForm.domainType" placeholder="类型" :disabled="isEdit === 1">
              <el-option v-for="(item,ty) in shareholderTypeOptions" :key="ty" :label="item.label" :value='item.value'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="domainName">
            <el-input placeholder="输入名称" data-no-dragscroll :maxlength="32" v-model="ruleForm.domainName"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input placeholder="输入排序" data-no-dragscroll :maxlength="32" v-model="ruleForm.sort"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input placeholder="输入备注" data-no-dragscroll :maxlength="32" v-model="ruleForm.domainRemark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="tip-left">
          <el-button size="mini" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="confirm" v-if="isEdit==0">确定</el-button>
          <el-button type="primary" size="mini" @click="confirm2" v-if="isEdit==1">确定</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog :title="isEdit?'修改回路':'新增回路'" class="dialogClass" :visible.sync="dialogVisible3" @close="clearDialog" :close-on-click-modal="false" width="500px">
      <div class="tips">
        <el-form :model="ruleForm" size="small" inline ref="ruleForm" label-width="100px" :rules="rules" class="demo-ruleForm">
          <el-form-item label="名称" prop="domainName">
            <el-input placeholder="输入名称" data-no-dragscroll :maxlength="32" v-model="ruleForm.domainName"></el-input>
          </el-form-item>
          <el-form-item label="负载名称" prop="loadName">
            <el-select v-model="ruleForm.loadName" placeholder="负载名称">
              <el-option v-for="item in loadNameList" :value="item.dictKey" :label="item.dictValue">{{item.dictValue}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="父连线区域" prop="fartherDomainCode">
            <el-select v-model="ruleForm.fartherDomainCode" placeholder="父连线区域" clearable>
              <el-option v-for="item in domainList" :value="item.domainCode" :label="item.domainName">{{item.domainName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序">
            <el-input placeholder="输入排序" data-no-dragscroll :maxlength="32" type="age" v-model.number="ruleForm.sort"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input placeholder="输入备注" data-no-dragscroll :maxlength="32" v-model="ruleForm.domainRemark"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="tip-left">
          <el-button size="mini" @click="dialogVisible3=false">取消</el-button>
          <el-button size="mini" type="primary" v-if="isEdit==0" @click="confirm">确定</el-button>
          <el-button size="mini" type="primary" v-if="isEdit==1" @click="confirm2">确定</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog title="删除子节点" class="dialogClass" :visible.sync="dialogVisible2" @close="clearDialog" :close-on-click-modal="false" width="30%">
      <el-table class="tableClass" :data="childrenDate">
        <el-table-column width="200" property="domainName" label="名称"></el-table-column>
        <el-table-column width="200" :label="$t('table.operate')">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" plain @click="deleteFun(scope.$index,scope.row)">{{$t("button.delete")}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :title="equipmentType==1?'设备列表':'能耗设备列表'" width="800px" class="dialogClass" :visible.sync="dialog" :close-on-click-modal="false">
      <el-table class="tableClass" :data="breakerList">
        <el-table-column width="150" property="breakerName" label="设备名称"></el-table-column>
        <el-table-column width="150" property="breakerAddress" label="设备地址"></el-table-column>
        <el-table-column width="200" property="gatewayAddress" label="网关地址"></el-table-column>
        <el-table-column width="150" property="bindDomainLoopName" label="已绑回路">
        </el-table-column>
        <el-table-column width="100" :label="$t('table.operate')">
          <template slot-scope="scope">
            <div v-if="equipmentType==1">
              <el-button type="primary" size="mini" plain v-if="!scope.row.isBindCurLoop" @click="bindthis(scope.row,equipmentType)">绑定</el-button>
              <el-button type="danger" size="mini" plain v-if="scope.row.isBindCurLoop" @click="nobindthis(scope.row,equipmentType)">解绑</el-button>
            </div>
            <div v-else>
              <el-button type="primary" size="mini" plain v-if="!scope.row.isBindCurLoop" @click="bindDomain(scope.row)">绑定</el-button>
              <el-button type="danger" size="mini" plain v-if="scope.row.isBindCurLoop" @click="noBindDomain(scope.row,'shebe')">解绑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" :current-page="paginationData.pageNo" :page-size="paginationData.pageSize" layout="total,prev, pager, next, jumper" :total="total"></el-pagination>
    </el-dialog>
    <el-dialog title="绑定能耗回路列表" width="800px" class="dialogClass" :visible.sync="dialog2" :close-on-click-modal="false">
      <el-table class="tableClass" :data="breakList">
        <el-table-column property="domainName" label="回路"></el-table-column>
        <el-table-column :label="$t('table.operate')">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" v-if="scope.row.isBindCurDomainCode" plain @click="noBindDomain(scope.row,'noshebe')">解绑</el-button>
            <el-button type="primary" size="mini" v-if="!scope.row.isBindCurDomainCode" plain @click="bindDomain(scope.row)">绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange2" :current-page="paginationData.pageNo" :page-size="paginationData.pageSize" layout="total,prev, pager, next, jumper" :total="total"></el-pagination>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import api from 'api';
import http from 'http';
import { Popover, Dialog, Table, TableColumn, } from 'element-ui';
import { dragscroll } from 'vue-dragscroll'
export default {
  name: "TreeChart",
  props: ["json", "DomainTopoDelParam"],
  directives: {
    'dragscroll': dragscroll
  },
  data() {
    return {
      paginationData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      treeData: {},
      dialogVisible: false,
      ruleForm: {},
      rules: [],
      isEdit: 0,
      treeData2: {},
      dialogVisible2: false,
      dialogVisible3: false,
      childrenDate: [],
      indexH: '',
      dialog: false,
      breakerList: [],
      domainCodeOne: '',//设备绑定列表绑定网关
      stationCodeOne: '',//设备绑定列表查询code
      getStationCodes: '',
      shareholderTypeOptions: [
        {
          label: "配电室",
          value: 'D3'
        },
        {
          label: "配电柜",
          value: 'D4'
        },
        // {
        //   label: "回路组",
        //   value: 'D4'
        // },
        // {
        //   label: "回路",
        //   value: '3'
        // },
      ],
      rules: {
        domainType: [
          { required: true, message: '请选择类型', trigger: 'change' },
        ],
        domainName: [
          { required: true, message: '请输入回路名称', trigger: 'blur' }
        ],
        sort: [
          { type: 'number', message: '排序必须为数字值', trigger: 'blur' }
        ]
      },
      loadNameList: [],
      equipmentType: 0,
      domainList: [],//回路列表
      dialog2: false,
      breakList: [],
      isFun: "",
      bindType: "",
      equipmentType2: ''
    }
  },
  components: {
    elPopover: Popover,
    elDialog: Dialog,
    elTable: Table,
    elTableColumn: TableColumn
  },
  created() {
    this.getStationCodes = this.getStationCode
    this.isFun = this.getIsDomainCode
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
    ...mapGetters('login', ['getIsDomainCode']),
  },
  mounted() {

  },
  watch: {
    json: {
      handler: function(Props) {
        let extendKey = function(jsonData) {
          jsonData.extend = (jsonData.extend === void 0 ? true : !!jsonData.extend);
          if(Array.isArray(jsonData.children)) {
            jsonData.children.forEach(c => {
              extendKey(c)
            })
          }
          return jsonData;
        }
        if(Props) {
          this.treeData = extendKey(Props);
        }
      },
      immediate: true
    },
    json2: {
      handler: function(Props) {
        let extendKey = function(jsonData) {
          jsonData.extend = (jsonData.extend === void 0 ? true : !!jsonData.extend);
          if(Array.isArray(jsonData.children)) {
            jsonData.children.forEach(c => {
              extendKey(c)
            })
          }
          return jsonData;
        }
        if(Props) {
          this.treeData2 = extendKey(Props);
        }
      },
      immediate: true
    },
    getIsDomainCode: {
      handler(val) {
        this.isFun = val
      },
      // immediate: true,
      deep: true
    },
  },
  methods: {
    ...mapMutations('login', ['setIsDomainCode']),
    toggleExtend: function(treeData) {
      treeData.extend = !treeData.extend;
      this.$forceUpdate();
    },
    //监听
    goload() {
      if(this.isFun == '0') {
        this.setIsDomainCode('1');
      } else {
        this.setIsDomainCode('0');
      }
    },
    //添加
    addStock() {
      console.log(this.treeData)
      if(this.treeData.domainType == 'D4') {
        this.getLoadNameList()
        this.getDomainLoopList()
        this.isEdit = 0;
        this.ruleForm = {
          domainType: 'D5',
          name: '',
        }
        this.dialogVisible3 = true;
      } else {
        this.isEdit = 0;
        this.ruleForm = {
          domainType: '',
          name: '',
        }
        this.dialogVisible = true;
      }

    },
    editStock(name) {
      // 不使用=赋值,内存相同,改变后,treeData数据也会改变
      this.ruleForm = this.treeData;
      this.ruleForm = {
        domainName: this.treeData.domainName,
        sort: this.treeData.sort,
        domainRemark: this.treeData.domainRemark,
        loadName: this.treeData.loadName,
        fartherDomainCode: this.treeData.fartherDomainCode,
        domainCode: this.treeData.domainCode,
        domainType: this.treeData.domainType,
        stationCode: this.treeData.stationCode,
        elderDomainCode: this.treeData.elderDomainCode,
        energyType: this.treeData.energyType,
      }
      console.log(this.treeData)
      this.isEdit = 1;
      this.dialogVisible = true;
    },
    //编辑回路
    editLast(item, index) {
      this.getDomainLoopList()
      this.getLoadNameList()
      this.indexH = index;
      this.isEdit = 1;
      this.ruleForm = {
        domainName: item.domainName,
        sort: item.sort,
        domainRemark: item.domainRemark,
        loadName: item.loadName,
        fartherDomainCode: item.fartherDomainCode,
        domainCode: item.domainCode,
        domainType: item.domainType,
        stationCode: item.stationCode,
        elderDomainCode: item.elderDomainCode,
        energyType: item.energyType,
      }
      this.dialogVisible3 = true;
    },
    clearDialog() {
      // this.ruleForm = {}
      // this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
      this.dialogVisible2 = false;
      this.dialogVisible3 = false;
    },
    confirm() {
      http(api.topoAdd, { ...this.ruleForm, stationCode: this.getStationCodes, elderDomainCode: this.treeData.domainCode }).then(res => {
        this.$message({
          type: "success",
          message: '新增成功'
        });
        this.clearDialog();
        this.goload()
      })
    },
    confirm2() {
      http(api.topoUpdate, { ...this.ruleForm }).then(res => {
        this.$message({
          type: "success",
          message: '修改成功'
        });
        this.clearDialog();
        this.goload()
      })
    },
    deleteStock(item) {
      let mess = ""
      if(item.children && item.children.length > 0) {
        mess = '确定删除此节点及此节点下所有子节点？'
      } else {
        mess = '确定删除此节点？'
      }
      this.$confirm(mess, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.topoDel(item)
      }).catch(() => {
      });

    },
    topoDel(item) {
      http(api.topoDel, { stationCode: this.getStationCodes, domainCode: item.domainCode }).then(res => {
        this.$message({
          type: "success",
          message: '删除成功'
        });
        this.goload()
      })
    },
    deleteFun(index, item) {
      // this.$emit('father', this.childrenDate[index])
      this.DomainTopoDelParam.domainTopoDelList.push(this.childrenDate[index])
      this.childrenDate.splice(index, 1);
      this.clearDialog();
    },
    gobind(item, it) {
      this.domainCodeOne = item.domainCode;
      this.stationCodeOne = item.stationCode
      this.paginationData = {
        pageNo: 1,
        pageSize: 10
      };
      this.equipmentType = it;
      this.equipmentType2 = 2;
      this.queryEnergyBreakerPage()

    },
    queryBindingBreakerPage(item, it) {
      this.domainCodeOne = item.domainCode;
      this.stationCodeOne = item.stationCode
      this.paginationData = {
        pageNo: 1,
        pageSize: 10
      };
      this.equipmentType = it;
      this.equipmentType2 = 2;
      this.queryBindingBreakerPage2()
    },
    queryBindingBreakerPage2() {
      http(api.queryBindingBreakerPage, { curDomainCode: this.domainCodeOne, stationCode: this.stationCodeOne, ...this.paginationData, }).then(res => {
        this.total = res.total
        this.breakerList = res.records;
        this.dialog = true;
      })
    },
    queryEnergyBreakerPage() {
      http(api.queryEnergyBreakerPage, { curDomainCode: this.domainCodeOne, stationCode: this.stationCodeOne, ...this.paginationData, }).then(res => {
        this.total = res.total
        this.breakerList = res.records;
        this.dialog = true;
      })
    },
    handleCurrentChange(e) {
      this.paginationData.pageNo = e;
      let mess = ""
      if(this.equipmentType == 1) {
        this.queryBindingBreakerPage2()
      } else {
        this.queryEnergyBreakerPage()
      }

    },
    handleCurrentChange2(e) {
      this.paginationData.pageNo = e;
      let mess = ""
      this.getDomainLoopListBreaker2()

    },
    bindthis(item, it) {
      let breakerBindDomainParam = {
        domainCode: this.domainCodeOne,
        breakerCodes: [item.breakerCode],
        stationCode: item.stationCode,
      }
      http(api.bindDomain, breakerBindDomainParam).then(res => {
        this.$message({
          type: "success",
          message: '绑定成功'
        });
        this.domainCodeOne = ''
        this.dialog = false;
        this.goload()
      })

    },
    nobindthis(item, it) {
      let breakerBindDomainParam = {
        domainCode: this.domainCodeOne,
        breakerCodes: [item.breakerCode],
        stationCode: item.stationCode,
      }
      http(api.unbindDomain, breakerBindDomainParam).then(res => {
        this.$message({
          type: "success",
          message: '解绑成功'
        });
        this.domainCodeOne = ''
        this.dialog = false;
        this.goload()
      })
    },
    //字典搜索
    getLoadNameList() {
      http(api.getLoadNameList).then(res => {
        this.loadNameList = res
      });
    },
    sensorPageList() {
      http(api.sensorPageList, { stationCode: this.stationCodeOne, ...this.paginationData, type: 'NADER' }).then(res => {
        this.total = res.total
        this.breakerList = res.records;
        this.dialog = true;
      })
    },
    getDomainLoopList() {
      http(api.getDomainLoopList, { stationCode: this.getStationCodes }).then(res => {
        this.domainList = res
      });
    },
    // //////////////////////////////////////////////////////////////////////////////////
    //绑定能耗回路
    getDomainLoopListBreaker(item, index) {
      this.domainCodeOne = item.domainCode;
      this.stationCodeOne = item.stationCode
      this.paginationData = {
        pageNo: 1,
        pageSize: 10
      };
      this.equipmentType2 = index;
      this.getDomainLoopListBreaker2()
    },
    getDomainLoopListBreaker2() {
      http(api.getDomainLoopListBreaker, { stationCode: this.getStationCodes, curDomainCode: this.domainCodeOne, ...this.paginationData, }).then(res => {
        this.total = res.total;
        this.breakList = res.records;
        this.dialog2 = true
      });
    },
    bindDomain(item) {
      let breakerCode = ''
      if(this.equipmentType2 == 1) {
        breakerCode = item.domainCode
      } else {
        breakerCode = item.breakerCode
      }
      http(api.domainBreakerBind, { breakerCode: breakerCode, domainCode: this.domainCodeOne }).then(res => {
        this.$message({
          type: "success",
          message: '绑定成功'
        });
        this.dialog2 = false;
        this.dialog = false;
        this.goload()
      });
    },
    noBindDomain(item, j) {
      let breakerCode = ''
      if(j == 'shebe') {
        breakerCode = item.breakerCode
      } else {
        breakerCode = item.domainCode
      }
      http(api.domainBreakerUnbind, { domainCode: this.domainCodeOne, breakerCode: breakerCode }).then(res => {
        this.$message({
          type: "success",
          message: '解绑成功'
        });
        this.dialog2 = false;
        this.dialog = false;
        this.goload()
      });
    },
    //设为主进线
    goMain(item) {
      http(api.setMain, { domainCode: item.domainCode, stationCode: this.getStationCodes }).then(res => {
        this.$message({
          type: "success",
          message: '设为主进线成功'
        });
        this.goload()
      });
    },
    //设为主进线
    setNotMain(item) {
      http(api.setNotMain, { domainCode: item.domainCode, stationCode: this.getStationCodes }).then(res => {
        this.$message({
          type: "success",
          message: '取消主进线成功'
        });
        this.goload()
      });
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: separate !important;
  border-spacing: 0 !important;
  width: 100%;
  overflow: auto;
  min-height: 100%;
}
td {
  position: relative;
  vertical-align: top;
  padding: 0 0 50px 0;
  text-align: center;
}

.extend_handle {
  position: absolute;
  left: 50%;
  bottom: 45px;
  width: 20px;
  height: 20px;
  margin-left: 9px;
  z-index: 1000;
  /* padding: 10px; */
  transform: translate3d(-15px, 0, 0);
  cursor: pointer;
}
.extend_handle:before {
  content: "";
  background: url("../../../assets/center/icon_zk.png");
  background-size: 100% 100%;
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.extend_handle:hover:before {
  border-color: #333 #333 transparent transparent;
}
.extend .extend_handle:before {
  /* transform: rotateZ(-45deg); */
  background: url("../../../assets/center/icon_sq.png");
  background-size: 100% 100%;
}

.extend::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 8px;
  height: 40px;
  border-left: 8px solid #bbc8e0;
  transform: translate3d(-1px, 0, 0);
}
.childLevel::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 100%;
  height: 15px;
  border-left: 8px solid #bbc8e0;
  transform: translate3d(-1px, 0, 0);
}
.childLevel::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -15px;
  border-top: 8px solid #bbc8e0;
}
.childLevel:first-child:before,
.childLevel:last-child:before {
  display: none;
}
.childLevel:first-child:after {
  left: 50%;
  height: 15px;
  border: 8px solid;
  border-color: #bbc8e0 transparent transparent #bbc8e0;
  /* border-radius: 6px 0 0 0; */
  transform: translate3d(10px, 0, 0);
}
.childLevel:last-child:after {
  right: 51%;
  height: 15px;
  border-top: 8px solid;
  border-right: 8px solid;
  border-color: #bbc8e0 #bbc8e0 #bbc8e0 #bbc8e0;
  /* border-radius: 6px; */
  /* transform: translate3d(5px, 5px, 5px); */
}
.childLevel:first-child.childLevel:last-child::after {
  left: auto;
  border-radius: 0;
  border-color: transparent transparent transparent transparent;
  /* transform: translate3d(7px, 0, 0); */
}
.node {
  position: relative;
  display: inline-block;
  margin: 0 1em;
  box-sizing: border-box;
  text-align: center;
}
.node .person {
  position: relative;
  display: inline-block;
  z-index: 2;
  /* width: 6em; */
  overflow: hidden;
}
.node .person .avat {
  display: block;
  width: 4em;
  height: 4em;
  margin: auto;
  overflow: hidden;
  background: #fff;
  border: 1px solid #0e97e7;
  box-sizing: border-box;
}
.node .person .avat img {
  width: 100%;
  height: 100%;
}
.node .person .name {
  /* background: -moz-linear-gradient(top, #0e97e7 0%, #ffffff 100%); */
  /* background: linear-gradient(to right, #248fff 0%, #1bbce4 100%); */
  /* background: linear-gradient(to bottom, #0e97e7 0%, #92da98 100%); */
  border-radius: 8px;
  /* padding: 8px 15px; */
  /* margin-bottom: 10px; */
  margin-right: 5px;
  color: #fff;
  font-size: 1.6rem;
  width: 240px;
  height: 60px;
  line-height: 20px;
}
.node.hasMate::after {
  content: "";
  position: absolute;
  left: 2em;
  right: 2em;
  top: 2em;
  border-top: 2px solid #0e97e7;
  z-index: 1;
}
/* 横板 */
.landscape {
  transform: translate(-100%, 0) rotate(-90deg);
  transform-origin: 100% 0;
}
.landscape .node {
  text-align: left;
  height: 8em;
  width: 8em;
}
.landscape .person {
  position: relative;
  transform: rotate(90deg);
  padding-left: 4.5em;
  height: 4em;
  top: 4em;
  left: -1em;
}
.landscape .person .avat {
  position: absolute;
  left: 0;
}
.landscape .person .name {
  height: 4em;
  line-height: 4em;
}
.landscape .hasMate {
  position: relative;
}
.landscape .hasMate .person {
  position: absolute;
}
.landscape .hasMate .person:first-child {
  left: auto;
  right: -4em;
}
.landscape .hasMate .person:last-child {
  left: -4em;
  margin-left: 0;
}
.boxHl {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.name2 {
  display: block;
  max-width: 400px;
  min-width: 100px;
  border-radius: 5px;
  padding: 2px 15px;
  border: 1px solid #ddd;
  margin-top: 10px;
  margin-right: 10px;
  color: #333;
  font-size: 1.4rem;
  text-align: left;
  width: 90%;
  cursor: pointer;
  line-height: 26px;
  /* max-width: 50%; */
  /* margin: 10px auto 0 auto; */
  /* padding: 8px 15px; */
}
.name2 img {
  vertical-align: middle;
  margin: 0 5px;
}
.m_l_r {
  margin-left: 5px;
  font-size: 1.2rem;
}
.icons {
  float: right;
  color: #b11818;
  font-size: 1.2rem;
}
</style>
<style scoped>
.demo-ruleForm {
  text-align: left;
}
.tree {
  width: 100%;
  overflow: auto;
}
.butcolor {
  margin-left: 10px;
  background: linear-gradient(to bottom, #2360b9 0%, #238db9 100%);
}
.dialogClass {
  text-align: left;
}
.tableClass {
  margin-bottom: 30px;
}
.texts {
  font-size: 1rem;
  color: #fff;
}
.el-input {
  width: 200px;
}
.titImg3 {
  background: linear-gradient(to right, #5430ff 0%, #3693ff 100%);
}
.titImg2 {
  background: linear-gradient(to right, #78c7ff 0%, #98e3ff 100%);
}
.titImg1 {
  background: linear-gradient(to right, #4472ff 0%, #47b2ff 100%);
}
.enery {
  line-height: 15px;
  color: #999;
  margin-bottom: 5px;
}
</style>
