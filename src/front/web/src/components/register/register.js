import http from '../../utils/requestAjax';

const state = {
    
}

const mutations = {
   
}

const actions = {
   getCode(event,params){
        http.post(params).then(res=>{
            console.log(res)
        })
   },
   testUsername(event,params){
       http.post(params).then(res => {
           console.log(res)
       })
   }

}

export default {
    state,
    mutations,
    actions
}