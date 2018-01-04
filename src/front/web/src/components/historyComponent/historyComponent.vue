<template>
    <div id="w_history">
        <header id="w_header">
            <i class="iconfont icon-return" @click="goBack"></i>
            <h1>历史浏览</h1>
        </header>
        <main id="w_main">
            <div class="main_cont">
                <div>
                    
                </div>
            </div>
            <p class="nothing" v-if="this.$store.state.orders.pendList.length == 0 && !this.$store.state.orders.loading">
                <i class="el-icon-tickets"></i>
                <span>你还没有浏览历史哦~</span>
            </p>
        </main>
    </div>
</template>

<script>
    import './history.scss';
    export default {
        data(){
            return {

            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            }
        },
        mounted(){
            this.$store.dispatch('getViewData',{
                url:'viewHistory.php',
                params:{
                    username:'Eds'
                }
            })
        }
    }
</script>
