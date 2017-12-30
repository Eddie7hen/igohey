import Vue from 'vue';
import Vuex from 'vuex';

import Common from '../components/commonComponent/commonComponent.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Common,
    }
})