<template>
    <div id="w_history">
        <header id="w_header">
            <i class="iconfont icon-return" @click="goBack"></i>
            <h1>历史浏览</h1>
        </header>
        <main id="w_main">
            <div class="main_cont">
                <div v-for="(item) in this.$store.state.viewHistory.historyList" :key="item.id">
                    <img :src="item.imgurl" :alt="item.name" :title="item.name" @click="goDetails(item.id)" />
                    <p @click="goDetails(item.id)">
                        <span v-text="item.details"></span>
                        <span>应季价:<em>￥{{item.saleprice ? item.saleprice : item.price}}</em></span>
                        <span>累计销量: {{item.saleqty}}件</span>
                    </p>
                    <p>
                        <i class="iconfont icon-empty" @click="delhistory(item.goodsid)"></i>
                    </p>
                </div>
            </div>
            <p class="nothing" v-if="!this.$store.state.viewHistory.historyList[0]">
                <i class="el-icon-tickets"></i>
                <span>你还没有浏览历史哦~</span>
            </p>
        </main>
        <DialogComponent></DialogComponent>
    </div>
</template>

<script>
    import './history.scss';
    import DialogComponent from '../dialogComponent/dialogComponent.vue';
    export default {
        data(){
            return {

            }
        },
        components:{
            DialogComponent
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            delhistory(goodsid){
                let opt = {
                    content:'你确定要删除该记录吗?',
                    btnEvent:{
                        cancel:{
                            cn:'取消',
                            event:()=>{
                                this.$store.dispatch('autoClose');
                            }
                        },
                        enter:{
                            cn:'确定',
                            event:()=>{
                                this.$store.dispatch('delhistory',{
                                                        url:'viewHistory.php',
                                                        params:{type:'del',
                                                        username:this.user,
                                                        goodsid:goodsid
                                                    }}
                                )
                            }   
                        }        
                    }
                } 
                this.$store.dispatch('createDialog',opt);
            },
            goDetails(goodsid){
                this.$router.push({
                    name:'details',
                    query:{
                        goodsid
                    }
                })
            }
        },
        mounted(){
            if(window.sessionStorage.getItem('username')){
                this.user = window.sessionStorage.getItem('username');
                this.$store.dispatch('getViewData',{
                    url:'viewHistory.php',
                    params:{
                        username:this.user
                    }
                })
            }
        }
    }
</script>
