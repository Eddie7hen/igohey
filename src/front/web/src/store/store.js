/* 
* @Author: Marte
* @Date:   2017-12-17 14:46:08
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-17 14:48:21
*/
import Vue from 'vue';
import Vuex from 'vuex';
import mycenter from '../components/mycenter/mycenter.vue';
import shoppingCart from '../components/shoppingCart/shoppingCartComponent';
import orders from '../components/orderComponent/orderComponent';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        mycenter,
        shoppingCart,
        orders
    }
})