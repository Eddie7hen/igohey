<template>
    <div class="main_cont" v-loading="this.$store.state.orders.loading"
        element-loading-text="加载ing..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%;">
        <div v-for="(item,index) in outList" :key="item[0].orderno">
            <p>
                <span>{{item[0].addtime}}</span>
                <s>退款</s>
            </p>
            <div class="orderCont" v-for="goods in item" :key="goods.id">
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
        <p class="nothing" v-if="outList.length == 0 && !this.$store.state.orders.loading">
            <i class="el-icon-tickets"></i>
            <span>你还没有相关订单哦~</span>
        </p>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                outList:this.$store.state.orders.outList
            }
        },
        methods:{
            delOrder(idx,orderId){
                this.$store.dispatch('delOrder',{url:'order.php',params:{type:'del',username:'Ed',orderno:orderId}});
                this.outList.splice(idx,1);
            }
        },
        mounted(){
            this.iCurTips = this.$route.query.iCurShow;
            this.$store.dispatch('selectOrder',{ url: 'order.php', params: { type: 'get', username: 'Ed' } });
        }
    }
</script>

