import http from '../../utils/requestAjax.js';

const state = {
    dataDetails:{},
    collect:[],
    cart:[],
    loading: true
}

const mutations = {
    initdata: function(arg1,params,arg2){
        http.post({url:'details_p.php',params:params}).then(res => {
            if(res.data){
                state.dataDetails = res.data.data1[0];
                state.collect = res.data.data2;
                state.cart = res.data.data3;
            }
        })
    },
    increase: function(arg1,params,arg2){
        params['type'] = 'get';
        http.post({url:'viewHistory.php',params:params}).then(res => {
                state.loading = false;
        })
    }
}

const actions = {
    detailsData: function(context,params){
        state.loading = true;
        context.commit('initdata',params);
        context.commit('increase',params);
    }
}


export default {
    state,
    mutations,
    actions
}