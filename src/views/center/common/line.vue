<template>
  <!-- <ve-line ref="lines" :data="chartData" :dataZoom="dataZoom" height="100%" width="100%" :extend="chartExtend" :settings="chartSettings" :grid="grid" :colors="colorsHis">
  </ve-line> -->
  <div class="echart" style="height:100%;width:100%">
    <div ref="myChart" class="bg" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
 
<script>
export default {
  // name: 'HelloWorld',

  data() {

    return {
      chartData: {
        columns: ['week', 'ylist', 'tlist',],
        rows: [
        ]
      },
      keys: {
        fault: '故障',
        warning: '预警',
        mm: '环比',
        yy: '同比',
        t: '预测值',
        y: '实际值',
      },
      colorList: [
        ['rgba(38,201,229,0.2)', 'rgba(38,201,229,1)'],
        ['rgba(227,117,27,0.2)', 'rgba(227,117,27,1)'],
      ],
      series: [],
      myChart: null
    }
  },
  mounted() {
    this.drawLine();
  },
  components: {
  },
  props: {
    datas: {
      type: Object,
    },
    unit: {
      type: String,
    },
    leftng: {
      type: String,
    }
  },
  watch: {
    datas: {
      handler(newValue, oldValue) {
        //父组件param对象改变会触发此函数
        this.drawLine()
      },
      deep: true
    }
    // 因为不能直接修改 props 里的属性，所以不能直接把 formData 通过v-model进行绑定
  },
  methods: {
    drawLine() {

      let datekeys = Object.keys(this.datas.ymap);
      let thats = this;
      this.series = []
      datekeys.forEach((element, index) => {
        this.series.push(
          {
            name: this.keys[element] ? this.keys[element] : element,
            type: 'line',
            symbolSize: 1,
            symbol: 'circle',
            // smooth: true,
            // showSymbol: false,
            itemStyle: { //面积图颜色设置
              normal: {
                color: thats.colorList[index][1],
                lineStyle: {

                  color: {
                    type: 'linear',
                    x: 0,
                    y: 1,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 1,

                        color: thats.colorList[index][0] // 100% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: thats.colorList[index][1], // 0% 处的颜色

                      },
                      {
                        offset: 0,
                        color: thats.colorList[index][0] // 100% 处的颜色
                      },
                    ],
                    globalCoord: true // 缺省为 false
                  },

                  width: 3
                },
                areaStyle: {
                  opacity: 0.4,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: thats.colorList[index][1], // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: thats.colorList[index][0] // 100% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(0,0,0,0)' // 100% 处的颜色
                      },
                    ],
                    globalCoord: true // 缺省为 false
                  },
                },

              },
            },
            data: this.datas.ymap[element]
          }
        )

      });
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      let that = this;

      this.myChart.setOption({
        // animation: false,
        legend: {
          itemGap: 50,
          show: true,
          bottom: 0,
          icon: 'roundRect',
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            color: "#fff",//图例字体颜色
            width: 100
          },
          backgroundColor: 'transparent'
        },
        tooltip: {
          trigger: 'axis',
          extraCssText: 'z-index:1000; padding:5px 15px',
          textStyle: {
            fontSize: 12
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(40, 166, 189,0.3)'
                }, {
                  offset: 0.5,
                  color: 'rgba(40, 166, 189,1)',
                }, {
                  offset: 1,
                  color: 'rgba(40, 166, 189,0.3)'
                }],
                global: false
              }
            },
          },
          position: function(point, params, dom, rect, size) {
            // 固定在顶部
            return [point[0] - 60, 0];
          },
          backgroundColor: 'rgba(17,58,99,0.8)',
          formatter: function(params) {
            var relVal = `<div style='text-align:left; position: relative;'><img style="position: absolute;left:39%; bottom:-12px" src="${require("../../../assets/new/toolicon.png")}">`;
            for(var i = 0, l = params.length; i < l; i++) {
              if(params[i].data) {
                relVal += params[i].seriesName + ' : ' + params[i].data + thats.unit + '<br>'

              }
            }
            relVal += "</div>";
            return relVal;
          },
        },
        grid: {
          top: '10%',
          left: that.leftng,
          right: '0%',
          bottom: '23%'
        },
        xAxis: [{
          type: 'category',
          data: this.datas.xlist,
          axisLabel: {
            interval: 0
          },
          show: true,
          // 坐标轴轴线
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1E2849'
            },
          },
          // x轴对应的竖线
          splitLine: {
            show: false,
          },
          // 坐标轴刻度
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#707488" //x轴字体颜色
            }
          }

        }],
        yAxis: [{
          // name: thats.unit ? thats.unit : '',
          axisLabel: {
            interval: 0
          },
          show: true,
          nameTextStyle: {
            color: '#707488',
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1E2849'
            },
          },
          // x轴对应的竖线
          splitLine: {
            show: false,
          },
          // 坐标轴刻度
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 2,
            textStyle: {
              color: "#707488" //x轴字体颜色
            }
          }
        },],
        series: this.series
      }, true)
    },
    // chartCarousel() {
    //   var count = 0;
    //   this.timeTicket && clearInterval(this.timeTicket);
    //   // console.log("清除定时器", count);
    //   this.timeTicket = setInterval(() => {
    //     // console.log("开启定时器", count, payDataLength);
    //     try {
    //       this.$refs.myChart.echarts.dispatchAction({
    //         type: "downplay",
    //         seriesIndex: 0
    //       });
    //       this.$refs.myChart.echarts.dispatchAction({
    //         type: "highlight",
    //         seriesIndex: 0,
    //         dataIndex: count
    //       });
    //       this.$refs.myChart.echarts.dispatchAction({
    //         type: "showTip",
    //         seriesIndex: 0,
    //         dataIndex: count
    //       });
    //     } catch(error) {
    //       // console.log(error);
    //     }
    //     let DataLength = this.datas.xlist.length;
    //     if(count + 1 >= DataLength) {
    //       count = 0;
    //     } else count++;
    //   }, 2000);
    // },
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped >
.tittop {
  display: flex;
  color: #fff;
  justify-content: space-between;
  width: 90%;
  margin: 10px auto 0 auto;
}
.coll {
  color: #27f5ff !important;
}
</style>