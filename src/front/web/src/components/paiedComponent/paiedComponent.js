import http from '../../utils/requestAjax';

const state = {
    url:'EdOrder.php',
    dataset:[],
    loading: true,
}

const mutations = {
    getOrderNo:(arg1, params, arg3)=>{
        http.post({url: state.url, params: params}).then(res=>{
            if(res.status == '200' && res.data.length > 0){
                state.dataset = res.data;
                state.loading = false;
            }
        })
    }
}

const actions = {
    getOrderNo:(store, params)=>{
        store.commit('getOrderNo', params);
        state.loading = true;
    }
}

export default {
    state,
    mutations,
    actions
}