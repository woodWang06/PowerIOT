<template>
  <div class="echart" style="height:400px;width:100%">
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
      series: [],
      colorList: [
        ["#276DF4", "#3077F7"],
        ["#97EDE6", "#5ED6C8"],
        ["#FFD883", "#FF902D"],
      ],
      pieces: [],
      series: []
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {

  },
  props: {
    ylist: {
      type: Array,
    },
    xlist: {
      type: Array,
    },
    zid: {
      type: Array,
    },
    activeNameName: {
      type: String,
    }
  },
  methods: {
    download() {
      // 通过ref找到其下级的canvas
      // const charts = this.$refs.charts.getElementsByTagName('canvas')
      // 通过ID找到其下级的canvas
      const charts = this.$refs.myChart.getElementsByTagName('canvas')
      // 创建标签
      const element = document.createElement("a")
      // 设置下载名称
      element.download = "分时用电图表下载" + ".png"
      // 设置地址以及文件类型
      element.href = charts[0].toDataURL("image/png")
      document.body.appendChild(element)
      // 触发下载事件
      element.click()
      // 移除标签
      element.remove()
    },
    drawLine() {

      this.zid.forEach((element, index) => {
        if(element.name == '峰值') {
          this.pieces.push(
            {
              ...element,
              color: 'rgba(255, 144, 45, 1)',

            }
          );
          if(index == 0) {
            this.series.push(
              {
                name: '用电量',
                type: 'line',
                smooth: true,
                data: this.ylist,
                markArea: {
                  itemStyle: {
                    color: 'rgba(255, 144, 45, 0.4)'
                  },
                  data:
                    [[{
                      name: element.name,
                      xAxis: element.gt
                    }, {
                      xAxis: element.lte
                    }]]
                }
              },
            )
          } else {
            this.series.push(
              {
                name: '用电量',
                type: 'line',
                smooth: true,
                markArea: {
                  itemStyle: {
                    color: 'rgba(255, 144, 45, 0.4)'
                  },
                  data:
                    [[{
                      name: element.name,
                      xAxis: element.gt
                    }, {
                      xAxis: element.lte
                    }]]
                }
              },
            )
          }

        } else if(element.name == '平值') {
          this.pieces.push(
            {
              ...element,
              color: 'rgba(48, 119, 247, 1)',

            }
          );
          if(index == 0) {
            this.series.push(
              {
                name: '用电量',
                type: 'line',
                smooth: true,
                data: this.ylist,
                markArea: {
                  itemStyle: {
                    color: 'rgba(255, 144, 45, 0)'
                  },
                  data:
                    [[{
                      name: element.name,
                      xAxis: element.gt
                    }, {
                      xAxis: element.lte
                    }]]
                }
              },
            )
          } else {
            this.series.push(
              {
                name: '用电量',
                type: 'line',
                smooth: true,
                markArea: {
                  itemStyle: {
                    color: 'rgba(255, 144, 45, 0)'
                  },
                  data:
                    [[{
                      name: element.name,
                      xAxis: element.gt
                    }, {
                      xAxis: element.lte
                    }]]
                }
              },
            )
          }
        } else {
          this.pieces.push(
            {
              ...element,
              color: 'rgba(94, 214, 200, 1)'

            }
          );
          if(index == 0) {
            this.series.push(
              {
                name: '用电量',
                type: 'line',
                smooth: true,
                data: this.ylist,
                markArea: {
                  itemStyle: {
                    color: 'rgba(94, 214, 200, 0.4)'
                  },
                  data:
                    [[{
                      name: element.name,
                      xAxis: element.gt
                    }, {
                      xAxis: element.lte
                    }]]
                }
              },
            )
          } else {
            this.series.push(
              {
                name: '用电量',
                type: 'line',
                smooth: true,
                markArea: {
                  itemStyle: {
                    color: 'rgba(94, 214, 200, 0.4)'
                  },
                  data:
                    [[{
                      name: element.name,
                      xAxis: element.gt
                    }, {
                      xAxis: element.lte
                    }]]
                }
              },
            )
          }
        }


      });
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      let that = this;

      myChart.setOption({
        title: {
          text: that.activeNameName,
          left: 'center',
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '3%',
          bottom: '20%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'shadow',
            borderColor: '#387DFF',
            label: {
              show: true,
              backgroundColor: '#fff',
              color: '#556677',
              borderColor: '#387DFF',
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 1,
              color: '#387DFF'
            }
          },
          // position: [point[0], '0'],
          position: function(point, params, dom, rect, size) {
            // 固定在顶部
            return [point[0], '0'];
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#5c6c7c'
          },
          padding: [10, 10],
          formatter: function(params) {
            var relVal = `<div >`;
            for(var i = 0, l = params.length; i < l; i++) {
              relVal += params[i].seriesName + ' : ' + params[i].value + 'kW·h<br>'
            }
            relVal += "</div>";
            return relVal;
          },
          extraCssText: 'border: 1px solid rgba(56, 125, 255, 0.5);'
        },
        toolbox: {
          show: true,
          // feature: {
          //   saveAsImage: {}
          // }
        },

        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#DCE2E8'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#EDEEF2'],
              width: 1,
              type: 'dashed'
            }
          },
          type: 'category',
          boundaryGap: false,
          data: that.xlist
        },
        yAxis: {
          type: 'value',
          name: 'kW·h',
          axisLabel: {
            formatter: '{value} W'
          },
          axisPointer: {
            snap: true
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#DCE2E8'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#556677'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#EDEEF2'],
              width: 1,
              type: 'dashed'
            }
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: that.pieces
          // [
          //   {
          //     gt: 0,
          //     lte: 2,
          //     color: 'rgba(94, 214, 200, 1)'
          //   }, {
          //     gt: 2,
          //     lte: 5,
          //     color: 'rgba(48, 119, 247, 1)'
          //   }, {
          //     gt: 5,
          //     lte: 9,
          //     color: 'rgba(255, 144, 45, 1)'
          //   }, {
          //     gt: 9,
          //     lte: 15,
          //     color: 'rgba(48, 119, 247, 1)'
          //   }, {
          //     gt: 15,
          //     lte: 17,
          //     color: 'rgba(255, 144, 45, 1)'
          //   }, {
          //     gt: 17,
          //     lte: 21,
          //     color: 'rgba(48, 119, 247, 1)'
          //   },
          //   {
          //     gt: 21,
          //     lte: 23,
          //     color: 'rgba(94, 214, 200, 1)'
          //   }]
        },
        series: that.series,
        // [
        //   {
        //     name: '用电量',
        //     type: 'line',
        //     smooth: true,
        //     data: that.ylist,
        //     markArea: {
        //       itemStyle: {
        //         color: 'rgba(255, 144, 45, 0.4)'
        //       },
        //       data:
        //         [[{
        //           name: '峰值',
        //           xAxis: '15'
        //         }, {
        //           xAxis: '17'
        //         }], [{
        //           name: '峰值',
        //           xAxis: '5'
        //         }, {
        //           xAxis: '9'
        //         }]]
        //     }
        //   },
        //   {
        //     name: '用电量',
        //     type: 'line',
        //     smooth: true,
        //     // data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
        //     markArea: {
        //       itemStyle: {
        //         color: 'rgba(94, 214, 200, 0.4)'
        //       },
        //       data: [[{
        //         name: '谷值',
        //         xAxis: '0'
        //       }, {
        //         xAxis: '2'
        //       }], [{
        //         name: '谷值',
        //         xAxis: '21'
        //       }, {
        //         xAxis: '23'
        //       }]]
        //     }
        //   },
        //   {
        //     name: '用电量',
        //     type: 'line',
        //     smooth: true,
        //     // data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
        //     markArea: {
        //       itemStyle: {
        //         color: 'rgba(94, 214, 200, 0)'
        //       },
        //       data: [[{
        //         name: '平值',
        //         xAxis: '2'
        //       }, {
        //         xAxis: '5'
        //       }], [{
        //         name: '平值',
        //         xAxis: '17'
        //       }, {
        //         xAxis: '21'
        //       }], [{
        //         name: '平值',
        //         xAxis: '10'
        //       }, {
        //         xAxis: '15'
        //       }]]
        //     }
        //   }
        // ]
      })
    }
  }}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
</style>