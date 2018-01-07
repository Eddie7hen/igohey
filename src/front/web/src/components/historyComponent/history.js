import http from '../../utils/requestAjax';
const state = {
    historyList:[]
}

const mutations = {
    getViewData(data,res){
        state.historyList = res;
    },
    delhistory(data,res){
        let goodsid = res.params.goodsid;
        state.historyList.forEach((item,idx)=>{
            if(item.goodsid == goodsid){
                state.historyList.splice(idx,1);
            }
        })
    }
}

const actions = {
    getViewData(event,params){
        http.post(params).then(res =>{
            if(res.data!="nothing"){
                event.commit('getViewData',res.data);
            }
        })
    },
    delhistory(event,params){
        http.post(params).then(res =>{
            if(res.data == "ok"){
                event.commit('delhistory', params);
            }else{

            }
        })
    }
}
export default {
    state,
    mutations,
    actions
}