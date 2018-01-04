import http from '../../utils/requestAjax';
const state = {
    collectList:[],
    loading:true
}

const mutations = {
    viewCollect(data,res){
        if(res.length > 0){
            state.collectList = res.map((item)=>{
                item.select = false;
                return item;
            })
        }
    }
}

const actions = {
    viewCollect(event, params){
        http.post(params).then(res =>{
            state.loading = false;
            event.commit('viewCollect', res.data);
        })
    }
}
export default {
    state,
    mutations,
    actions
}