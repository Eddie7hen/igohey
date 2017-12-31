import Vue from 'vue';
import http from '../../utils/requestAjax';

const state = {
    url:'EdCart.php',
    updateRes:'',
    deleteRes:'',
}

const mutations = {
    count:(arg1, params, arg3)=>{
        http.post({url:state.url,params:params}).then(res=>{
            state.updateRes = res.data;
        })
    },
    deleteOrder:(arg1, params, arg3)=>{
        http.post({url:state.url,params:params}).then(res=>{
            state.deleteRes = res.data;
        })
    }
}

const actions = {
    count:(store, params)=>{
        store.commit('count', params);
    },
    deleteOrder:(store, params)=>{
        store.commit('deleteOrder', params);
    }
}

export default {
    state,
    mutations,
    actions
}