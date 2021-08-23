import Axios from 'axios';
import store from '../store';
import Vue from 'vue';
import router from '../router';
import { Message } from 'element-ui';

// 请求拦截器
Axios.interceptors.request.use((config) => {
  // config.withCredentials = true;
  config.cancelToken = new Axios.CancelToken(e => {
    store.commit('login/addCancelToken', {
      cancel: e,
      // url: location.host + config.url
    })
  })
  return config;
}, (error) => {
});
// 响应拦截器
Axios.interceptors.response.use((config) => {
  if(config.status === 200 && config.data.code === 200) {
    if(config.data.data === null || config.data.data === undefined) {
      return config.data.message;
    } else {
      return config.data.data
    }
    //  ? config.data.data : config.data.message;
    // return config.data.result.data;
  } else if(config.status === 200 && config.data.code === 1010) {
    return { type: 1 };
  } else if(config.status === 200 && config.data.code === 1011) {
    Message.error(config.data.message);
    router.push('/');
  } else {
    return checkoutStatus(config);
  }
}, (error => {
  if(Axios.isCancel(error)) {
    // 请求取消
  } else {
    // Message.error('服务不稳定，请稍后再试');
    return Promise.reject(error);
  }
}))
function checkoutStatus(config) {
  Message.error(config.data.message);
  return false;
}
function setParameter(url, data) {
  const methods = url.method === 'get' ? 'params' : 'data';
  let token = '';
  if(sessionStorage.getItem('token')) {
    token = sessionStorage.getItem('token')
  }
  return {
    url: url.url,
    method: url.method ? url.method : 'post',
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
      // 'Content-Type': 'application/json;charset=UTF-8',
      'content-type': url.form ? 'multipart/form-data' : 'application/json;charset=UTF-8',
      'token': token,
      // ...header
    },
    [methods]: data ? data : {},
    // withCredentials: true
  }
}
function http(url, data) {
  if(url.loding) {
    Vue.prototype.$ingAnimate.open();
  }
  return new Promise((resolve, reject) => {
    let res_ = setParameter(url, data);
    Axios(res_).then(res => {
      if(res !== false) {
        resolve(res);
        if(url.loding) {
          Vue.prototype.$ingAnimate.close();
        }
      } else {
        reject(res);
        if(url.loding) {
          Vue.prototype.$ingAnimate.close();
        }
      }
    }).catch(ret => {
      reject(ret);
    })
  })
}
export default http;
