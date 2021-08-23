<template>
  <div class="echart" style="height:300px;width:100%">
    <div ref="myChart" class="bg" :style="{width: '100%', height: '100%'}"></div>
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
    option: {
      type: Array,
    }
  },
  data() {
    return {
      // option: {},
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {

  },
  methods: {
    drawLine() {
      console.log(this.chartData)
      let xData = [];
      let yData = [];
      let unit = this.chartData.refUnit ? this.chartData.refUnit : ''
      xData.push(
        this.chartData.refKey
      )
      yData.push(this.chartData.refValue)
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      let that = this;
      myChart.setOption(

        {
          "grid": {
            "top": "25%",
            "left": "-5%",
            "bottom": "5%",
            "right": "5%",
            "containLabel": true
          },
          "xAxis": [{
            "type": "category",
            "data": xData,
            "axisTick": {
              "alignWithLabel": true
            },
            "nameTextStyle": {
              "color": "#333"
            },
            "axisLine": {
              show: false,
              "lineStyle": {
                "color": "#333"
              }
            },
            "axisLabel": {
              "textStyle": {
                "color": "#333"
              },
              margin: 30
            }
          }],
          "yAxis": [{
            show: false,
            "type": "value",
            "axisLabel": {
              "textStyle": {
                "color": "#fff"
              },
            },
            "splitLine": {
              "lineStyle": {
                "color": "#333"
              }
            },
            "axisLine": {
              "show": false
            }
          }],
          "series": [{
            "name": "",
            type: 'pictorialBar',
            symbolSize: [40, 10],
            symbolOffset: [0, -6],
            symbolPosition: 'end',
            z: 12,
            // "barWidth": "0",
            "label": {
              "normal": {
                "show": true,
                "position": "top",
                "formatter": "{c}" + unit,
                fontSize: 15,
                fontWeight: 'bold',
                color: '#333'
              }
            },
            color: "#2E78FF",
            data: yData
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [40, 10],
            symbolOffset: [0, 7],
            // "barWidth": "20",
            z: 12,
            "color": "#2E78FF",
            "data": [1]
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [50, 15],
            symbolOffset: [0, 12],
            z: 10,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#2EA9E5',
                borderType: 'solid',
                borderWidth: 1
              }
            },
            data: [1]
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [70, 20],
            symbolOffset: [0, 18],
            z: 10,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#2E78FF',
                borderType: 'solid',
                borderWidth: 2
              }
            },
            data: [1]
          },
          {
            type: 'bar',
            //silent: true,
            "barWidth": "40",
            barGap: '10%', // Make series be overlap
            barCateGoryGap: '10%',
            itemStyle: {
              normal: {
                color: '#2E78FF',
                opacity: .8
              },
            },
            data: yData
          }
          ]
        }
      )
    }
  }}
    //  console.log(this.chartData)
    //   let xData = [];
    //   let yData = [];
    //   let yData2 = []
    //   let unit = []
    //   this.chartData.forEach(element => {
    //     xData.push(
    //       element.refKey
    //     )
    //     yData.push(element.refValue);
    //     unit.push(element.refUnit);
    //     yData2.push(1)
    //   });
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
</style>