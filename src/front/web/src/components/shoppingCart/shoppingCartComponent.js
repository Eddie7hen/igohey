import Vue from 'vue';
import http from '../../utils/requestAjax';

const state = {
    url:'EdCart.php',
    res:'',
}

const mutations = {
    count:(arg1, params, arg3)=>{
        http.post({url:state.url,params:params}).then(res=>{
            console.log(res);
        })
    }
}

const actions = {
    count:(store, params)=>{
        store.commit('count', params);
    },
}

export default {
    state,
    mutations,
    actions
}