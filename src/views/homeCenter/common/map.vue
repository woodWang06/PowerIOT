<template>
  <div class="echart" style="height:100%">
    <!-- <div class="back" v-if="falg==2" @click="chinas">返回</div> -->
    <div ref="myEchart" :style="{width:'100%',height:'100%'}"></div>
    <!-- <div ref="myEchart"  :style="{width:'100%',height:'100%'}"></div> -->
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
  data() {
    return {
      points2: [
      ],
      points: [
      ],
      falg: 2,
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
      provinces3: {
        '安徽省': '安徽',
        '澳门': '澳门',
        '北京市': '北京',
        '重庆市': '重庆',
        '福建省': '福建',

        '甘肃省': '甘肃',
        '广东省': '广东',
        '广西壮族自治区': '广西',
        '贵州省': '贵州',
        '海南省': '海南',

        '河北省': '河北',
        '黑龙江省': '黑龙江',
        '河南省': '河南',
        '湖北省': '湖北',
        '湖南省': '湖南',

        '江苏省': '江苏',
        '江西省': '江西',
        '吉林省': '吉林',
        '辽宁': '辽宁省',
        '内蒙古自治区': '内蒙古',

        '宁夏回族自治区': '宁夏',
        '青海省': '青海',
        '山东省': '山东',
        '山西省': '山西',
        '上海市': '上海',
        '陕西省': '陕西',
        '四川省': '四川',

        '台湾省': '台湾',
        '天津市': '天津',
        '香港': '香港',
        '新疆维吾尔自治区': '新疆',
        '西藏自治区': '西藏',
        '云南省': '云南',
        '浙江省': '浙江',
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

  },
  created() {
    let name = this.provinces3[this.getStationInfo.province];
    let mapCode = this.provinces[name];
    this.points.push({
      value: [this.getStationInfo.positionX, this.getStationInfo.positionY],
      name: this.getStationInfo.stationName,
      stationCode: this.getStationInfo.stationCode,
      stationAddress: this.getStationInfo.stationAddress,
      running: this.getStationInfo.running,
      itemStyle: { color: '#3E7EF5' }
    })
    this.$nextTick(() => {
      this.chinaConfigure('map', mapCode);
    });
  },
  computed: {
    ...mapGetters('login', ['getStationInfo']),
  },
  methods: {
    ...mapMutations('login', ['setStationCode']),
    ...mapMutations('login', ['setStationInfo']),
    ...mapMutations('login', ['setEntrance']),
    chinas() {
      this.getAllStation('china', chinaJson);
    },
    chinaConfigure(name, item) {
      this.points2 = this.points
      var that = this;
      this.$echarts.registerMap(name, item);
      let myChart = this.$echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置    
      window.onresize = myChart.resize;
      myChart.setOption({ // 进行相关配置
        tooltip: {
          trigger: 'item',
          show: true,
        },// 鼠标移到图里面的浮动提示框
        geo: {
          map: 'map',
          aspectScale: 0.8, //长宽比
          zoom: 1, //当前视角的缩放比例
          roam: true, //是否开启平游或缩放
          layoutCenter: ['50%', '50%'],
          // layoutSize: name == 'china' ? 650 : 300,
          scaleLimit: { //滚轮缩放的极限控制
            min: 0.5,
            max: 100
          },
          min: 0,
          max: 100,
          mapType: name,
          left: 'center',
          top: 'center',
          // center: [115.97, 29.71],
          label: {
            show: false,
            color: '#fff'
          },
          itemStyle: {
            normal: {
              areaColor: 'RGBA(14, 26, 106, 0)',
              borderColor: '#D4E4FA',
              borderWidth: 1,
            },
            emphasis: {
              areaColor: 'RGBA(14, 26, 106, 0)',
              borderWidth: 1,

              label: {
                show: true,
                color: 'green',
              }
            },
          },
        },
        series: [

          {
            type: 'map',
            mapType: 'map',
            aspectScale: 0.8, //长宽比
            zoom: 1, //当前视角的缩放比例
            roam: true, //是否开启平游或缩放
            layoutCenter: ['50%', '50%'],
            // layoutSize: name == 'china' ? 650 : 300,
            scaleLimit: { //滚轮缩放的极限控制
              min: 0.5,
              max: 100
            },
            min: 0,
            max: 100,
            left: 'center',
            top: 'center',
            tooltip: {
              trigger: 'item',
              show: false,
              // formatter: function(params) {
              //   debugger;
              //   return params.name;
              // }
            },// 鼠标移到图里面的浮动提示框
            label: {
              show: false,
              color: '#fff',

            },
            itemStyle: {
              normal: {
                areaColor: 'RGBA(14, 26, 106, 0)',
                borderColor: '#6fa5e1',
                borderWidth: 1,
              },
              emphasis: {
                // areaColor: '#3db8ff',
                areaColor: '#EAF1FE',
                borderColor: '#6fa5e1',
                borderWidth: 1,
                label: {
                  show: true,
                  color: '#3E7EF5',
                }
              },
            },
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 1,
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill'
            },
            hoverAnimation: false,
            tooltip: {
              position: function(point, params, dom, rect, size) {
                // 固定在顶部
                return [point[0] - 120, point[1] - 175];
              },
              textStyle: {
                width: 100,
                height: 80,
              },
              // background: "url('../../../assets/new/mapBG.png')",
              backgroundColor: "transparent",
              // extraCssText: "backround:url('../../../assets/new/mapBG.png') no-repeat;background-size:100% 100%;",
              formatter: function(params) {
                let html = '';
                html += `<div style="color: #334681;font-size: 14px;line-height: 24px;background:#fff;border:1px solid #3D7EF8;border-radius:10px;width:230px;height:150px;background-size:100% 100%;text-align:left;padding:10px;overflow:hidden"><div style="font-size:1.6rem">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3E7EF5;"></span>
               项目信息</div><div>
                <span style="font-size: 1.2rem">项目名称：${ params.data.name}
                <br>项目地址：${ params.data.stationAddress}
                <br>安全运行时间:${ params.data.running}</span></div></div>`;
                return html
              }
              // formatter: function(params) {
              //   debugger;
              //   return params.name;
              // }
            },
            label: {
              normal: {
                position: 'right',
                offset: [15, 0],
                // color: '#f9e779',
                show: false
              },
            },
            itemStyle: {
              normal: {
                color: '#3E7EF5',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            symbolSize: 10,
            data: this.points2,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            emphasis: {
              scale: true,
              focus: 'series',
              blurScope: 'global',
              itemStyle: {
                scale: true,
                focus: 'series',
                blurScope: 'global',
                borderMiterLimit: 30,
                borderCap: 'round',
                normal: {
                  borderMiterLimit: 30,
                  borderCap: 'round',
                  symbolSize: 13,
                  color: '#3E7EF5'/* function (value){ //随机颜色
 return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
 }*/,
                  // symbol: 'image://../../../../assets/new/mapBG.png',
                  shadowBlur: 50,
                  shadowColor: '#f9e779',
                  width: 50,
                }
              },
            }
          },

        ]
      }, true);

      myChart.on('georoam', function(params) {
        var option = myChart.getOption(); //获得option对象
        if(params.zoom != null && params.zoom != undefined) { //捕捉到缩放时
          option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        } else { //捕捉到拖曳时
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        }
        myChart.setOption(option, true); //设置option
      });

    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back {
  cursor: pointer;
  text-align: right;
  color: #fff;
  position: absolute;
  top: 100px;
  right: 30px;
  z-index: 10000;
}
</style>