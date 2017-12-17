import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mycenter from '../components/mycenter/mycenter.vue';
import commonHead from '../components/commonHtml/commonHead/commonHead.vue';
Vue.use(VueRouter);
Vue.use(ElementUI);
let router = new VueRouter({
    routes:[
        {
            path:'/',
            name:'commonHead',
            component:commonHead
        }
    ]
})
export default router;