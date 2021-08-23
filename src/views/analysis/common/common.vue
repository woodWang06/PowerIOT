<template>
  <div class="ymdBox radioButtonS">
    <!-- <el-date-picker class="m-l" v-if="tabPosition=='3'" size="small" v-model="value3" type="year" placeholder="选择年"> -->
    <el-date-picker v-if="timeObj.tabPosition=='1'" class="m-l" v-model="timeObj.value1" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :clearable='false'>
    </el-date-picker>
    <el-date-picker v-if="timeObj.tabPosition=='2'" class="m-l" v-model="timeObj.value2" type="month" value-format="yyyy-MM" placeholder="选择月" :clearable='false'>
    </el-date-picker>
    <el-date-picker v-if="timeObj.tabPosition=='3'" class="m-l" v-model="timeObj.value3" type="year" value-format="yyyy" placeholder="选择年" :clearable='false'>
    </el-date-picker>
    </el-date-picker>
    <el-radio-group v-model="timeObj.tabPosition" class="m-l">
      <el-radio-button label="1" v-if="activeName==5">日</el-radio-button>
      <el-radio-button label="2">月</el-radio-button>
      <el-radio-button label="3">年</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import { formatDate, formatMonth, formatYear } from 'utils';
import { DatePicker } from 'element-ui';
export default {
  components: {
    elDatePicker: DatePicker,

  },
  data() {
    return {
      treeData: {},
      timeObj: {
        tabPosition: '2',
        value1: '2020-09-11',
        value2: '2020-09',
        value3: '2020',
      }
    }
  },
  created() {
    if(this.activeName == '5') {
      this.timeObj.tabPosition = '1'
    } else {
      this.timeObj.tabPosition = '2'
    }
    let myDate = new Date();
    this.timeObj.value1 = formatDate(myDate);
    this.timeObj.value2 = formatMonth(myDate);
    this.timeObj.value3 = formatYear(myDate);
  },
  mounted() {
    // this.times()
  },
  props: {
    activeName: {
      type: String,
    },
  },
  methods: {
    clicks(index) {
      this.timeObj.tabPosition = index;
      this.$emit('func', index)
    },
    times() {
      var that = this;
      setInterval(function() {
        if(that.tabPosition == '1') {
          that.clicks('2')
        } else if(that.tabPosition == '2') {
          that.clicks('3')
        } else {
          that.clicks('1')
        }
      }, 5000);
    }

  },
  watch: {
    // 因为不能直接修改 props 里的属性，所以不能直接把 formData 通过v-model进行绑定
    // 在这里我们需要监听 formData，当它发生变化时，立即将值赋给 data 里的 form
    timeObj: {
      immediate: true,
      handler(val) {
        this.$emit('update:searchObj', this.timeObj)
      }
    },
  },
}
</script>

<style scoped>
.ymdBox {
  /* width: 100%; */
  /* text-align: right;
  height: 32px;
  margin-right: 25px; */
}
.m-l {
  margin-right: 10px;
  float: right;
}
</style>
