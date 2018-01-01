import http from '../../utils/requestAjax.js';

const state = {
    dataset: []
}

const mutations = {
    increment: function(arg1,params,arg2){
       http.post({url:'classify_p.php',params:params}).then(res => {
            state.dataset = res.data;
        })
    }
}

const actions = {
    increment: function(context,params){
        context.commit('increment',params);
    }
}


export default {
    state,
    mutations,
    actions
}