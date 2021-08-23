import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/index';
import components from 'components';
import echartss from 'echarts';
import dictionaries from 'utils/conCatModel'
import { hasPermission, exportToExcel } from "./components/hasPermission/hasPermission";
import locale from "element-ui/lib/locale"
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import langZh from './tran/zh';
import langEn from './tran/en';
// import i18n from './tran' // 语言国际化方案
// 使用 CSS
import VueI18n from 'vue-i18n'
import { getSen, setSen } from 'utils'
Vue.use(VueI18n)
Vue.config.productionTip = false;
Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, v => v.toUpperCase()); //首字母大写
  Vue.component(`${name}`, components[key]);
});
Vue.prototype.hasPerm = hasPermission;
Vue.prototype.$exportToExcel = exportToExcel
Vue.prototype.options = dictionaries.options;
Vue.prototype.$echarts = echartss;
Vue.prototype.dictionaries = dictionaries.dictionaries;
Vue.prototype.permissionCodes == undefined ? Vue.prototype.permissionCodes = store.state.login.permissionCodes : Vue.prototype.permissionCodes
Vue.prototype.$imageUrls = window.IPConfig + '/cloud-api-sys/api/image/view?imageName='
const messages = {
  en: {
    ...langEn,
    ...elementEnLocale
  },
  zh: {
    ...langZh,
    ...elementZhLocale
  }
}
setSen('language', 'zh')
if(getSen('language') == 'zh') {
  locale.use(elementZhLocale);
} else {
  locale.use(elementEnLocale);
}
const i18n = new VueI18n({
  // locale: getSen('language'), // 语言标识
  locale: getSen('language'), // 语言标识
  messages
})
new Vue({
  router,
  store,
  i18n, // 挂载i18n
  render: h => h(App)
}).$mount('#app')
