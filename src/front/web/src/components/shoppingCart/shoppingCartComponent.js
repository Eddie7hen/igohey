import Vue from 'vue';
import http from '../../utils/requestAjax';

const state = {
    url:'EdCart.php',
    api:'order.php',
    updateRes:'',
    deleteRes:'',
    createRes:'',
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
    },
    createOrder:(arg1, params, arg3)=>{
        http.post({url:state.api,params:params}).then(res=>{
            console.log(res);
            // state.createRes = res.data;
        })
    }
}

const actions = {
    count:(store, params)=>{
        store.commit('count', params);
    },
    deleteOrder:(store, params)=>{
        store.commit('deleteOrder', params);
    },
    createOrder:(store, params)=>{
        store.commit('createOrder', params);
    }
}

export default {
    state,
    mutations,
    actions
}