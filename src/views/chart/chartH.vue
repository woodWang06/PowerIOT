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
      ]
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {

  },
  props: {
    ylist: {
      type: Object,
    },
    xlist: {
      type: Array,
    },
    mess: {
      type: String,
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
      let tableData = Object.keys(this.ylist).sort()
      tableData.forEach((element, index) => {
        this.series.push(
          {
            name: element,
            type: 'bar',
            stack: 'one', //堆叠
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
            data: this.ylist[element]
          }
        )

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
          show: true,
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
        grid: {
          top: '15%',
          left: '5%',
          right: '3%',
          bottom: '20%'
        },
        xAxis: [{
          // type: 'category',
          data: this.xlist,
          axisLine: {
            lineStyle: {
              color: '#E9EAF0'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#8590B3',
              fontSize: '12',
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

        }],
        yAxis: [{
          type: 'value',
          name: 'kW·h',
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#8590B3',
            fontSize: '12',

          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#E9EAF0'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#8590B3',
              fontSize: '12',
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
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
</style>