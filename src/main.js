// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)
// VueLazyLoad 初始化
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

// APP调用javascript
function javaCallJs () {
  alert('Android 调用的JS函数')
}

function javaCallJsWithArgs (arg) {
  alert(`Android 调用的JS函数，参数是${arg}`)
}

// 方法暴露到window环境
window.javacalljs = javaCallJs
window.javacalljswithargs = javaCallJsWithArgs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
