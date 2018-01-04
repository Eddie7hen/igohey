<template>
    <div id="dialog" v-if="this.$store.state.dialog.show">
        <div class="confirms" v-if="this.$store.state.dialog.dialogCont.btnEvent">
            <p v-text="this.$store.state.dialog.dialogCont.content"></p>
            <div>
                <span v-for="(createBtn,index) in getKeys(this.$store.state.dialog.dialogCont.btnEvent)" :key="index" @click="userevent(index)">{{createBtn}}</span>
            </div>
        </div>
        <div class="tips" v-else>
            <p>
                <i :class="this.$store.state.dialog.dialogCont.iCon"></i>
                <span v-text="this.$store.state.dialog.dialogCont.content"></span>
            </p>
        </div>
    </div>
</template>
<script>
    import './dialog.scss';
    export default {
        data(){
            return {
                
            }
        },
        methods:{
            userevent(idx){
                this.$store.dispatch('autoClose');
                let arr = Object.keys(this.$store.state.dialog.dialogCont.btnEvent);
                let event = arr.map(item=>{
                    return this.$store.state.dialog.dialogCont.btnEvent[item]['event'];
                })
                event[idx]();
            },
            getKeys(opt){
                let arr = Object.keys(opt);
                return arr.map(item=>{
                   return opt[item]['cn'];
                })   
            }
        }
    }
</script>
