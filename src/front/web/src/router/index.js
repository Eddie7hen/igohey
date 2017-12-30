import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mycenter from '../components/mycenter/mycenter.vue';
<<<<<<< HEAD
=======
import commonHead from '../components/commonHtml/commonHead/commonHead.vue';
// import VueTouch from 'vue-touch';
>>>>>>> 24f6a5080dc7ce56116a768e666480ebd8faa361
Vue.use(VueRouter);
Vue.use(ElementUI);
// Vue.use(VueTouch, {name: 'vue-touch'})

import indexMainComponent from '../components/indexMain/indexMain.vue'
let router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
<<<<<<< HEAD
            name:'mycenter',
            component: mycenter
=======
            name:'indexMain',
            component:indexMainComponent
>>>>>>> 24f6a5080dc7ce56116a768e666480ebd8faa361
        }
    ]
})
export default router;