<template>
  <div class="echart" style="height:100%;width:100%">
    <div ref="myChart" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
 
<script>
export default {
  // name: 'HelloWorld',
  props: {
    chartData: {
      type: Object,
    },
    maxValue: {
      type: Number,
    },
    options: {
      type: Array,
    }
  },

  data() {
    return {
      // option: {},
      max: '',
      max2: '',
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {
    // if(this.maxValue == 'gonglvyinshu') {
    //   this.max = 1;
    //   this.max2 = 1 / 270 * 360;
    //   return;
    // }

    this.options.forEach((val, index) => {
      if(index == this.maxValue) {
        this.max = Number(this.chartData.refValue) + Number(val.max);
        this.max2 = this.max / 270 * 360;
      }
    })
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      let that = this
      myChart.setOption({
        title: {
          show: true,
          text: that.chartData.refKey,
          left: 'center',
          bottom: 20,
          textStyle: {
            color: 'rgba(165, 167, 170, 1)',
            fontSize: 14,
            align: 'center',
            fontWeight: 'normal'
          },
        },
        angleAxis: {
          show: false,
          max: that.max2, //-45度到225度，二者偏移值是270度除360度
          type: 'value',
          startAngle: 225, //极坐标初始角度
          splitLine: {
            show: false
          }
        },
        barMaxWidth: 21, //圆环宽度
        radiusAxis: {
          show: false,
          type: 'category',
        },
        //圆环位置和大小
        polar: {
          center: ['50%', '50%'],
          radius: '150%',
        },
        series: [

          {
            type: 'bar',
            hoverAnimation: false,
            avoidLabelOverlap: false,
            legendHoverLink: false,
            data: [{ //上层圆环，显示数据
              value: this.chartData.refValue,
              itemStyle: {
                color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1, //从左到右 0-1
                  y2: 0,
                  colorStops: [{
                    offset: 0,
                    color: '#2E78FF'
                  }, {
                    offset: 1,
                    color: '#3684F3'
                  }],
                },
              },
            }],
            barGap: '-100%', //柱间距离,上下两层圆环重合
            coordinateSystem: 'polar',
            roundCap: true, //顶端圆角从 v4.5.0 开始支持
            z: 2,//圆环层级，同zindex

          },
          { //下层圆环，显示最大值
            type: 'bar',
            hoverAnimation: false,
            avoidLabelOverlap: false,
            legendHoverLink: false,
            color: '#F0F2F3',
            data: [{
              value: that.max,
              itemStyle: {
                color: '#F0F2F3'
              }
            }],
            barGap: '-100%',
            coordinateSystem: 'polar',
            roundCap: true,
            z: 1,
            emphasis: {
              itemStyle: {
                color: '#F0F2F3'
              }
            }
          },
          // 圆环
          {
            "name": '小圆形',
            "type": 'pie',
            "hoverAnimation": false,
            "legendHoverLink": false,
            "radius": ['3%', '9%'],
            "z": 0,
            "labelLine": {
              "normal": {
                "show": false
              }
            },
            "data": [{
              "value": 0,
            }, {
              "value": 10,

              itemStyle: {
                normal: {
                  color: "#E1E8F4"
                },
                emphasis: {
                  color: "#E1E8F4"
                }
              }
            }]
          },
          {
            type: 'gauge',
            roundCap: true,
            min: 0, //最小刻度
            max: that.max, //最大刻度
            progress: {
              show: true,
              roundCap: true,
              overlap: true,
              // width: 18
            },
            radius: '65%',
            color: '#F0F2F3',
            axisLine: { // 坐标轴线
              roundCap: true,
              show: false,
              lineStyle: { // 属性lineStyle控制线条样式
                width: 10,

              },
              backgroundColor: "none"
            },
            itemStyle: {
              color: '#2E78FF',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '75%',
              width: 16,
              offsetCenter: [0, '5%']
            },
            axisTick: {
              show: false,
              // color: '#8C97A2'
            },
            anchor: {
              show: true,
              // showAbove: true,
              size: 40,
              icon: 'circle',
              color: '#999',
              itemStyle: {
                borderWidth: 0,
                color: '#ddd',

              }
            },
            splitLine: {
              splitNumber: 5,
              length: 10,
              distance: 0,
              lineStyle: {
                width: 3,
                color: '#E7E9EB'
              }
            },
            axisLabel: {
              show: false,
              distance: 25,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 25,
              itemStyle: {
                borderWidth: 10
              }
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              fontSize: 30,
              borderRadius: 8,
              color: '#1F242A',
              offsetCenter: [0, '70%'],
              formatter: function(value) {
                return value + that.chartData.refUnit
              },
            },
            data: [{
              value: this.chartData.refValue
            }]
          }]
      })
    }
  }}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>