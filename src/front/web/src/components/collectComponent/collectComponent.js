import http from '../../utils/requestAjax';
const state = {
    collectList:[],
    loading:true
}

const mutations = {
    viewCollect(data,res){
        if(res != "fail"){
            state.collectList = res.map((item)=>{
                item.select = false;
                return item;
            })
        }
    },
    delCollect(data, res){
        if (res != "fail"){
            let goods = res.params.goodsid.split(',')
            for (var i = 0; i < goods.length;i++){
                for (var j = 0; j < state.collectList.length;j++){
                    if (state.collectList[j].goodsid == goods[i]){
                        state.collectList.splice(j,1);
                    }
                }
            }
        }else{

        }
       
    }
}

const actions = {
    viewCollect(event, params){
        http.post(params).then(res =>{
            state.loading = false;
            event.commit('viewCollect', res.data);
        })
    },
    delCollect(event,params){
        http.post(params).then(res =>{
            if (res.data == "ok") {
                event.commit('delCollect',params);
            }else{
                event.commit('delCollect','fail')
            }
        })
    }
}
export default {
    state,
    mutations,
    actions
}