import http from '../../utils/requestAjax';

const state = {
    url:'EdAddress.php',
    dataset:[],
    loading:false,
}

const mutations = {
    getAddress:(arg1, params, arg2)=>{
        http.post({url:state.url,params:params}).then(res=>{
            if(res.status == 200){
                state.dataset = res.data;
                state.loading = false;
            }
        })
    },
    chgDefaultAdres:(arg1, params, arg2)=>{
        http.post({url: state.url, params: params}).then(res=>{
            if(res.data){
                params.jumpEvent();
            }
        })
    }
}

const actions = {
    getAddress:(store, params)=>{
        store.commit('getAddress', params);
        state.loading = true;
    },
    chgDefaultAdres:(store, params)=>{
        store.commit('chgDefaultAdres', params);
    }
}

export default{
    state,
    mutations,
    actions
}