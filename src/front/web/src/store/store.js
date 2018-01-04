/* 
* @Author: Marte
* @Date:   2017-12-17 14:46:08
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-04 19:57:12
*/
import Vue from 'vue';
import Vuex from 'vuex';
import classifyChild from '../components/classifyMain/classifyMain';
import mycenter from '../components/mycenter/mycenter.vue';
import shoppingCart from '../components/shoppingCart/shoppingCartComponent';
import orders from '../components/orderComponent/orderComponent';
import collect from '../components/collectComponent/collectComponent.js';
import details from '../components/details_p/details.js';
import indexMain from '../components/indexMain/indexMain.js';
import activity from '../components/activity_p/activity.js';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        mycenter,
        classifyChild,
        shoppingCart,
        orders,
        collect,
        details,
        indexMain,
        activity
    }
})