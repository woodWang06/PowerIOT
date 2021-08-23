import { mapGetters } from 'vuex';
import http from 'http';
import api from 'api';
import { formatDate, formatMonth, formatYear } from 'utils';
export default {
  data() {
    return {
      typeList: [],//搜索条件
      typeObj: {},
      timeId: '',
      objImage: {},
      imageDioag: false
    }
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    this.queryRepairTypeList()
  },
  methods: {
    queryRepairTypeList() {
      http(api.queryRepairTypeList).then(res => {
        this.typeList = res;
        res.forEach(element => {
          this.typeObj[element.dictKey] = element.dictValue
        });
      });
    },
    base(dataurl, index) {
      let filename = '附件' + (index + 1);
      // let dataurl = this.faultObj.repairFileList[0].fileContent;
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while(n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })

    },
    lookimag(item) {
      this.objImage = item;
      this.imageDioag = true;
    },
    fatherMethod2() {
      this.imageDioag = false;
    },
    // downimag() {
    //   this.objImage = item;
    //   this.imageDioag = true;
    // },

    downimag(item) {
      var alink = document.createElement("a");
      alink.href = item.fileContent;
      alink.download = "附件"; //图片名
      alink.click();
    },
    GetDateDiff(starttime, endtime) {
      if(starttime == null || endtime == null) {
        return "";
      }
      var ed = endtime;
      var sd = starttime;
      //此处是解决浏览器兼容性问题，Firefox只能认识2015/06/05格式
      var sd2 = sd;
      var ed2 = ed;
      var startTime = new Date(sd2);
      var endTime = new Date(ed2);
      var result = "";

      var date3 = endTime.getTime() - startTime.getTime(); //时间差的毫秒数 

      //计算出相差天数
      var days = Math.floor(date3 / (24 * 3600 * 1000));

      result += days > 0 ? days + "天" : "0天";
      //计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000);     //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000));

      result += hours > 0 ? hours + "小时" : "0小时";

      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000));

      result += minutes > 0 ? minutes + "分钟" : "0分钟";
      //计算相差秒数
      // var leave3=leave2%(60*1000);          //计算分钟数后剩余的毫秒数
      // var seconds=Math.round(leave3/1000);
      // 
      // result += seconds > 0 ? seconds + "秒" : "";  
      // debugger;
      return result == "" ? "" : result;
    },
  }
}