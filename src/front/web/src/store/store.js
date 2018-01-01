/* 
* @Author: Marte
* @Date:   2017-12-17 14:46:08
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-01 15:04:50
*/
import Vue from 'vue';
import Vuex from 'vuex';
import mycenter from '../components/mycenter/mycenter';
import classifyChild from '../components/classifyMain/classifyMain';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        mycenter,
        classifyChild
    }
})