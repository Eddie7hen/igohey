import http from '../../utils/requestAjax';

const state = {
    url:'EdAddress.php',
    dataset:[],
    loading:true,
}

const mutations = {
    getAddress:(arg1, params, arg2)=>{
        http.post({url:state.url,params:params}).then(res=>{
            if(res.status == 200 && res.data.length > 0){
                state.dataset = res.data;
                state.loading = false;
            }
        })
    }
}

const actions = {
    getAddress:(store, params)=>{
        store.commit('getAddress', params);
        state.loading = true;
    }
}

export default{
    state,
    mutations,
    actions
}