<template>
  <div style="width: 100%; height: calc(70vh)">
    <div class='nodata' v-if="linkss.value=='0'||linkss.value=='0.00'">暂无数据</div>
    <div v-else style="width: 100%; height: 100%" ref="factor"></div>
  </div>
</template>
<script>
export default {
  components: {
    // VeSankey,
  },
  props: {
    linkss: {
      type: Object,
    },
    datess: {
      type: Array,
    },
    activeName: {
      type: String,
    },
    activeNameName: {
      type: String,
    }
  },
  data() {
    // this.chartSettings = {
    //   roseType: 'radius',
    //   links: this.links,
    // }
    return {
      modal: {
        data: [],
        links: []
      },
      color: [
        ['rgba(255, 216, 131, 1)', 'rgba(255, 144, 45, 1)'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['#9F9BFF', '#816BFF'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['rgba(255, 216, 131, 1)', 'rgba(255, 144, 45, 1)'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['#9F9BFF', '#816BFF'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['rgba(255, 216, 131, 1)', 'rgba(255, 144, 45, 1)'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['#9F9BFF', '#816BFF'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['rgba(255, 216, 131, 1)', 'rgba(255, 144, 45, 1)'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['#9F9BFF', '#816BFF'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['rgba(255, 216, 131, 1)', 'rgba(255, 144, 45, 1)'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['#9F9BFF', '#816BFF'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['rgba(255, 216, 131, 1)', 'rgba(255, 144, 45, 1)'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        ['#9F9BFF', '#816BFF'],
        ['rgba(151, 237, 230, 1)', 'rgba(94, 214, 200, 1)'],
        ['rgba(95, 151, 250, 1)', 'rgba(39, 109, 244, 1)'],
        ['rgba(255, 161, 131, 1)', 'rgba(255, 61, 45, 1)'],
        // '#409eff', '#6abe83', '#ffc952', '#f07810', '#c50d66', '#a696c8', '#a39391', '#990033', '#5430ff',
      ],
    }
  },
  created() {
    console.log('11111111111111111111111')
    console.log(this.linkss)
    // this.chartData.rows = this.datess
    this.modal.data = [];
    // this.option.series.data = this.datess;
    this.modal.data.push({      ...this.linkss, itemStyle: {
        color:
        {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#9F9BFF' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#816BFF' // 100% 处的颜色
          }],
        },

      },    });
    this.datess.forEach((val, i) => {
      this.modal.data.push({
        ...val,
        itemStyle: {
          color:
          {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: this.color[i][0] // 0% 处的颜色
            }, {
              offset: 1,
              color: this.color[i][1] // 100% 处的颜色
            }],
          },
        },
      })
      this.modal.links.push({
        source: this.linkss.name,
        target: val.name,
        value: val.value,
        lineStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: this.color[i][0] // 0% 处的颜色
            }, {
              offset: 1,
              color: this.color[i][1] // 100% 处的颜色
            }],
          },
          opacity: 0.3
        }
      })
    });
  },
  mounted() {
    console.log(this.$echarts)
    this.inits()
  },
  computed: {
  },
  methods: {
    download(name) {
      // 通过ref找到其下级的canvas
      // const charts = this.$refs.charts.getElementsByTagName('canvas')
      // 通过ID找到其下级的canvas
      const charts = this.$refs.factor.getElementsByTagName('canvas')
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
    inits() {
      let myechart = this.$echarts.init(this.$refs.factor) //初始化一个echarts      
      let that = this;
      myechart.setOption({
        title: {
          text: that.activeNameName,
          left: 'center',
        },
        backgroundColor: "#fff",
        series: {
          type: 'sankey',
          layout: 'none',
          data: this.modal.data,
          links: this.modal.links,
          itemStyle: {
            normal: {
              borderWidth: 0,
              borderColor: '#fff'
            }
          },
        },
        itemStyle: {
          normal: {
            borderWidth: 0,
            borderColor: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        grid: {
          right: 60,
        },
        formatter: function(params) {
          return params.name + '：' + params.value + "kW·h";
        },
        lineStyle: {
          normal: {
            curveness: 0.5,
            color: 'source',
          }
        },
      })  //setOption 用this.option中的数据开始作图
    }
  },
  watch: {
    datess: {
      handler(val) {
      },
      immediate: true,
      deep: true
    },
  }

}
</script>
<style lang="less" scoped>
.nodata {
  padding: 150px;
  text-align: center;
  font-size: 2rem;
  color: #999;
}
</style>