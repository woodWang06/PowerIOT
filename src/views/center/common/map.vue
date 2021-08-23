<template>
  <div class="echart" style="height:100%">
    <img class="back" v-if="falg==2" @click="chinas" src="../../../assets/new/zmap.png">
    <div ref="myEchart" v-if="falg==2" :style="{width:'100%',height:'100%'}"></div>
    <div ref="myEchart" v-else :style="{width:'100%',height:'100%'}"></div>
  </div>
</template>
 
<script>
var ltopdata = [
]
import api from 'api';
import http from 'http';
import chinaJson from 'echarts/map/json/china.json';
import anhui from '../json/province/anhui';
import aomen from '../json/province/aomen';
import beijing from '../json/province/beijing';
import chongqing from '../json/province/chongqing';
import fujian from '../json/province/fujian';
import gansu from '../json/province/gansu';
import guangdong from '../json/province/guangdong';
import guangxi from '../json/province/guangxi';
import guizhou from '../json/province/guizhou';
import hainan from '../json/province/hainan';
import hebei from '../json/province/hebei';
import heilongjiang from '../json/province/heilongjiang';
import henan from '../json/province/henan';
import hubei from '../json/province/hubei';
import hunan from '../json/province/hunan';

import jiangsu from '../json/province/jiangsu';
import jiangxi from '../json/province/jiangxi';
import jilin from '../json/province/jilin';
import liaoning from '../json/province/liaoning';
import neimenggu from '../json/province/neimenggu';

import ningxia from '../json/province/ningxia';
import qinghai from '../json/province/qinghai';
import shandong from '../json/province/shandong';
import shanghai from '../json/province/shanghai';
import shanxi from '../json/province/shanxi';
import shannxi from '../json/province/shanxi1';
import sichuan from '../json/province/sichuan';

import taiwan from '../json/province/taiwan';
import tianjin from '../json/province/tianjin';
import xianggang from '../json/province/xianggang';
import xinjiang from '../json/province/xinjiang';
import xizang from '../json/province/xizang';

