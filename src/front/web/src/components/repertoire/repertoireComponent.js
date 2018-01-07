import http from '../../utils/requestAjax.js';

const state = {
    dataset: [],
    loading: false
}

const mutations = {
    initRep: function(arg1,params,arg2){
        http.post({url:'repertoire_p.php',params:params}).then(res => {
            if(res.data){
                state.loading = false;
                state.dataset = res.data;
            }
        })
    }
}

const actions = {
    initRep: function(context,params){
        state.loading = true;
        context.commit('initRep',params);
    }
}


export default {
    state,
    mutations,
    actions
}