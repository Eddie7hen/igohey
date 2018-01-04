import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import mycenter from '../components/mycenter/mycenter.vue';
import commonHead from '../components/commonHtml/commonHead/commonHead.vue';
// import VueTouch from 'vue-touch';
import ShoppingCartComponent from '../components/shoppingCart/shoppingCartComponent.vue';
// import VueTouch from 'vue-touch';
import order from '../components/orderComponent/orderComponent.vue';
import collect from '../components/collectComponent/collectComponent.vue';
import history from '../components/historyComponent/historyComponent.vue';
Vue.use(VueRouter);
Vue.use(ElementUI);

import indexMainComponent from '../components/indexMain/indexMain.vue'
import classifyComponent from '../components/classifyMain/classifyMain.vue'
import detailsComponent from '../components/details_p/details.vue'
let router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: 'history',
            component: history
        },
        {
            path: '/collect',
            name: 'collect',
            component: collect
        },
        {
            path:'/mycenter',
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