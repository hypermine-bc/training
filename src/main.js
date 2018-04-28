import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import  getWeb3  from '@/utils/web3/getWeb3' // 验权

getWeb3
  .then(results => {
    console.log('Web3 initialize in store')
  })
  .catch((err) => {
    console.log('Error in web3 initialization. Err = '+ err)
  })

import '@/icons' // icon
import '@/permission' // permission control



Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
