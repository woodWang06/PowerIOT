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
      series: [],
      colorList: [
        ["#3077F7", "#176DF4"],
        ["#97EDE6", "#5ED6C8"],
        ["#FF902D", "#FFD883"],
      ],
      type: 2
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {
    if(this.activeName == 1) {
      this.type = 1
    } else {
      this.type = 2
    }
  },
  props: {
    chartData: {
      type: Object,
    },
    activeName: {
      type: String,
    },
    tablelist: {
      type: Object,
    },
    tableData: {
      type: Array,
    },
    keys: {
      type: Object,
    },
    isnh: {
      type: String,
    },
    mess: {
      type: String,
    },
    unit: {
      type: String,
    },
    activeNameName: {
      type: String,
    }
  },
  methods: {
    download(name) {
      // 通过ref找到其下级的canvas
      // const charts = this.$refs.charts.getElementsByTagName('canvas')
      // 通过ID找到其下级的canvas
      const charts = this.$refs.myChart.getElementsByTagName('canvas')
      // 创建标签
      const element = document.createElement("a")
      // 设置下载名称
      element.download = name + "数据图表下载" + ".png"
      // 设置地址以及文件类型
      element.href = charts[0].toDataURL("image/png")
      document.body.appendChild(element)
      // 触发下载事件
      element.click()
      // 移除标签
      element.remove()
    },
    drawLine() {
      let thats = this;
      console.log(this.tableData);
      console.log(this.chartData)
      console.log(this.tablelist)
      this.tableData.forEach((element, index) => {
        if(element != 'rList' && element != 'rList') {
          // debugger
          this.series.push(
            {
              name: this.isnh == '1' ? '能耗' : this.keys[element] ? this.keys[element] : element ? element : '能耗',
              type: 'bar',
              symbolSize: 1,
              symbol: 'circle',
              smooth: true,
              showSymbol: false,
              barWidth: '10%',
              itemStyle: {
                normal: {
                  color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                    type: 'linear',
                    x: 0,
                    y: 1,
                    x2: 0, //从左到右 0-1
                    y2: 0,
                    colorStops: [{
                      offset: 0,
                      color: this.colorList[index][0]
                    },
                    {
                      offset: 1,
                      color: this.colorList[index][1]
                    }],
                  },
                  barBorderRadius: 12,
                },
              },
              data: this.tablelist[element]
            }
          )
        } else {
          this.series.push(
            {
              name: this.isnh == '1' ? '能耗' : this.keys[element] ? this.keys[element] : element ? element : '能耗',
              type: 'line',
              symbolSize: 1,
              symbol: 'circle',
              smooth: true,
              showSymbol: false,
              yAxisIndex: 1,
              itemStyle: { //面积图颜色设置
                normal: {
                  color: thats.colorList[index][0],
                  lineStyle: {
                    color: {
                      type: 'bar',
                      x: 0,
                      y: 1,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 1,
                          color: thats.colorList[index][1] // 100% 处的颜色
                        },
                        {
                          offset: 0.1,
                          color: thats.colorList[index][0], // 0% 处的颜色

                        },
                        {
                          offset: 0.9,
                          color: thats.colorList[index][0], // 0% 处的颜色

                        },
                        {
                          offset: 0,
                          color: thats.colorList[index][1] // 100% 处的颜色
                        },
                      ],
                      globalCoord: true // 缺省为 false
                    },

                    width: 3
                  },
                  areaStyle: {
                    opacity: 0.2,
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: thats.colorList[index][0], // 0% 处的颜色
                        },
                        {
                          offset: 0.1,
                          color: thats.colorList[index][0] // 100% 处的颜色
                        },
                        {
                          offset: 1,
                          color: 'rgba(255,255,255,0)' // 100% 处的颜色
                        },
                      ],
                      globalCoord: true // 缺省为 false
                    },
                  },

                },
              },
              data: this.tablelist[element]
            }
          )
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
        legend: {
          icon: 'roundRect',
          bottom: '5%',
          right: 'center',
          itemWidth: 20,
          itemGap: 20,
          textStyle: {
            color: '#556677'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#fff',
              color: '#556677',
              borderColor: 'rgba(0,0,0,0)',
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 1,
              color: '#387DFF'
            }
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#5c6c7c'
          },
          extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5);border:1px solid #387DFF',
          padding: [10, 10],
          formatter: function(params) {
            var relVal = `<div >`;
            var unn = ''
            for(var i = 0, l = params.length; i < l; i++) {
              if(params[i].seriesName == '同比' || params[i].seriesName == '环比') {
                if(params[i].data != 'Na') {
                  unn = '%'
                }
                relVal += params[i].seriesName + ' : ' + params[i].data + unn + '<br>'

              } else {
                // relVal += params[i].marker + params[i].seriesName + ' : ' + params[i].data + thats.unit + '<br>'
                if(params[i].data) {
                  relVal += params[i].seriesName + ' : ' + params[i].data + thats.unit + '<br>'

                }
              }
            }
            relVal += "</div>";
            return relVal;
          },

        },
        grid: {
          top: '15%',
          left: '8%',
          right: '5%',
          bottom: '20%'
        },
        xAxis: [{
          // type: 'category',
          name: thats.mess,
          data: this.chartData.xlist,
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
          }

        }],
        yAxis: [{
          name: thats.unit,
          type: 'value',
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
        }, {
          name: '%',
          type: 'value',
          // min: -100,
          // max: 100,
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
        },],
        series: this.series
      })
    }
  }}
</script>
 
<style scoped >
</style>