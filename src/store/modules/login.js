import { getSen, setSen } from 'utils'
// import Vue from 'vue'
import { getLanguage } from './../../tran/index.js'
// const state = {
//   language: getLanguage()
// }

const state = {
  flag: true,
  token: '' || getSen('token'),
  stationCode: '' || getSen('stationCode'),
  stationCode2: '' || getSen('stationCode2'),
  stationInfo: '' || getSen('stationInfo'),
  accountNameCn: '' || getSen('accountNameCn'),//登陆数据
  mapCode: '' || getSen('mapCode'),
  readCount: '' || getSen('readCount'),//读数
  entrance: '' || getSen('entrance'),//入口
  isDomainCode: '' || getSen('isDomainCode'),//入口
  language: getLanguage(),
  customizeStationList: '' || getSen('customizeStationList'),//入口
  customizeTopList: '' || getSen('customizeTopList'),//入口
  singlenum: '' || getSen('singlenum'),//入口
  cancelTokenArr: [] // 存储cancel token
}

const getters = {
  getToken: state => state.token,
  getStationCode: state => state.stationCode,
  getStationCode2: state => state.stationCode2,
  getStationInfo: state => state.stationInfo,
  getAccountNameCn: state => state.accountNameCn,
  getMapCode: state => state.mapCode,
  getReadCount: state => state.readCount,
  getEntrance: state => state.entrance,
  getIsDomainCode: state => state.isDomainCode,
  getLanguage: state => state.language,

  getCustomizeStationList: state => state.customizeStationList,
  getCustomizeTopList: state => state.customizeTopList,
  getSinglenum: state => state.singlenum,

}

const mutations = {
  setFlag(state, data) {
    state.flag = data;
  },
  setToken(state, data) {
    state.token = data;
    setSen('token', state.token);
  },
  setStationCode(state, data) {
    state.stationCode = data;
    setSen('stationCode', state.stationCode);
  },
  setStationCode2(state, data) {
    state.stationCode2 = data;
    setSen('stationCode2', state.stationCode2);
  },
  setStationInfo(state, data) {
    state.stationInfo = data;
    setSen('stationInfo', state.stationInfo);
  },
  setAccountNameCn(state, data) {
    state.accountNameCn = data;
    setSen('accountNameCn', state.accountNameCn);
  },
  setMapCode(state, data) {
    state.mapCode = data;
    setSen('mapCode', state.mapCode);
  },
  setReadCount(state, data) {
    state.readCount = data;
    setSen('readCount', state.readCount);
  },
  setEntrance(state, data) {
    state.entrance = data;
    setSen('entrance', state.entrance);
  },
  setIsDomainCode(state, data) {
    state.isDomainCode = data;
    setSen('isDomainCode', state.isDomainCode);
  },

  setLanguage: (state, language) => {
    state.language = language
    setSen('language', state.language);
    // Cookies.set('language', language)
  },
  setCustomizeStationList(state, data) {
    state.customizeStationList = data;
    setSen('customizeStationList', state.customizeStationList);
  },
  setCustomizeTopList(state, data) {
    state.customizeTopList = data;
    setSen('customizeTopList', state.customizeTopList);
  },
  setSinglenum(state, data) {
    state.singlenum = data;
    setSen('singlenum', state.singlenum);
  },
  addCancelToken({ cancelTokenArr }, data) {
    cancelTokenArr.push(data)
  },
  clearCancelToken(state) {
    state.cancelTokenArr.map(item => {
      item.cancel(`${item.url}---路由切换取消请求`)
    })
    state.cancelTokenArr = []
  }
}
const actions = {}


export default {
  namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
};