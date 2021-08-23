<template>
  <div class="contents lingBut">
    <div class="warrp">
      <div class="tabs">
        故障录波
      </div>
      <div class="oneBox">
        <div class="r_line">
          区域：<br>
          {{domainNameStr}}
        </div>
        <div class="r_line">
          故障发生时间：<br>
          {{time}}
        </div>
        <!-- <div class="r_line_l">
          T1光标[xxxxxxxxx-xxxxxxxx]/第xxxxxx点，时差xxxxxxxms<br>
          T1光标[xxxxxxxxx-xxxxxxxx]/第xxxxxx点，时差xxxxxxxms
        </div> -->
      </div>
      <div class="twoBox">
        <div class="t_left">
          <chartl :chartDta="chartDta" v-if="chartDta.xlist&&chartDta.xlist.length"></chartl>
          <!-- <div class="threeBox">
            <div>
              <span> 模拟量通道：</span>
              <p><span class="color1">la</span>=xxA/格</p>
              <p><span class="color2">la</span>=xxA/格</p>
              <p><span class="color3">la</span>=xxA/格</p>
              <p><span class="color4">la</span>=xxA/格</p>
              <p><span class="color1">la</span>=xxA/格</p>
              <p><span class="color2">la</span>=xxA/格</p>
              <p><span class="color3">la</span>=xxA/格</p>
              <p class="noborder"> <span class="color4">la</span>=xxA/格</p>
            </div>
            <div>
              <span> 开关量通道：</span>
              <p>1=预留</p>
              <p>2=预留</p>
              <p>3=A相跳闸</p>
              <p>4=B相跳闸</p>
              <p>5=C相跳闸</p>
              <p>6=永跳</p>
              <p>7=重合闸</p>
              <p class="noborder">8=其他保护动作</p>
            </div>
          </div> -->
        </div>
        <div class="t_right">
          <el-table :data="tableList" border>
            <el-table-column label="类别" prop="name">
              <!-- <template slot-scope="scope" prop="name">
                <span>
                  {{key[scope.row.name]}}
                </span>
              </template> -->
            </el-table-column>
            <el-table-column label="T1" prop="data">
            </el-table-column>
            <!-- <el-table-column label="T2">
            </el-table-column> -->
          </el-table>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog, Tag, Table, TableColumn } from 'element-ui';
import http from 'http';
import api from 'api';
import chartl from './chart/chartl'
export default {
  components: {
    elDialog: Dialog,
    elTag: Tag,
    chartl,
    elTableColumn: TableColumn,
    elTable: Table
  },
  data() {
    return {
      dialog: true,
      tableList: [],
      key: {
        0: 'Ua',
        1: 'Ub',
        2: 'Uc',
        3: '3Uo',
        4: 'la',
        5: 'lb',
        6: 'lc',
        7: '3lo',
      },
      time: '',
      domainNameStr: '',
      chartDta: {}
    }
  },
  created() {
    this.getNum();

  },
  computed: {
  },
  mounted() {
    this.queryFaultRecordByFaultId()
  },

  methods: {
    getNum() {
      this.domainNameStr = this.$route.query.domainNameStr;
      this.time = this.$route.query.time;
    },
    queryFaultRecordByFaultId() {
      http(api.queryFaultRecordByFaultId, { faultId: 6 }).then(res => {
        this.chartDta = res
      })
    },
    fatherMethod(arr) {
      this.tableList = [];
      arr.sort(function(a, b) {
        return a.axisIndex - b.axisIndex;
      })
      arr.forEach((element, index) => {
        this.tableList.push({ name: element.seriesName, data: element.data })

      });
    }
  }
}
</script>
<style lang="less" scoped>
@import "./less/less";
</style>