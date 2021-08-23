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
      type: String,
    },
    option: {
      type: Array,
    }
  },
  data() {
    return {
      // option: {},
      value: ''
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {
    this.value = Number(this.chartData.refValue);
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      let that = this
      myChart.setOption(

        {
          title: [{
            text: that.value + `%`,
            left: 'center',
            top: 'center', //top待调整
            textStyle: {
              fontSize: 18,
            },
          }, {
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
          },],
          xAxis: {
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            }
            // data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          },
          yAxis: {
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          series: [
            // 内圆
            {
              type: 'pie',
              // clockWise: true,
              silent: true,
              selectedMode: false,
              selectedOffset: 0,
              avoidLabelOverlap: false,
              radius: ["55%", "45%"],
              emphasis: {
                scale: false,
              },
              hoverAnimation: false,
              data: [{
                value: 100,
                itemStyle: {
                  normal: {
                    // borderWidth: 10,
                    color: '#F0F2F3',
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                  },
                }
              },
              ]
            },
            {
              type: 'pie',
              radius: ['60%', '45%'],
              silent: true,
              // clockwise: true,
              startAngle: 90,
              z: 2,
              // legendHoverLink: false,
              // zlevel: 0,
              label: {
                normal: {
                  position: "center",
                }
              },
              selectedMode: false,
              emphasis: {
                scale: false,
              },
              data: [{
                value: that.value,
                name: "",
                itemStyle: {
                  normal: {
                    // borderWidth: 30,
                    color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                      type: 'linear',
                      x: 0,
                      y: 1,
                      x2: 0, //从左到右 0-1
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: 'rgba(255,144,45,1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(255,144,45,0.2)'
                      }],
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                  },
                }
              },
              {
                value: 100 - Number(that.value),
                name: "",
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgba(0,0,0,0)'
                  }
                }
              }
              ]
            },
          ]
        })
    }
  }}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>