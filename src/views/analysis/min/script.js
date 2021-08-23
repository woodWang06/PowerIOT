import { mapGetters } from 'vuex';
import http from 'http';
import api from 'api';
import { formatDate, formatMonth, formatYear } from 'utils';
export default {
  data() {
    return {
      startDatepickerOptions: {
        disabledDate: (time) => {
          if(this.beginDate) {
            return time.getTime() > new Date(this.beginDate).getTime()
          } else {
            return false
          }
        }
      },
      endDatepickerOptions: {
        disabledDate: (time) => {
          if(this.endDate) {
            return time.getTime() < new Date(this.endDate).getTime()
          } else {
            return false
          }
        }
      },
      dataTree: [],
      dataTree2: [],
      dataTree3: [],
      selectList: [],
      selectList2: [],
      selectList3: []
    }
  },
  computed: {
    ...mapGetters('login', ['getStationCode']),
  },
  created() {
    this.searchObj.stationCode = this.getStationCode;
    let myDate = new Date();
    this.yearValue = formatYear(myDate);
    let myDate2 = new Date();
    this.dayValue = formatDate(myDate2);
    this.beginDate = formatDate(myDate2);
    this.endDate = formatDate(myDate2 - (8.64e7 * 20));
    this.datekeys.push(this.yearValue, String(this.yearValue - 1), String(this.yearValue - 2))

    this.getTopoWithLoopAndBreakerList();
  },
  mounted() {
    // this.times()
    this.getLoopTopoWithNotBreakerList()

  },
  methods: {
    getTopoWithLoopAndBreakerList() {
      this.dataTree = [];
      // this.mutList = [];
      // this.mutListName = [];
      http(api.getTopoWithLoopAndBreakerList, { ...this.searchObj }).then(res => {
        this.dataTree.push(res);
        this.dataTree2 = JSON.parse(JSON.stringify(this.dataTree))
        let list = JSON.parse(JSON.stringify(this.dataTree))
        this.traverseTree(this.dataTree2[0]);
        this.traverseTree2(list[0])
        this.domainCodes = this.selectList[0].domainCode;
        this.domainOBJ = this.selectList[0];
        this.domainCodes2 = this.selectList2[0].breakerCode;
        this.domainOBJ2 = this.selectList2[0];
        console.log('selectList', this.selectList)
        console.log('selectList2', this.selectList2)
        // this.other()
        this.handleClick()
      })
    },
    getLoopTopoWithNotBreakerList() {
      http(api.getLoopTopoWithNotBreakerList, { ...this.searchObj }).then(res => {
        // this.dataTree.push(res);
        this.dataTree3.push(res);
        this.traverseTree3(this.dataTree3[0])
        this.domainCodes3 = this.selectList3[0].domainCode;
        this.domainOBJ3 = this.selectList3[0];
        // this.traverseTree(this.dataTree2[0]);
      })
    },
    //设备递归循环
    traverseTree2(data) {
      if(data.children) {
        data.children.forEach(element => {
          this.traverseTree2(element)
        });
      }
      if(data.domainType == 'D5' || data.domainType == 'D6') {
        this.selectList.push(data);
      }
    },
    //设备递归循环
    traverseTree3(data) {
      if(data.children) {
        data.children.forEach(element => {
          this.traverseTree3(element)
        });
      }
      if(data.domainType == 'D5' || data.domainType == 'D6') {
        this.selectList3.push(data)
      }
    },

    //设备递归循环
    traverseTree(data) {
      if(data.children) {
        data.children.forEach(element => {
          this.traverseTree(element)
        });
      }
      if((data.domainType == 'D5' || data.domainType == 'D6') && data.breakerList && data.breakerList.length > 0) {
        data.children = []
        data.breakerList.forEach(val => {
          data.children.push({
            domainName: val.breakerName,
            breakerCode: val.breakerCode,
            disabled: false,
          });
          this.selectList2.push({
            domainName: val.breakerName,
            breakerCode: val.breakerCode,
          })
        })
      } else {
        data.disabled = true;
      }

    },
  }
}