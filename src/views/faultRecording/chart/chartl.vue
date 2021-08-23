<template>
  <div class="echart" style="height:500px;width:100%">
    <div ref="myChart" class="bg" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
 
<script>
export default {
  // name: 'HelloWorld',
  props: {

  },
  data() {
    return {
      option: {},
      colorList: ['rgba(56,125,255, 1)', 'rgba(94, 214, 200, 1)', '#fe9a8b', '#F56948', '#9E87FF'],
      tablelist: [],
      xAxis: [],
      yAxis: [],
      series: [],
      colors: ['#FF902D', '#5ED6C8', '#F35949', '#3077F7', '#FF902D', '#5ED6C8', '#F35949', '#3077F7']
    }
  },
  mounted() {
    this.drawLine()
    // this.chartDta.ymap
  },
  created() {
    let tableData = []
    tableData = Object.keys(this.chartDta.ymap).sort();
    tableData.forEach((val, index) => {
      if(index == (tableData.length - 1)) {
        this.xAxis.push({
          gridIndex: index,
          show: true,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#EAEBF0',
            }
          },
          axisLabel: {
            show: false
          },
          type: 'category',
          boundaryGap: false,
          data: this.chartDta.xlist
        });
      } else {
        this.xAxis.push({
          gridIndex: index,
          show: true,
          type: 'category',
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#EAEBF0',
              type: 'dashed',
            }
          },
          boundaryGap: false,
          data: this.chartDta.xlist
        });
      }

      this.yAxis.push({
        gridIndex: index,
        axisLabel: {
          show: false,
          // color: '#8590B3',
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#bec4d7',
          }
        },
        splitNumber: 1,
        name: val,
        nameLocation: 'center',
        nameRotate: 360

      });
      this.series.push({
        type: 'line',
        data: this.chartDta.ymap[val],
        xAxisIndex: index,
        yAxisIndex: index,
        smooth: true,
        showSymbol: false,
        color: this.colors[index],
        name: val,
        lineStyle: {
          color: this.colors[index]
        }
      })
    })
  },
  props: {
    chartDta: {
      type: Object,
    },
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      let that = this;

      myChart.setOption({

        legend: {
          bottom: 10,
          left: 'center',
          data: ['1', '2', '3', '4', '5']
        },
        axisPointer: {
          link: [{ xAxisIndex: 'all' }],
          snap: false,
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            that.tablelist = params;
            that.$parent.fatherMethod(that.tablelist);
          }
        },
        xAxis: that.xAxis,
        yAxis: that.yAxis,
        grid: [{
          top: '5%',
          height: '10%',
          left: '10%'
        },
        {
          top: '15%',
          height: '10%',
          left: '10%'
        },
        {
          top: '25%',
          height: '10%',
          left: '10%'
        },
        {
          top: '35%',
          height: '10%',
          left: '10%'
        },
        {
          top: '45%',
          height: '10%',
          left: '10%'
        },
        {
          top: '55%',
          height: '10%',
          left: '10%'
        },
        {
          top: '65%',
          height: '10%',
          left: '10%'
        },
        {
          bottom: '15%',
          height: '10%',
          left: '10%'
        }
        ],
        dataZoom: [{
          type: 'inside',
          xAxisIndex: [0, 1, 2, 3, 4, 5, 6, 7],
          start: 0,
          end: 30
        }, {
          type: 'inside',
          start: 0,
          end: 30
        }, {

          start: 0,
          end: 10
        }],
        series: that.series
        // xAxis: [{
        //   gridIndex: 0,
        //   show: true,
        //   type: 'category',
        //   axisLabel: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#EAEBF0',
        //       type: 'dashed',
        //     }
        //   },
        //   boundaryGap: false,
        //   data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        // },
        // {
        //   gridIndex: 1,
        //   show: true,
        //   axisLabel: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#EAEBF0',
        //       type: 'dashed',
        //     }
        //   },
        //   type: 'category',
        //   boundaryGap: false,
        //   data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']        },
        // {
        //   gridIndex: 2,
        //   show: true,
        //   axisTick: {
        //     show: false
        //   },
        //   axisLabel: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#EAEBF0',
        //       type: 'dashed',
        //     }
        //   },
        //   type: 'category',
        //   boundaryGap: false,
        //   data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']        },
        // {
        //   gridIndex: 3,
        //   show: true,
        //   axisTick: {
        //     show: false
        //   },
        //   axisLabel: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#EAEBF0',
        //       type: 'dashed',
        //     }
        //   },
        //   type: 'category',
        //   boundaryGap: false,
        //   data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']        },
        // {
        //   gridIndex: 4,
        //   type: 'category',
        //   axisLabel: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   splitLine: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#EAEBF0',
        //       type: 'dashed',
        //     }
        //   },
        //   boundaryGap: false,
        //   data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']        },
        // {
        //   gridIndex: 5,
        //   show: true,
        //   axisTick: {
        //     show: false
        //   },
        //   axisLabel: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#EAEBF0',
        //       type: 'dashed',
        //     }
        //   },
        //   type: 'category',
        //   boundaryGap: false,
        //   data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']        },
        // {
        //   gridIndex: 6,
        //   show: true,
        //   axisTick: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#EAEBF0',
        //       type: 'dashed',
        //     }
        //   },
        //   axisLabel: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#EAEBF0',
        //       type: 'dashed',
        //     }
        //   },
        //   type: 'category',
        //   boundaryGap: false,
        //   data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']        },
        // {
        //   gridIndex: 7,
        //   show: true,
        //   axisTick: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#EAEBF0',
        //     }
        //   },
        //   axisLabel: {
        //     show: false
        //   },
        //   type: 'category',
        //   boundaryGap: false,
        //   data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']        }
        // ],
        // yAxis: [{
        //   gridIndex: 0,
        //   axisLabel: {
        //     show: false,
        //     // color: '#8590B3',
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   splitLine: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#bec4d7',
        //     }
        //   },
        //   splitNumber: 1,
        //   name: 'Ua',
        //   nameLocation: 'center',
        //   nameRotate: 360

        // },
        // {
        //   gridIndex: 1,
        //   axisLine: {
        //     show: false
        //   },
        //   axisLabel: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   splitLine: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#bec4d7',
        //     }
        //   },
        //   splitNumber: 1,
        //   name: 'Ub',
        //   nameLocation: 'center',
        //   nameRotate: 360
        // },
        // {
        //   gridIndex: 2,
        //   axisLabel: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   splitLine: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#bec4d7',
        //     }
        //   },
        //   splitNumber: 1,
        //   name: 'Uc',
        //   nameLocation: 'center',
        //   nameRotate: 360
        // },
        // {
        //   gridIndex: 3,
        //   axisLabel: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   splitLine: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#bec4d7',
        //     }
        //   },
        //   splitNumber: 1,
        //   name: '3Uo',
        //   nameLocation: 'center',
        //   nameRotate: 360
        // },
        // {
        //   gridIndex: 4,
        //   axisLabel: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   splitLine: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#bec4d7',
        //     }
        //   },
        //   splitNumber: 1,
        //   name: 'la',
        //   nameLocation: 'center',
        //   nameRotate: 360
        // },
        // {
        //   gridIndex: 5,
        //   axisLabel: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   splitLine: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#bec4d7',
        //     }
        //   },
        //   splitNumber: 1,
        //   name: 'lb',
        //   nameLocation: 'center',
        //   nameRotate: 360
        // },
        // {
        //   gridIndex: 6,
        //   axisLabel: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   splitLine: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#bec4d7',
        //     }
        //   },
        //   splitNumber: 1,
        //   name: 'lc',
        //   nameLocation: 'center',
        //   nameRotate: 360
        // },
        // {
        //   gridIndex: 7,
        //   axisLabel: {
        //     show: false
        //   },
        //   axisLine: {
        //     lineStyle: {
        //       color: '#bec4d7',
        //     }
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   splitLine: {
        //     show: false
        //   },
        //   splitNumber: 1,
        //   name: '3lo',
        //   nameLocation: 'center',
        //   nameRotate: 360
        // }
        // ],

        // series: [{
        //   type: 'line',
        //   data: [0, 41.1, 30.4, 65.1, 53.3, 53.3, 53.3, 41.1, 30.4, 65.1, 53.3, 0],
        //   xAxisIndex: 0,
        //   yAxisIndex: 0,
        //   smooth: true,
        //   showSymbol: false,
        //   color: '#5ED6C8',
        //   name: 'Ua',
        //   lineStyle: {
        //     color: '#5ED6C8'
        //   }
        // },
        // {
        //   type: 'line',
        //   data: [0, 74.1, 67.2, 79.5, 46.4, 46.4, 46.4, 74.1, 67.2, 79.5, 46.4, 0],
        //   xAxisIndex: 1,
        //   yAxisIndex: 1,
        //   smooth: true,
        //   showSymbol: false,
        //   color: '#F35949',
        //   name: 'Ub',
        //   lineStyle: {
        //     color: '#F35949'
        //   }
        // },
        // {
        //   type: 'line',
        //   data: [0, 24.1, 7.2, 15.5, 42.4, 42.4, 42.4, 24.1, 7.2, 15.5, 42.4, 0],
        //   xAxisIndex: 2,
        //   yAxisIndex: 2,
        //   smooth: true,
        //   showSymbol: false,
        //   color: '#3077F7',
        //   name: 'Uc',
        //   lineStyle: {
        //     color: '#3077F7'
        //   }
        // },
        // {
        //   type: 'line',
        //   data: [0, 74.1, 67.2, 79.5, 46.4, 46.4, 46.4, 74.1, 67.2, 79.5, 46.4, 0],
        //   xAxisIndex: 3,
        //   yAxisIndex: 3,
        //   smooth: true,
        //   showSymbol: false,
        //   color: '#FF902D',
        //   name: '3Uo',
        //   lineStyle: {
        //     color: '#FF902D'
        //   }
        // },
        // {
        //   type: 'line',
        //   data: [0, 74.1, 67.2, 79.5, 46.4, 46.4, 46.4, 74.1, 67.2, 79.5, 46.4, 0],
        //   xAxisIndex: 4,
        //   yAxisIndex: 4,
        //   smooth: true,
        //   showSymbol: false,
        //   color: '#5ED6C8',
        //   name: 'la',
        //   lineStyle: {
        //     color: '#5ED6C8'
        //   }
        // },
        // {
        //   type: 'line',
        //   data: [0, 74.1, 67.2, 79.5, 46.4, 46.4, 46.4, 74.1, 67.2, 79.5, 46.4, 0],
        //   xAxisIndex: 5,
        //   yAxisIndex: 5,
        //   smooth: true,
        //   showSymbol: false,
        //   color: '#F35949',
        //   name: 'lb',
        //   lineStyle: {
        //     color: '#F35949'
        //   }
        // },
        // {
        //   type: 'line',
        //   data: [0, 74.1, 67.2, 79.5, 46.4, 46.4, 46.4, 74.1, 67.2, 79.5, 46.4, 0],
        //   xAxisIndex: 6,
        //   yAxisIndex: 6,
        //   smooth: true,
        //   showSymbol: false,
        //   color: '#FF902D',
        //   name: 'lc',
        //   lineStyle: {
        //     color: '#FF902D'
        //   }
        // },
        // {
        //   type: 'line',
        //   data: [0, 74.1, 67.2, 79.5, 46.4, 46.4, 46.4, 74.1, 67.2, 79.5, 46.4, 0],
        //   xAxisIndex: 7,
        //   yAxisIndex: 7,
        //   smooth: true,
        //   showSymbol: false,
        //   color: '#3077F7',
        //   name: '3lo',
        //   lineStyle: {
        //     color: '#3077F7'
        //   }
        // }
        // ]

      })
    }
  }}
</script>
 
<style scoped >
</style>