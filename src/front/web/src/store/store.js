/* 
* @Author: Marte
* @Date:   2017-12-17 14:46:08
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-30 13:49:24
*/
import Vue from 'vue';
import Vuex from 'vuex';
import mycenter from '../components/mycenter/mycenter';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        mycenter
    }
})