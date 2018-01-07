import http from '../../utils/requestAjax.js';

const state = {
    dataset: [],
    loading: true
}

const mutations = {
    increment: function(arg1,params,arg2){
       http.post({url:'classify_p.php',params:params}).then(res => {
            if(res.data){
                state.loading = false;
                state.dataset = res.data;
            }
        })
    }
}

const actions = {
    increment: function(context,params){
        state.loading = true;
        context.commit('increment',params);
    }
}


export default {
    state,
    mutations,
    actions
}