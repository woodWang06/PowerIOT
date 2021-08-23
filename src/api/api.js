// import twiceApi from './twiceApi';
import newTwiceApi from './newTwiceApi'
// import infoStation from 'infoStation';
let api = {
  // ...twiceApi,
  ...newTwiceApi,

};
//生产环境判断  development
const baseUrl = window.IPConfig;
if(process.env.NODE_ENV === 'production') {
  Object.keys(api).forEach(item => {
    api[item].url = baseUrl + '/' + api[item].url;
  })
} else {
  Object.keys(api).forEach(item => {
    api[item].url = baseUrl + '/' + api[item].url;
  })
}
export default api;