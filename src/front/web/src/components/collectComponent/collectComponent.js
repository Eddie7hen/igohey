import http from '../../utils/requestAjax';
const state = {
    collectList:[],
    loading:false
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
            this.dispatch('createDialog', {
                iCon: 'iconfont icon-success_fill',
                content: '删除收藏成功!',
            })
        } else {
            this.dispatch('createDialog', {
                iCon: 'iconfont icon-delete',
                content: '删除失败,请重试!',
            })

        }
       
    }
}

const actions = {
    viewCollect(event, params){
        state.loading = true;
        http.post(params).then(res =>{
            state.loading = false;
            event.commit('viewCollect', res.data);
        })
    },
    delCollect(event,params){
        state.loading = true;
        http.post(params).then(res =>{
            state.loading = false;
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