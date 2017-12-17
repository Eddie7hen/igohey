import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import rem from './utils/getRem';
import './scss/base.scss';
import './libs/iconFont/iconfont.css';

rem.rem();
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
