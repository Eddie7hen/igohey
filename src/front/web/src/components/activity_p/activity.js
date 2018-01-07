import http from '../../utils/requestAjax.js';

const state = {
    activeData: [],
    goodsData:[],
    activeCart: [],
    loading: false
}

const mutations = {
    init: function(arg1,params,arg2){
        http.post({url:'active_p.php',params:params}).then(res => {
            if(res.data){
                state.loading = false;
                state.activeData = res.data.data1;
                state.goodsData = res.data.data2;
                state.activeCart = res.data.data3;
            }
        })
    }
}

const actions = {
    initactive: function(context,params){
        state.loading = true;
        context.commit('init',params);
    }
}


export default {
    state,
    mutations,
    actions
}