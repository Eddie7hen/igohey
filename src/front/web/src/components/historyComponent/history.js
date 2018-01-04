import http from '../../utils/requestAjax';
const state = {

}

const mutations = {
    getViewData(){
        
    }
}

const actions = {
    getViewData(event,params){
        http.post(params).then(res =>{
            if(res.data[0]){
                event.commit('getViewData',res.data);
            }else{
                event.commit('getViewData', 'fail');
            }
        })
    }
}

export default {
    state,
    mutations,
    actions
}