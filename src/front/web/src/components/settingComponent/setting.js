import http from '../../utils/requestAjax';
const state = {
    userData:{},
    wxData:[]
}

const mutations = {
    saveData(data,res){
        if (res !== "fail") {
            let params = res.params;
            delete params.type;
            state.userData = Object.assign(state.userData, params);
            this.dispatch('createDialog', {
                iCon: 'iconfont icon-success_fill',
                content: '保存成功!',
            })
        }else{
            this.dispatch('createDialog', {
                iCon: 'iconfont icon-delete',
                content: '保存失败,请重试!',
            })
        }
    },
    getUser(data,res){
        state.userData = res[0];
    }
}

const actions = {
    saveData(event,data){
        http.post(data).then(res =>{
            if(res.data == "ok"){
                event.commit('saveData', data)
            }else{
                event.commit('saveData', 'fail');
            }
        })
    },
    getUser(event,data){
        http.post(data).then(res => {
            if (res) {
                event.commit('getUser', res.data)
            }
        })
    }
}

export default {
    state,
    mutations,
    actions
}