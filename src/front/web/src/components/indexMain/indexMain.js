import http from '../../utils/requestAjax.js';

const state = {
    dataNew: [],//新品区ajax请求返回的结果
    dataDiscount: [],//折扣区ajax请求返回的结果
    dataHot: [],//热门区ajax请求返回的结果
    loading: false
}

const mutations = {
    initdata: function(arg1,params,arg2){
        http.post({url:'indexMain.php',params:params}).then(res => {
            if(res.data){
                state.loading = false;
                state.dataNew = res.data.data1;
                state.dataDiscount = res.data.data2;
                state.dataHot = res.data.data3;
            }
        })
    }
}

const actions = {
    initData: function(context,params){
        state.loading = true;
        context.commit('initdata',params);
    }
}


export default {
    state,
    mutations,
    actions
}