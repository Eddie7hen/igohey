<template>  
    <div class="main_cont" v-loading="this.$store.state.orders.loading"
        element-loading-text="加载ing..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%;">
        <div v-for="(item,index) in allList" :key="item[0].orderno">
            <p>
                <span>{{item[0].addtime}}</span>
                <s v-text="item[0].status == 1 ? '已完成' : item[0].status == 2 ? '待支付' : '退款'"></s>
            </p>
            <div class="orderCont" v-for="goods in item" :id="goods.id" :key="goods.id">
                <img :src="goods.imgurl" />
                <div>
                    <p v-text="goods.details"></p>
                    <span>产地:{{goods.area}}</span>
                    <span>规格:{{goods.standard}}</span>
                </div>
                <p>
                    <span>￥{{goods.saleprice}}</span>
                    <span>￥{{goods.price}}</span>
                    <span>件数:{{goods.qty}}</span>
                </p>
            </div>
            <div class="orderFoot">
                <p>
                    <span @click="delOrder(index,item[0].orderno)">删除订单</span>
                    <span v-if="item[0].status == 2">立即支付</span>
                </p>
                <p v-html="item[0].status == 1 ? '<span>实付:</span>￥'+item[0].total : item[0].status == 2 ? '<span>应付:</span>￥'+item[0].total : '<span>退付款:</span>￥'+item[0].total"></p>
            </div>
        </div>
        <p class="nothing" v-if="allList.length == 0 && !this.$store.state.orders.loading">
            <i class="el-icon-tickets"></i>
            <span>你还没有相关订单哦~</span>
        </p>
    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        props:['allList'],
        methods:{
            delOrder(idx,orderId){
                this.$store.dispatch('delOrder',{url:'order.php',params:{type:'del',username:'Ed',orderno:orderId}});
            }
        },
        mounted(){
            this.iCurTips = this.$route.query.iCurShow;
            this.$store.dispatch('selectOrder',{ url: 'order.php', params: { type: 'get', username: 'Ed' } });
        }
    }
</script>

