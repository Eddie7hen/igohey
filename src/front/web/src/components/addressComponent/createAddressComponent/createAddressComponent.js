import http from '../../../utils/requestAjax';

const state = {
    toolBar:[],
    opt:{
        nickname:'',
        phone:'',
        address:'',
        status: '0'
    }
}

const mutations = {
    plusAdres:(arg1, toolBar, arg2)=>{
        state.toolBar = toolBar;
    },
    createAdres:(arg1, params, arg2)=>{
        console.log(state);
    },
    changeNickname:(arg1, _nickname, arg2)=>{
        state.opt.nickname = _nickname;
    },
    changePhone:(arg1, _phone, arg2)=>{
        state.opt.phone = _phone;
    },
    changeAdres:(arg1, _address, arg2)=>{
        state.opt.address = _address;
    }

}

const actions = {
    plusAdres:(store, toolBar)=>{
        store.commit('plusAdres', toolBar)
    },
    createAdres:(store, params)=>{
        store.commit('createAdres', params)
    },
    changeNickname:(store, _nickname)=>{
        store.commit('changeNickname', _nickname)
    },
    changePhone:(store, _phone)=>{
        store.commit('changePhone', _phone)
    },
    changeAdres:(store, _address)=>{
        store.commit('changeAdres', _address)
    }
    
}

export default{
    state,
    mutations,
    actions
}