// lang/index.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import { getSen, setSen } from 'utils'
import { mapGetters, mapMutations } from 'vuex';
Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
export function getLanguage() {
  const chooseLanguage = getSen('language')
  if(chooseLanguage) return chooseLanguage
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for(const locale of locales) {
    if(language.indexOf(locale) > -1) {
      setSen('language', locale)
      return locale
    }
  }
  setSen('language', 'zh')
  return 'zh'
}
// const i18n = new VueI18n({
//   // set locale
//   // options: en | zh | es
//   locale: getLanguage(),
//   // set locale messages
//   messages
// })

// export default i18n