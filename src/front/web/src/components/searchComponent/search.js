import http from '../../utils/requestAjax';

const state = {
    loading:false,
    keyWord:[],
    searchList:[]
}

const mutations = {
    addKeyWord(data,key){
        if (state.keyWord[0]) {
            let has = true;
            state.keyWord.forEach(item => {
                if (item == key) {
                    has = false;
                }
            })
            if(has){
                state.keyWord.push(key);
            }
        } else {
            state.keyWord.push(key);
        }
    },
    getKeyList(data,params){
        state.loading = false;
        state.keyWord = params;
    },
    clearKeyWord(data,res){
        if(res){
            state.keyWord = [];
        }
    },
    getSearchlist(data,res){
        state.searchList = res; 
    },
    sortList(data,res){
        state.loading = false;
        state.searchList = res;
    },
    clearList(data){
        state.searchList = [];
    }
}

const actions = {
    getKeyList(event,params){
        state.loading = true;
        http.post(params).then(res =>{
            if(res.data != "nothing"){
                event.commit('getKeyList',res.data);
            }
        })
    },
    addKeyWord(event,params){
        if (!window.sessionStorage.getItem('username')) {
            event.commit('addKeyWord',params.params.keyWord);
        }else{
            http.post(params).then(res =>{});
        }  
    },
    sortList(event,params){
        http.post(params).then(res =>{
            if(res.data[0]){
                event.commit('sortList',res.data);
            }
        })
    },
    clearKeyWord(event,params){
        http.post(params).then(res =>{
            if(res.data == 1){
                event.commit('clearKeyWord','true');
            }
        })
    },
    getSearchlist(event,params){
        state.loading = true;
        http.post(params).then(res => {
            state.loading = false;
            if (res.data != "nothing"){
                event.commit('getSearchlist',res.data);
            }else{
                state.searchList = [];
            }
        })
    },
    clearList(event){
        event.commit('clearList');
    }

}

export default {
    state,
    mutations,
    actions
}