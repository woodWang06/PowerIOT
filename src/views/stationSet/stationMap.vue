<template>
  <div class="content">
    <div class="warrp">
      <el-row style="height:10%">
        <el-form size="small" :model="position_data" label-width="100px" inline>
          <el-form-item label="项目位置" style=" float:left;">
          </el-form-item>
          <el-form-item label="x" style=" float:left;">
            <el-input v-model="position_data.positionX" placeholder="" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="y" style=" float:left;">
            <el-input v-model="position_data.positionY" placeholder="" style="width:200px;"></el-input>
          </el-form-item>
          <el-button type="primary" size="small" style="float:left;margin-left:80px;" v-on:click.native="save()">{{$t("button.save")}}</el-button>
        </el-form>

      </el-row>
      <el-row style="height: calc(77vh);">
        <div id="station_map" style="width:100%;height:100%;"></div>
      </el-row>
    </div>
  </div>
</template>
<script>
import loadBMap from './js/map.js'
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
export default {
  components: {
  },
  data() {
    return {
      position_data: {
        positionX: '',
        positionY: '',
      },
      myMap: null,
      stationCode: '',
    }
  },
  mounted() {
    this.getNum()
    this.initMap();
  },
  computed: {
    ...mapGetters('login', ['getMapCode']),
  },
  created() {
    this.position_data.positionX = this.getMapCode.lng;
    this.position_data.positionY = this.getMapCode.lat
  },
  methods: {
    ...mapMutations('login', ['setMapCode']),
    initMap() {
      var _this = this;
      loadBMap('nPZ5a2HmF2LHFSvXO9GNW1wsAtj5yKSc')
        .then(() => {
          // 百度地图API功能
          this.myMap = new BMap.Map(station_map) // 创建Map实例
          this.myMap.centerAndZoom("上海", 6);
          this.myMap.enableScrollWheelZoom(true);
          // var marker1 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925));
          var point = new BMap.Point(this.position_data.positionX, this.position_data.positionY);
          var marker = new BMap.Marker(point);
          this.myMap.addOverlay(marker);
          marker.setAnimation(BMAP_ANIMATION_BOUNCE);
          this.myMap.addEventListener("click", function(e) {
            _this.myMap.clearOverlays();
            _this.position_data.positionX = e.point.lng;
            _this.position_data.positionY = e.point.lat;
            point = new BMap.Point(e.point.lng, e.point.lat);
            marker = new BMap.Marker(point);
            _this.myMap.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
          });
        })
        .catch(err => {
          console.log('地图加载失败')
        })
    },
    save() {

      let obj = {
        ...this.position_data,
        stationCode: this.stationCode,
        // stationName: this.stationName,
      }
      http(api.setLocation, obj).then(res => {
        this.setMapCode({ lng: this.position_data.positionX, lat: this.position_data.positionY });
        this.$message({
          type: "success",
          message: "保存地址成功"
        });
      })
    },
    getNum() {
      this.stationCode = this.$route.query.stationCode
      this.stationName = this.$route.query.stationName

    },
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
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;
}
.tableBox {
  margin-top: 50px;
}
</style>