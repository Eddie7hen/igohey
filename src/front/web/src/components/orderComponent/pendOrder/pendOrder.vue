<template>
    <div class="main_cont">
        <div v-for="(item,index) in pend" :key="item[0].orderno">
            <p>
                <span>{{item[0].addtime}}</span>
                <s>待支付</s>
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
                    <span v-if="item[0].status == 2">立即支付</span>
                </p>
                <p v-html="'<span>应付:</span>￥'+item[0].total"></p>
            </div>
        </div>
        <p class="nothing" v-if="pend.length == 0 && !this.$store.state.orders.loading">
            <i class="el-icon-tickets"></i>
            <span>你还没有相关订单哦~</span>
        </p>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                pend:this.$store.state.orders.pendList
            }
        },
        methods:{
            delOrder(idx,orderId){
                this.$store.dispatch('delOrder',{url:'order.php',params:{type:'del',username:'Ed',orderno:orderId}});
                this.allList.splice(idx,1);
            }
        }
    }
</script>

