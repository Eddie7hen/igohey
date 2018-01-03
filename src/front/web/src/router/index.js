import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import mycenter from '../components/mycenter/mycenter.vue';
import commonHead from '../components/commonHtml/commonHead/commonHead.vue';
import ShoppingCartComponent from '../components/shoppingCart/shoppingCartComponent.vue';
import AddressComponent from '../components/addressComponent/addressComponent.vue';
import CreateAddressComponent from '../components/addressComponent/createAddressComponent/createAddressComponent.vue';
// import VueTouch from 'vue-touch';
import order from '../components/orderComponent/orderComponent.vue';
Vue.use(VueRouter);
Vue.use(ElementUI);
// Vue.use(VueTouch, {name: 'vue-touch'})

import indexMainComponent from '../components/indexMain/indexMain.vue'
let router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
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
        },
        {
            path: '/address',
            name: 'address',
            component: AddressComponent
        },
        {
            path: '/createaddress',
            name: 'createaddress',
            component: CreateAddressComponent
        }
    ]
})
export default router;