import http from '../../../utils/requestAjax';

const state = {
    toolBar:[],
    opt:{
        nickname:'',
        phone:'',
        address:'',
        status: '0'
    },
    url:'EdCretAdres.php',
    res:'',
}

const mutations = {
    plusAdres:(arg1, toolBar, arg2)=>{
        state.toolBar = toolBar;
    },
    createAdres:(arg1, params, arg2)=>{
        params = Object.assign({}, state.opt, params)
        http.post({url:state.url,params}).then(res=>{
            if(res.data){
                state.res = res.data;
                state.toolBar[0].jumpEvent();
                var option = {
                    nickname:'',
                    phone:'',
                    address:'',
                    status: '0'
                };
                state.opt = Object.assign({}, option);
            }
        })
    },
    changeNickname:(arg1, _nickname, arg2)=>{
        state.opt.nickname = _nickname;
    },
    changePhone:(arg1, _phone, arg2)=>{
        state.opt.phone = _phone;
    },
    changeAdres:(arg1, _address, arg2)=>{
        state.opt.address = _address;
    },
    alterAdres:(arg1, toolBar, arg2)=>{
        state.toolBar = toolBar;
        var params = {
            id:toolBar[0].id,
            username:toolBar[0].username,
            type:toolBar[0].type,
        }
        http.post({url: state.url, params: params}).then(res=>{
            if(res.status == '200' && res.data.length > 0 ){
                state.opt = Object.assign({},state.opt, res.data[0]);
                state.toolBar[0].jumpChangeEvent();
            }
        })
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
    },
    alterAdres:(store, params)=>{
        store.commit('alterAdres', params)
    }
    
}

export default{
    state,
    mutations,
    actions
}