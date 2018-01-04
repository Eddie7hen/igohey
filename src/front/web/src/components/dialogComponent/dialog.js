const state = {
    show:false,
    dialogCont : {
        iCon:'',
        content:'',
        btnEvent:{}
    }

}
const mutations = {
    createDialog(data,opt){
        state.show = true; 
        state.dialogCont = opt;
        if (!state.dialogCont.btnEvent){
            setTimeout(()=>{
                mutations.autoClose(data);
            },3000)
        }
    },
    autoClose(data){
        state.show = false;
    }
}

const actions = {
    createDialog(event,opt){
        event.commit('createDialog',opt);
    },
    autoClose(event){
        event.commit('autoClose');
    }
}

export default {
    state,
    mutations,
    actions
}