import yunnan from '../json/province/yunnan';
import zhejiang from '../json/province/zhejiang';
import { mapMutations, mapGetters } from 'vuex';
export default {
  props: {

  },
  data() {
    return {
      points2: [
      ],
      points: [
      ],
      zss: 1,
      zss2: 1,
      falg: 1,
      falg2: true,
      provinces2: {
        '安徽': '安徽省',
        '澳门': '澳门',
        '北京': '北京市',
        '重庆': '重庆市',
        '福建': '福建省',

        '甘肃': '甘肃省',
        '广东': '广东省',
        '广西': '广西壮族自治区',
        '贵州': '贵州省',
        '海南': '海南省',

        '河北': '河北省',
        '黑龙江': '黑龙江省',
        '河南': '河南省',
        '湖北': '湖北省',
        '湖南': '湖南省',

        '江苏': '江苏省',
        '江西': '江西省',
        '吉林': '吉林省',
        '辽宁': '辽宁省',
        '内蒙古': '内蒙古自治区',

        '宁夏': '宁夏回族自治区',
        '青海': '青海省',
        '山东': '山东省',
        '山西': '山西省',
        '上海': '上海市',
        '陕西': '陕西省',
        '四川': '四川省',

        '台湾': '台湾省',
        '天津': '天津市',
        '香港': '香港',
        '新疆': '新疆维吾尔自治区',
        '西藏': '西藏自治区',
        '云南': '云南省',
        '浙江': '浙江省',
      },
      provinces: {
        '安徽': anhui,
        '澳门': aomen,
        '北京': beijing,
        '重庆': chongqing,
        '福建': fujian,

        '甘肃': gansu,
        '广东': guangdong,
        '广西': guangxi,
        '贵州': guizhou,
        '海南': hainan,

        '河北': hebei,
        '黑龙江': heilongjiang,
        '河南': henan,
        '湖北': hubei,
        '湖南': hunan,

        '江苏': jiangsu,
        '江西': jiangxi,
        '吉林': jilin,
        '辽宁': liaoning,
        '内蒙古': neimenggu,

        '宁夏': ningxia,
        '青海': qinghai,
        '山东': shandong,
        '山西': shanxi,
        '上海': shanghai,
        '陕西': shannxi,
        '四川': sichuan,

        '台湾': taiwan,
        '天津': tianjin,
        '香港': xianggang,
        '新疆': xinjiang,
        '西藏': xizang,
        '云南': yunnan,
        '浙江': zhejiang,
      }
    }
  },
  mounted() {
    this.getAllStation('china', chinaJson);
    let that = this
    this.timer2 = setInterval(function() {
      // that.gloableMap.clear();
      that.getAllStation('china', chinaJson);
    }, 300000);
  },
  beforeDestroy() {
    clearInterval(this.timer2);
    this.timer2 = null
    // var myChart = this.$refs.myEchart
    this.gloableMap.clear(); // 移除容器上的 _echarts_instance

  },
  created() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let ss = width / height
    if(ss > 1.7) {
      this.zss = 1.1;
      this.zss2 = 0.9;

    } else if(ss > 1.5) {
      this.zss = 0.9
      this.zss2 = 0.6;
    } else if(ss > 1.3) {
      this.zss = 0.8
      this.zss2 = 0.6;
    } else {
      this.zss = 0.7;
      this.zss2 = 0.5;
    }

  },
  methods: {
    ...mapMutations('login', ['setStationCode']),
    ...mapMutations('login', ['setStationInfo']),
    ...mapMutations('login', ['setEntrance']),
    //地图接口
    getAllStation(name, item) {
      this.points = []
      http(api.getStationStatMap).then(res => {
        let colorss = ''
        res.forEach(val => {
          if(Number(val.faultCount) > 0) {
            colorss = '#F83827'
          } else if(Number(val.warningCount) > 0) {
            colorss = '#F9BE1E'
          } else {
            colorss = '#47ECFF'
          }

          this.points.push({
            ...val,
            value: [val.positionX, val.positionY],
            name: val.stationName,
            stationCode: val.stationCode,
            stationAddress: val.stationAddress ? val.stationAddress : '',
            running: val.running ? val.running : '',
            itemStyle: { color: colorss }
          })
        })
        this.chinaConfigure(name, item);
      })
      console.log(this.points)
    },
    getAllStation2(name, item, proce) {
      // this.falg2 = false;
      let pro = this.provinces2[proce]
      this.points = [];
      let colorss = ''
      http(api.getStationStatMap, { province: pro }).then(res => {
        this.falg2 = true;
        res.forEach(val => {
          if(Number(val.faultCount) > 0) {
            colorss = '#F83827'
          } else if(Number(val.warningCount) > 0) {
            colorss = '#F9BE1E'
          } else {
            colorss = '#47ECFF'
          }

          this.points.push({
            ...val,
            value: [val.positionX, val.positionY],
            name: val.stationName,
            stationCode: val.stationCode,
            stationAddress: val.stationAddress ? val.stationAddress : '',
            running: val.running ? val.running : '',
            itemStyle: { color: colorss }
          })
        })
        this.chinaConfigure(name, item);
      })
      console.log(this.points)
    },
    chinas() {
      this.getAllStation('china', chinaJson);
    },
    chinaConfigure(name, item) {
      // this.points2 = []
      if(name == 'china') {
        this.falg = 1;
        this.points2 = this.points
      } else {
        this.falg = 2;
        this.points2 = this.points
      }
      var that = this;
      this.$echarts.registerMap(name, item);
      this.gloableMap = this.$echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置    
      window.onresize = this.gloableMap.resize;
      this.gloableMap.on('click', function(params) {
        if(params.data) {
          that.setEntrance('status');
          that.setStationCode(params.data.stationCode);
          that.setStationInfo(params.data);
          that.$router.push('/homeCenter');
        } else {
          var name = params.name; //地区name
          var mapCode = that.provinces[name]; //地区的json数据
          that.getAllStation2('map', mapCode, name);
        }
      });
      this.gloableMap.setOption({ // 进行相关配置
        tooltip: {
          trigger: 'item',
          show: true,
        },// 鼠标移到图里面的浮动提示框

        geo: {
          map: name,
          aspectScale: 0.8, //长宽比
          zoom: name == 'china' ? that.zss : 1, //当前视角的缩放比例
          roam: false, //是否开启平游或缩放
          layoutCenter: ['50%', '50%'],
          scaleLimit: { //滚轮缩放的极限控制
            min: 0.5,
            max: 100
          },
          mapType: name,
          itemStyle: {
            normal: {
              areaColor: 'RGBA(14, 26, 106, 0.2)',
              borderColor: 'RGBA(68, 154, 251, 1)',
              borderWidth: 2,
              shadowColor: 'RGBA(68, 124, 221, 1)',
              shadowOffsetX: 5,
              shadowOffsetY: 5,
              shadowBlur: 15,
            },
            emphasis: {
              areaColor: 'rgba(0,0,0,0)',
              label: {
                show: true,
                color: '#fff',
              }
            },
          },
        },
        series: [

          {
            type: 'map',
            mapType: name,
            aspectScale: 0.8, //长宽比
            zoom: name == 'china' ? that.zss : 1, //当前视角的缩放比例
            roam: true, //是否开启平游或缩放
            layoutCenter: ['50%', '50%'],
            scaleLimit: { //滚轮缩放的极限控制
              min: 0.5,
              max: 100
            },
            tooltip: {
              show: false,
            },// 鼠标移到图里面的浮动提示框

            itemStyle: {
              normal: {
                areaColor: 'RGBA(20, 62, 201, 0.2)',
                borderColor: 'RGBA(20, 62, 201, 0.1)',
                borderWidth: 1,
                shadowColor: 'RGBA(20, 62, 201, 0.5)',
              },
              emphasis: {
                areaColor: 'rgba(0,0,0,0)',
                label: {
                  show: true,
                  color: '#fff',
                }
              },
            },
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill'
            },
            tooltip: {
              position: function(point, params, dom, rect, size) {
                return [point[0] - 120, point[1] - 175];
              },
              backgroundColor: "transparent",
              formatter: function(params) {
                let html = '';
                html += `<div style="color: #fff;font-size: 14px;line-height: 24px;background:url( ${require("../../../assets/new/mapBG.png")}) no-repeat;width:230px;height:150px;background-size:100% 100%;text-align:left;padding:20px 25px;overflow:hidden"><div style="font-size:1.6rem">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#47ECFF;"></span>
               项目信息</div><div>
                <span style="font-size: 1.2rem">项目名称：${ params.data.name}
                <br>项目地址：${ params.data.stationAddress}
                <br>安全运行时间:${ params.data.running}</span></div></div>`;
                return html
              }
            },
            symbolSize: 13,
            data: this.points2,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
          },

        ]
      }, true);

      this.gloableMap.on('georoam', function(params) {
        // debugger
        var option = that.gloableMap.getOption(); //获得option对象
        if(params.zoom != null && params.zoom != undefined) { //捕捉到缩放时
          option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        } else { //捕捉到拖曳时
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        }
        that.gloableMap.setOption(option, true); //设置option
      });

    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.back {
  cursor: pointer;
  text-align: right;
  color: #fff;
  position: absolute;
  bottom: 25%;
  right: 25%;
  z-index: 10000;
  overflow: visible;
  border: 1.5px solid #3c8af2;
  width: 9rem;
  border-radius: 5px;
  /* padding: 10px; */
}
.back img {
}
.echart {
  overflow: visible;
}
canvas {
  overflow: visible !important;
}
</style>