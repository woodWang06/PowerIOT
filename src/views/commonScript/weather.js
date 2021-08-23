
{/* <script src='http://pv.sohu.com/cityjson?ie=utf-8'></script> */ }
import http from 'http';
import api from 'api';
export default {
  data() {
    return {
      typeList: [],//搜索条件
      typeObj: {},
      timeId: '',
      objImage: {},
      imageDioag: false,
      cip: ''
    }
  },
  computed: {

  },
  created() {
    this.ready()
  },
  methods: {
    ready() {
      this.cip = returnCitySN["cip"];
      // console.log(cip);//cip就是本机ip地址
      this.getLocation2()
    },
    getLocation2() {
      var that = this;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://restapi.amap.com/v5/ip?ip=' + that.cip + '&type=4&key=d945e217133f6f19e985807f38cd3e05', true);
      xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if(xhr.readyState == 4) {
          if(xhr.status == 200 || xhr.status == 304) {
            that.getAcode(JSON.parse(xhr.responseText).province)
          }
        }
      }
      xhr.send();
    },
    getLocation() {
      http(api.getLocation).then(res => {
        if(res.status != 0) {
          // this.getTianQi2()
        } else {
          if(res.content.address) {
            this.getAcode(res.content.address)
          }
        }

      })
    },
    getTianQi2() {
      var that = this;
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'http://pv.sohu.com/cityjson?ie=utf-8', false);
      xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if(xhr.readyState == 4) {
          if(xhr.status == 200 || xhr.status == 304) {
            that.getTianQi(JSON.parse(xhr.responseText).geocodes[0])
          }
        }
      }
      xhr.withCredentials = false;
      xhr.setRequestHeader(
        "Access-Control-Allow-Origin", "http://pv.sohu.com/cityjson?ie=utf-8"
      )
      // xhr.setRequestHeader("withCredentials=false", "*"); // xhr.setHeader("Access-Control-Allow-Origin", 'http://pv.sohu.com/cityjson?ie=utf-8');
      // xhr.setRequestHeader('Content-Type', "Access-Control-Allow-Origin", 'application/x-www-form-urlencoded; charset-UTF-8');
      xhr.send();
    },
    getAcode(address) {
      var that = this;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://restapi.amap.com/v3/geocode/geo?address=' + address + '&key=d945e217133f6f19e985807f38cd3e05', true);
      xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if(xhr.readyState == 4) {
          if(xhr.status == 200 || xhr.status == 304) {
            that.getTianQi(JSON.parse(xhr.responseText).geocodes[0])
          }
        }
      }
      xhr.send();
    },
    getTianQi(item) {
      var that = this;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://restapi.amap.com/v3/weather/weatherInfo?city=' + item.adcode + '&key=d945e217133f6f19e985807f38cd3e05', false);
      xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if(xhr.readyState == 4) {
          if(xhr.status == 200 || xhr.status == 304) {
            that.wearther = JSON.parse(xhr.responseText).lives[0]
          }
        }
      }
      xhr.send();
    },
  }
}