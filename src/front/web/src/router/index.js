import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import mycenter from '../components/mycenter/mycenter.vue';
import commonHead from '../components/commonHtml/commonHead/commonHead.vue';
import ShoppingCartComponent from '../components/shoppingCart/shoppingCartComponent.vue';
// import VueTouch from 'vue-touch';
import order from '../components/orderComponent/orderComponent.vue';
import collect from '../components/collectComponent/collectComponent.vue';
Vue.use(VueRouter);
Vue.use(ElementUI);

import indexMainComponent from '../components/indexMain/indexMain.vue'
let router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: 'collect',
            component: collect
        },
        {
            path:'/mycenter',
            name:'mycenter',
            component: mycenter
        },
        {
            path:'/shoppingcart',
            name:'shoppingcart',
            component: ShoppingCartComponent
        },
        {
            path: '/order',
            name: 'order',
            component: order
        }
    ]
})
export default router;