/* 
* @Author: Marte
* @Date:   2017-12-17 14:46:08
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-06 21:26:50
*/
import Vue from 'vue';
import Vuex from 'vuex';
import classifyChild from '../components/classifyMain/classifyMain';
import mycenter from '../components/mycenter/mycenter.vue';
import shoppingCart from '../components/shoppingCart/shoppingCartComponent';
import orders from '../components/orderComponent/orderComponent';
import address from '../components/addressComponent/addressComponent';
import cretAdres from '../components/addressComponent/createAddressComponent/createAddressComponent';
import collect from '../components/collectComponent/collectComponent.js';
import details from '../components/details_p/details.js';
import indexMain from '../components/indexMain/indexMain.js';
import activity from '../components/activity_p/activity.js';
import dialog from '../components/dialogComponent/dialog';
import viewHistory from '../components/historyComponent/history';
import paied from '../components/paiedComponent/paiedComponent';
import setting from '../components/settingComponent/setting';
import search from '../components/searchComponent/search';
import register from '../components/register/register';
import login from '../components/login/login';
import footComponent from '../components/commonHtml/commonFoot/commonFoot';
import repertoire from '../components/repertoire/repertoireComponent';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        mycenter,
        classifyChild,
        shoppingCart,
        orders,
        details,
        indexMain,
        activity,
        address,
        cretAdres,
        collect,
        dialog,
        viewHistory,
        paied,
        setting,
        search,
        register,
        login,
        footComponent,
        repertoire
    }
})