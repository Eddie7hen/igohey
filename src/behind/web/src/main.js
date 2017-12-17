import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入公共样式表
import './scss/base.scss'

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
