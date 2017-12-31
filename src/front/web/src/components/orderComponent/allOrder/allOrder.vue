<template>  
    <div class="main_cont">
        <div v-for="item in allList" :key="item.orderno">
            <p>
                <span>{{item.addTime}}</span>
                <s v-text="item.status == 1 ? '已完成' : item.status == 2 ? '待支付' : '退款'"></s>
            </p>
            <div class="orderCont">
                <img :src="item.imgurl" />
                <div>
                    <p v-text="item.details"></p>
                    <span>产地:{{item.area}}</span>
                    <span>规格:{{item.standard}}</span>
                </div>
                <p>
                    <span>￥{{item.price}}</span>
                    <span>￥{{item.saleprice}}</span>
                    <span>件数:{{item.qty}}</span>
                </p>
            </div>
            <div class="orderFoot">
                <span>删除订单</span>
                <p v-html="item.status == 1 ? '<span>实付:</span>￥'+item.price : item.status == 2 ? '<span>应付:</span>￥'+item.price : '<span>退付款:</span>￥'+item.price"></p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                }
        },
        props:['allList']
    }
</script>

