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
      // colorList: [
      //   ['rgba(38,201,229,0.2)', 'rgba(38,201,229,1)'],
      //   ['rgba(227,117,27,0.2)', 'rgba(227,117,27,1)'],
      // ],
      series: []
    }
  },
  mounted() {
    this.drawLine();
    // this.chartCarousel()
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
    colorList: {
      type: Array,
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
    // 在这里我们需要监听 formData，当它发生变化时，立即将值赋给 data 里的 form
    // datas: {

    //   // immediate: true,
    //   deep: true,
    //   handler(val) {
    //     let obj = {};
    //     let arr = [];
    //     arr = this.datas.xList
    //     arr.forEach((element, index) => {
    //       obj = {
    //         week: element,
    //         ylist: this.datas.yList[index],
    //         tlist: this.datas.tList[index],
    //       }
    //       this.chartData.rows.push(obj)
    //     });
    //   }
    // },
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
            smooth: true,
            showSymbol: false,
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
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      let that = this;

      myChart.setOption({
        legend: {
          itemGap: 50,
          show: true,
          bottom: 0,
          icon: 'roundRect',
          itemWidth: 17,
          itemHeight: 8,
          textStyle: {
            color: "#334681",//图例字体颜色
            width: 100
          },
          itemStyle: {
            borderRadius: 10,
            width: 20,
          },
          itemBorderRadius: 10,
          backgroundColor: 'transparent'
        },
        tooltip: {
          trigger: 'axis',
          extraCssText: 'z-index:1000; padding:5px 15px',
          textStyle: {
            fontSize: 12,
            color: '#334681',
          },
          axisPointer: {
            lineStyle: {
              color: '#334681',
            },
          },
          position: function(point, params, dom, rect, size) {
            // 固定在顶部
            return [point[0] + 10, 0];
          },
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderColor: '#387DFF',
          borderWidth: 1,
          formatter: function(params) {
            var relVal = `<div style='text-align:left; position: relative;'>`;
            for(var i = 0, l = params.length; i < l; i++) {
              if(params[i].data) {
                relVal += "<span style='display: inline-block; width: 5px; height:5px;margin-right:5px; border-radius: 5px;background-color: " + params[i].color + ";'></span>" + params[i].seriesName + ' : ' + params[i].data + thats.unit + '<br>'
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
          bottom: '25%'
        },
        xAxis: [{
          // type: 'category',
          type: 'category',

          data: this.datas.xlist,
          show: true,
          // 坐标轴轴线
          axisLine: {
            show: true,
            lineStyle: {
              color: '#EAEBF0'
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
              color: "#AFB6CD" //x轴字体颜色
            }
          }

        }],
        yAxis: [{
          // type: 'value',
          // name: thats.unit ? thats.unit : '',
          show: true,
          // position: 'left', minInterval: 1,
          // min: 0,
          // minInterval: 1,
          // 坐标轴轴线
          nameTextStyle: {
            color: '#EAEBF0',
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#EAEBF0'
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
              color: "#AFB6CD" //x轴字体颜色
            }
          }
        },],

        series: this.series
      })
    },
    chartCarousel() {
      var count = 0;
      this.timeTicket && clearInterval(this.timeTicket);
      // console.log("清除定时器", count);
      this.timeTicket = setInterval(() => {
        // console.log("开启定时器", count, payDataLength);
        try {
          this.$refs.myChart.echarts.dispatchAction({
            type: "downplay",
            seriesIndex: 0
          });
          this.$refs.myChart.echarts.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: count
          });
          this.$refs.myChart.echarts.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: count
          });
        } catch(error) {
          // console.log(error);
        }
        let DataLength = this.datas.xlist.length;
        if(count + 1 >= DataLength) {
          count = 0;
        } else count++;
      }, 2000);
    },
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