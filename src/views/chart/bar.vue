<template>
  <div class="echart" style="height:100%;width:100%">
    <div ref="myChart" class="bg" :style="{width: '150px', height: '100%'}"></div>
  </div>
</template>
 
<script>
export default {
  // name: 'HelloWorld',
  // name: 'HelloWorld',
  props: {
    chartData: {
      type: Object,
    },
    maxValue: {
      type: String,
    },
    option: {
      type: Array,
    }
  },
  data() {
    return {
      option: {},
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {

  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      let that = this;

      myChart.setOption({
        left: 0,
        right: 0,
        grid: {
          left: 50,
        },

        title: {
          // text: '温度计',
          show: false,
          textStyle: {
            color: '#fff'
          }
        },
        yAxis: [
          {
            show: false,
            data: [],
            min: 0,
            max: 100,
            axisLine: {
              show: false
            }
          },
          {
            show: false,
            min: 0,
            max: 100,
          },

        ],
        xAxis: [
          {
            show: false,
            min: -10,
            max: 100,
            data: []
          },
          {
            show: false,
            min: -10,
            max: 100,
            data: []
          },
          {
            show: false,
            min: -10,
            max: 100,
            data: []
          },
          {
            show: false,
            min: -5,
            max: 100,
          }
        ],
        series: [
          {
            name: '条/温度计柱',
            type: 'bar',
            // 对应上面XAxis的第一个对象配置
            // xAxisIndex: 0,
            data: [{
              value: 100,
            }],
            // barGap: '-100%',
            barWidth: 20,
            barBorderRadius: [10, 10, 10, 10],
            itemStyle: {
              barBorderRadius: [10, 10, 10, 10],
              normal: {
                barBorderRadius: [10, 10, 10, 10],
                // color: '#000',
                color: '#D8DBDF'
              }
            },
            // z: 2
          },
          {
            name: '条/温度计柱',
            type: 'bar',
            barGap: '-100%',
            // 对应上面XAxis的第一个对象配置
            // xAxisIndex: 0,
            data: [{
              value: Number(that.chartData.refValue),
              label: {
                normal: {
                  show: true,
                  position: [25, 0],
                  backgroundColor: '#F35949',
                  width: 50,
                  height: 10,
                  borderRadius: 5,
                  padding: [10, 0, 10, 10],
                  color: "#fff",
                  formatter: function(value) {
                    return value.value + '°C';
                  },
                  rich: {
                    back: {
                      align: 'right',
                      lineHeight: 36,
                      fontSize: 24,
                      fontFamily: '微软雅黑',
                      color: '#000'
                    },
                    unit: {
                      align: 'right',
                      fontFamily: '微软雅黑',
                      fontSize: 14,
                      lineHeight: 36,
                      color: '#fff'
                    },
                    downTxt: {
                      lineHeight: 36,
                      fontSize: 24,
                      align: 'right',
                      color: '#000'
                    }
                  }
                }
              }
            }],
            barWidth: 20,
            barBorderRadius: [10, 10, 10, 10],
            itemStyle: {
              barBorderRadius: [10, 10, 10, 10],
              normal: {
                barBorderRadius: [10, 10, 10, 10],
                // color: '#000',
                color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0, //从左到右 0-1
                  y2: 0,
                  colorStops: [{
                    offset: 0,
                    color: '#F88670'
                  }, {
                    offset: 1,
                    color: '#F35949'
                  }],
                }
              }
            },
            // z: 2
          }, {
            name: '圆',
            // barGap: '-110%',
            type: 'scatter',
            hoverAnimation: false,
            data: [0],
            // xAxisIndex: 0,
            symbolSize: 35,
            itemStyle: {
              normal: {
                color: '#F88670',
                opacity: 1,
              }
            },
            z: 2
          },]
      })
    }
  }}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.bg {
  background: url("../../assets/newW/chartIBg.png") no-repeat;
  background-size: 114px 100%;
  background-position: 0px 0;
  margin: 0 auto;
}
</style>