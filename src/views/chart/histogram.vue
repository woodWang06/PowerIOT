<template>
  <div class="echart" style="height:100%;width:100%">
    <div ref="myChart" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
 
<script>
export default {
  // name: 'HelloWorld',
  props: {
    num: {
      type: Number,
    },
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
      let that = this
      myChart.setOption(
        {
          title: {
            text: 50 + `%`,
            left: 'center',
            top: 'center', //top待调整
          },
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
              clockWise: true,
              radius: ["55%", "45%"],
              hoverAnimation: false,
              data: [{
                value: 100,
                itemStyle: {
                  normal: {
                    borderWidth: 10,
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
            // 进度圈
            {
              type: 'pie',
              clockWise: true,
              radius: ["60%", "40%"],
              hoverAnimation: false,
              data: [{
                value: 50,
                itemStyle: {
                  normal: {
                    borderWidth: 30,
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
                      // {
                      //   offset: 0.5,
                      //   color: 'rgba(255,144,45,0.8)'
                      // },
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
                name: 'gap',
                value: 50,
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0,
                  }
                },
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