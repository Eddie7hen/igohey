<template>
    <div id="collect">
        <header id="w_header">
            <i class="iconfont icon-return" @click="goBack"></i>
            <h1>我的收藏</h1>
        </header>
        <main id="w_main" v-loading="this.$store.state.collect.loading"
        element-loading-text="加载ing..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%;">
            <div v-for="(item) in this.$store.state.collect.collectList" :key="item.id">
                <i :class="{'iconfont icon-success_fill':item.select,'iconfont icon-success':!item.select}" @click="clickSingle(item)"></i>
                <img :src="item.imgurl" />
                <p>
                    <span v-text="item.details"></span>
                    <em>产地:{{item.area}}</em>
                </p>
                <p>
                    <span>当季价:￥{{item.saleprice ? item.saleprice : item.price}}</span>
                    <span v-if="item.saleprice" class="oldPrice">原价:￥{{item.price}}</span>
                </p>
            </div>
            <p v-if="this.$store.state.collect.collectList.length == 0" class="nothing">
                <i class="el-icon-tickets"></i>
                <span>你还没有商品收藏哦~</span>
            </p> 
        </main>
        <footer id="w_footer">
            <p @click="allCheck">
                <i :class="{'iconfont icon-success_fill':checkAll,'iconfont icon-success':!checkAll}"></i>
                <span>全选</span>
            </p>
            <span @click="delCollect">删除</span>
        </footer>
        <DialogComponent></DialogComponent>
    </div>
</template>

<script>
    import './collect.scss';
    import DialogComponent from '../dialogComponent/dialogComponent.vue';
    export default {
        data(){
            return {
                username:'',
                checkAll:false
            }
        },
        components:{
            DialogComponent
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            clickSingle(obj){
                obj.select = !obj.select;
                let all = true;
                this.$store.state.collect.collectList.forEach((item)=>{
                    if(!item.select){
                        all = false;
                    }
                })
                this.checkAll = all;
            },
            allCheck(){
                this.checkAll = !this.checkAll;
                this.$store.state.collect.collectList.forEach((item)=>{
                    item.select = this.checkAll;
                })
            },
            delCollect(){
                var goodsid = '';
                this.$store.state.collect.collectList.forEach((item)=>{
                    if(item.select){
                        goodsid += item.id + ',';
                    }
                })
                if(goodsid == ""){
                   this.$store.dispatch('createDialog',{
                        iCon:'iconfont icon-delete',
                        content:'你还没有选中任何商品哦~',
                   })
                }else{
                    goodsid = goodsid.slice(0,-1);
                    this.$store.dispatch('createDialog',{
                        content:'你确定要删除吗?',
                        btnEvent:{
                            cancel:{
                                cn:'取消',
                                event:()=>{
                                    this.checkAll = false;
                                    this.$store.state.collect.collectList.forEach((item)=>{
                                       item.select = false;
                                    })
                                    this.$store.dispatch('autoClose');
                                }
                            },
                            enter:{
                                cn:'确定',
                                event:()=>{
                                    this.checkAll = false;
                                    this.$store.dispatch('delCollect',{
                                        url:'collect.php',
                                        params:{
                                            type:'del',
                                            username:this.username,
                                            goodsid:goodsid
                                        }
                                    });
                                }
                            }
                        }

                    })
                }
            }
        },
        mounted(){
            if(window.sessionStorage.getItem('username')){
                this.username = window.sessionStorage.getItem('username');
                this.$store.dispatch('viewCollect',{
                    url:'collect.php',
                    params:{
                        username:this.username
                    }
                })
            }
        }
    }
</script>
