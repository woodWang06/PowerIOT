<template>
  <div class="echart" style="height:100%">
    <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
 
<script>
export default {
  // name: 'HelloWorld',
  props: {
    datas: {
      type: Array,
    },
  },
  data() {
    return {
      option: {},
      datas2: [],
      msg: 0
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {

  },
  watch: {
    datas: {
      handler(newValue, oldValue) {
        //父组件param对象改变会触发此函数
        this.drawLine()
      },
      deep: true
    }  },
  methods: {
    drawLine() {
      this.datas2 = [];
      this.msg = 0
      var color = ['RGBA(96, 208, 197, 1)', 'RGBA(255, 124, 72, 1)', 'RGBA(42, 121, 255, 1)', 'RGBA(255, 166, 29, 1)', 'RGBA(255, 117, 117, 1)', '#9E87FF', '#fe9a8b', '#ff3000']
      for(var i = 0; i < this.datas.length; i++) {
        this.datas2.push({
          value: this.datas[i].breakerCount,
          name: this.datas[i].breakerLargeGroupName,
          itemStyle: {
            normal: {
              shadowBlur: 20,
              // borderColor: 'RGBA(245, 246, 248, 1)',
              // borderWidth: 10,
              shadowColor: 'RGBA(200, 200, 200, 1)',
              color: color[i],
            }
          }
        });
        this.msg += Number(this.datas[i].breakerCount)
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      let that = this
      myChart.setOption({
        legend: {
          itemWidth: 17,
          itemHeight: 8,
          top: 'bottom',
          // width: '250',
          textStyle: {
            color: 'rgba(51, 70, 129, 1)',
            width: '100'
          },
          height: 15,
          showVal: true,
          // formatter: ["{a|{name}}"].join("\n"),
          formatter: function(name) {
            var index = 0;
            that.datas2.forEach(function(value, i) {
              if(value.name == name) {
                index = value.value;
              }
            });
            return '{rate|' + name + " " + '}{name|' + index + '}'
          },
        },
        textStyle: {
          // width: '80%',
          rich: {
            //这里定义a的样式
            rate: {
              width: 45
            },
            name: {
              width: 20
            }
          }
        },
        grid: {
          top: 'top',
        },
        title: {
          text: this.msg,
          top: '30%',
          textAlign: "center",
          left: '48%',
          textStyle: {
            color: '#fff',
            fontSize: 22,
            fontWeight: '400'
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.9)',
          formatter: function(params) {
            return params.marker + '<span style="color:' + params.color + '">' + params.data['name'] + '\n' + params.data['value'] + '</span>';
          }
        },
        series: [

          {
            name: '面积模式',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '35%'],
            // roseType: 'area',
            label: {
              show: false,
            },
            areaStyle: {
              shadowBlur: 20,
              // borderColor: 'RGBA(245, 246, 248, 1)',
              // borderWidth: 10,
              shadowColor: 'RGBA(222, 222, 222, 1)',
            },
            data: this.datas2
          }
        ]
      });
    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back {
  cursor: pointer;
  text-align: right;
  color: #fff;
  position: absolute;
  top: 100px;
  right: 30px;
  z-index: 10000;
}
</style>