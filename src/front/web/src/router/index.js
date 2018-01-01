import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mycenter from '../components/mycenter/mycenter.vue';
import commonHead from '../components/commonHtml/commonHead/commonHead.vue';
// import VueTouch from 'vue-touch';
Vue.use(VueRouter);
Vue.use(ElementUI);
// Vue.use(VueTouch, {name: 'vue-touch'})

import indexMainComponent from '../components/indexMain/indexMain.vue'
import classifyComponent from '../components/classifyMain/classifyMain.vue'
import detailsComponent from '../components/details_p/details.vue'
let router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            name:'mycenter',
            component: mycenter
        },
        {
            path:'/index',
            name:'index',
            component: indexMainComponent
        },
        {
            path:'/classify',
            name:'classify',
            component: classifyComponent
        },
        {
            path:'/details',
            name:'details',
            component: detailsComponent
        }
    ]
})
export default router;