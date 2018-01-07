/* 
* @Author: Marte
* @Date:   2017-12-17 10:44:41
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-17 16:19:53
*/

const state = {
    limit:0,
    routeList: ['index','classify','cart','mycenter']
}
const mutations = {
    leaveThis(data,params){
        state.limit = params.iCur;
        params.route.push({name:state.routeList[state.limit],params:state.limit}); 
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