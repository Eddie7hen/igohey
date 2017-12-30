/* 
* @Author: Marte
* @Date:   2017-12-17 10:44:41
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-17 16:19:53
*/

const state = {
    limit:0,
    routeList:['home','typelist','cart','mycenter']
}
const mutations = {
    leaveThis(data,params){
        // console.log(params.icur)
        data.limit = params.icur;
        params.route.push({name:data.routeList[data.limit],params:data.limit}); 
    }
}

const actions = {
    leaveIcur(event,params){
        event.commit('leaveThis',params)
    }
}
export default {
    state,
    mutations,
    actions
}