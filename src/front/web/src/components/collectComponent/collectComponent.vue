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
                    <span v-text="item.name"></span>
                    <span v-text="item.details"></span>
                </p>
                <p>
                    <span>当季价:￥{{item.saleprice ? item.saleprice : item.price}}</span>
                    <span v-if="item.saleprice">原价:￥{{item.price}}</span>
                </p>
            </div>
        </main>
        <footer id="w_footer">
            <p @click="allCheck">
                <i :class="{'iconfont icon-success_fill':checkAll,'iconfont icon-success':!checkAll}"></i>
                <span>全选</span>
            </p>
            <span @click="delCollect">删除</span>
        </footer>
    </div>
</template>

<script>
    import './collect.scss';
    export default {
        data(){
            return {
                collectList:[],
                checkAll:false
            }
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
                let goodsid = '';
                this.$store.state.collect.collectList.forEach((item)=>{
                    if(item.select){
                        goodsid += item.id;
                    }
                })
                if(goodsid == ""){
                   
                }
            }
        },
        mounted(){
            this.$store.dispatch('viewCollect',{
                url:'collect.php',
                params:{
                    username:'Ed'
                }
            })
        }
    }
</script>
