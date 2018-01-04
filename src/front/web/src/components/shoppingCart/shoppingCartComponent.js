import Vue from 'vue';
import http from '../../utils/requestAjax';

const state = {
    url:'EdCart.php',
    api:'EdOrder.php',
    updateRes:'',
    deleteRes:'',
    createRes:'',
    loading:true,
    dataset:[],
    adresApi:'EdAddress.php',
    adres:[],
}

const mutations = {
    count:(arg1, params, arg3)=>{
        http.post({url:state.url,params:params}).then(res=>{
            state.updateRes = res.data;
            state.loading = false;            
        })
    },
    deleteCart:(arg1, params, arg3)=>{
        http.post({url:state.url,params:params}).then(res=>{
            state.dataset = res.data;
            state.loading = false;
        })       
    },
    createOrder:(arg1, params, arg3)=>{
        http.post({url:state.api,params:params}).then(res=>{
            state.createRes = res.data;
            state.loading = false;            
        })
    },
    getData:(arg1, params, arg3)=>{
        http.post({url:state.url,params:params}).then(res=>{
            if(res.status == '200' || res.data.length > 0){
                state.dataset = res.data;
                state.loading = false;
            }
        })
    },
    getAdres:(arg1, params, arg3)=>{
        http.post({url: state.adresApi, params: params}).then(res=>{
            if(res.status == '200' && res.data.length > 0){
                state.adres = res.data;
            }
        })
    }
}

const actions = {
    count:(store, params)=>{
        store.commit('count', params);
        state.loading = true;
    },
    deleteCart:(store, params)=>{
        store.commit('deleteCart', params);
        state.loading = true;
    },
    createOrder:(store, params)=>{
        store.commit('createOrder', params);
        state.loading = true;
    },
    getData:(store, params)=>{
        store.commit('getData', params);
        state.loading = true;
    },
    getAdres:(store, params)=>{
        store.commit('getAdres', params);
    }
}

export default {
    state,
    mutations,
    actions
}