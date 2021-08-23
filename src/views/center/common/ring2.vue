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
    }
    // 因为不能直接修改 props 里的属性，所以不能直接把 formData 通过v-model进行绑定
  },
  methods: {
    drawLine() {
      this.datas2 = [];
      this.msg = 0
      var color = ['#40D3E9', '#E26FE9', '#3FE5C5', '#E39B4B', '#006ced', '#ffe000', '#ff5b00', '#ff3000']
      for(var i = 0; i < this.datas.length; i++) {
        this.datas2.push({
          value: this.datas[i].breakerCount,
          name: this.datas[i].breakerLargeGroupName,
          itemStyle: {
            normal: {
              shadowBlur: 20,
              borderColor: color[i],
              shadowColor: color[i],
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
          top: 'bottom',
          // width: '250',
          textStyle: {
            color: '#fff',
            width: '20'
          },
          height: 35,
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
            // itemStyle: {
            //   borderRadius: 8
            // },
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