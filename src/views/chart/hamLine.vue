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
      colorList: ["#F98C75", "#FFB760", "#3B7EFD", "#B4ECE6", "#5ED6C8", "#CEBEFF", "#E3EAF8", "#357F88", "#1B9637", "#F7393C", "#7EC0EE", "#FF9F7F", "#FFD700", "#C9C9C9", "#E066FF", "#C0FF3E", "#F98C75", "#FFB760", "#3B7EFD", "#B4ECE6", "#5ED6C8", "#CEBEFF", "#E3EAF8", "#357F88", "#1B9637", "#F7393C", "#7EC0EE", "#FF9F7F", "#FFD700", "#C9C9C9", "#E066FF", "#C0FF3E", "#F98C75", "#FFB760", "#3B7EFD", "#B4ECE6", "#5ED6C8", "#CEBEFF", "#E3EAF8", "#357F88", "#1B9637", "#F7393C", "#7EC0EE", "#FF9F7F", "#FFD700", "#C9C9C9", "#E066FF", "#C0FF3E"],
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
      element.download = "谐波检测图表下载" + ".png"
      // 设置地址以及文件类型
      element.href = charts[0].toDataURL("image/png")
      document.body.appendChild(element)
      // 触发下载事件
      element.click()
      // 移除标签
      element.remove()
    },
    drawLine() {
      this.ylist.forEach((element, index) => {

        this.series.push({
          name: element.fPhase,
          type: 'line',
          data: element.valuelist,
          symbolSize: 1,
          symbol: 'circle',
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          lineStyle: {
            width: 3,
            color: this.colorList[index],
          },
          itemStyle: {
            normal: {
              color: this.colorList[index],
              borderColor: this.colorList[index]
            }
          }
        })

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
          show: false,
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
          extraCssText: 'border: 1px solid rgba(56, 125, 255, 0.5);'
        },
        grid: {
          top: '15%',
          left: '10%',
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
          name: '谐波畸变率%',
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#8590B3',
            fontSize: '12',
            padding: [0, 0, 0, 50]
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
 
<style scoped >
</style>