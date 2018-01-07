import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import mycenter from '../components/mycenter/mycenter.vue';
import commonHead from '../components/commonHtml/commonHead/commonHead.vue';
// import VueTouch from 'vue-touch';
import ShoppingCartComponent from '../components/shoppingCart/shoppingCartComponent.vue';
import AddressComponent from '../components/addressComponent/addressComponent.vue';
import CreateAddressComponent from '../components/addressComponent/createAddressComponent/createAddressComponent.vue';
// import VueTouch from 'vue-touch';
import order from '../components/orderComponent/orderComponent.vue';
import collect from '../components/collectComponent/collectComponent.vue';
import history from '../components/historyComponent/historyComponent.vue';
Vue.use(VueRouter);
Vue.use(ElementUI);
import login from '../components/login/login.vue';
import register from '../components/register/register.vue';
import indexMainComponent from '../components/indexMain/indexMain.vue';
import classifyComponent from '../components/classifyMain/classifyMain.vue';
import detailsComponent from '../components/details_p/details.vue';
import setting from '../components/settingComponent/settingComponent.vue';
import search from '../components/searchComponent/search.vue';
import searchlist from '../components/searchComponent/searchlist/searchlist.vue';
import historysearch from '../components/searchComponent/keyHistory/history.vue';
import activityComponent from '../components/activity_p/activity.vue';
import repertoireComponent from '../components/repertoire/repertoireComponent.vue';
let router = new VueRouter({
    routes:[
        {
            path: '/search',
            name: 'search',
            component: search,
            children:[{
                path: '/searchlist',
                name: 'searchlist',
                component: searchlist
            },
            {
                path: '/historysearch',
                name: 'historysearch',
                component: historysearch
            }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path:'/login',
            name:'login',
            component: login  
        },
        {
            path: '/setting',
            name: 'setting',
            component: setting
        },
        {
            path: '/history',
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
            path:'/',
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
            name:'cart',
            component: ShoppingCartComponent
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path:'/activity',
            name:'activity',
            component: activityComponent
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
        },
        {
            path: '/repertoire',
            name: 'repertoire',
            component: repertoireComponent
        }
    ]
})
export default router;