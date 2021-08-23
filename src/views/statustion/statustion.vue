<template>
  <div class="modal">
    <div class="demo-drawer__content">
      <!-- <el-form :model="editForm" ref="editForm" label-width="120px">
        <el-form-item label="项目名称" prop="stationName">
          <div>{{editForm.stationName}}</div>
        </el-form-item>
        <el-form-item label="是否重点建筑">
      <div v-if="editForm.isFocusOn">是</div>
          <div v-else>否</div>
        </el-form-item>
        <el-form-item label="项目地址">
          <div>{{editForm.stationAddress}}</div>
        </el-form-item>
        <el-form-item label="项目人数">
          <div>{{editForm.populationSize}}</div>
        </el-form-item>
        <el-form-item label="项目面积(m²)">
          <div>{{editForm.stationArea}}</div>
        </el-form-item>
        <el-form-item label="参照能耗值(kW·h)">
          <div>{{editForm.stationArea}}</div>
        </el-form-item>
        <el-form-item label="项目图片">
          <img v-if="editForm.stationPic" :src="editForm.stationPic" class="avatar">
          </el-upload>
        </el-form-item>
      </el-form> -->
      <el-form :model="editForm" ref="editForm" label-width="120px" size="small">
        <el-form-item label="项目名称" prop="stationName">
          <el-input v-model="editForm.stationName" :maxlength="50" disabled AUTOCOMPLETE="off"></el-input>
        </el-form-item>
        <el-form-item label="是否重点建筑">
          <el-switch active-color="#13ce66" inactive-color="#999" disabled v-model="editForm.isFocusOn"></el-switch>
          <span style="margin-left:5px" v-if="editForm.isFocusOn">是</span>
          <span style="margin-left:5px" v-else>否</span>
        </el-form-item>
        <el-form-item label="项目地址">
          <el-input v-model="editForm.stationAddress" disabled :maxlength="50" AUTOCOMPLETE="off"></el-input>
        </el-form-item>
        <el-form-item label="项目人数" prop="populationSize">
          <el-input v-model.number="editForm.populationSize" disabled :maxlength="50" type="age" AUTOCOMPLETE="off"></el-input>
        </el-form-item>
        <el-form-item label="项目面积(m²)" prop="stationArea">
          <el-input v-model.number="editForm.stationArea" type="age" disabled :maxlength="50" AUTOCOMPLETE="off"></el-input>
        </el-form-item>
        <el-form-item label="参照能耗值(kW·h)" prop="refElectricEnergy">
          <el-input v-model.number="editForm.refElectricEnergy" disabled type="age" :maxlength="50" AUTOCOMPLETE="off"></el-input>
        </el-form-item>
        <el-form-item label="项目图片">
          <img v-if="editForm.stationPic" :src="$imageUrls+editForm.stationPic" class="avatar">
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, Tree, Drawer, Tabs, TabPane, DatePicker } from 'element-ui';
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
    elDatePicker: DatePicker
  },
  data() {
    return {
      editForm: {},
      falg: "",
      stationCode: ""
    }
  },
  mounted() {
    this.getStationById()
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    this.stationCode = this.getStationCode
  },
  methods: {
    getStationById() {
      http(api.getStationByStationCode, { stationCode: this.stationCode }).then(res => {
        this.editForm = res
      })
    }
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
  margin: 100px;
}
.el-form-item {
  width: 400px;
}
</style>

