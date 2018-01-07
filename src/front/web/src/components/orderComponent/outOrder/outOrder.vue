<template>
    <div id="w_main">
        <div class="main_cont" v-loading="this.$store.state.orders.loading"
            element-loading-text="加载ing..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            style="width: 100%;">
            <div v-for="(item,index) in this.$store.state.orders.outList" :key="item[0].orderno">
                <p>
                    <span>{{item[0].addtime}}</span>
                    <s>退款</s>
                </p>
                <div class="orderCont" v-for="goods in item" :key="goods.id" @click="goDetails(goods.id)">
                    <img :src="goods.imgurl" />
                    <div>
                        <p v-text="goods.details"></p>
                        <span>产地:{{goods.area}}</span>
                        <span>规格:{{goods.standard}}</span>
                    </div>
                    <p>
                        <span>￥{{goods.price}}</span>
                        <span>￥{{goods.saleprice}}</span>
                        <span>件数:{{goods.qty}}</span>
                    </p>
                </div>
                <div class="orderFoot">
                    <p>
                        <span @click="delOrder(index,item[0].orderno)">删除订单</span>
                    </p>
                    <p v-html="'<span>退付款:</span>￥'+item[0].total"></p>
                </div>
            </div>
            <p class="nothing" v-if="this.$store.state.orders.outList.length == 0 && !this.$store.state.orders.loading">
                <i class="el-icon-tickets"></i>
                <span>你还没有相关订单哦~</span>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        methods:{
            delOrder(idx,orderId){
                this.$store.dispatch('createDialog',{
                    content:'你确定要删除该订单吗?',
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
                                this.$store.dispatch('delOrder',
                                                    {
                                                        url:'order.php',
                                                        params:{type:'del',
                                                        username:this.user,
                                                        orderno:orderId
                                                    }
                                });
                            }
                        }
                    }

                })
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
                this.$store.dispatch('selectOrder',{ url: 'order.php', params: { type: 'get', username: this.user } });
            }
        }
    }
</script>

