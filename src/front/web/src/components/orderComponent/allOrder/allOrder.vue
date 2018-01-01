<template>  
    <div class="main_cont">
        <div v-for="item in allList" :key="item.orderno">
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
                <span>删除订单</span>
                <p v-html="item[0].status == 1 ? '<span>实付:</span>￥'+item[0].total : item[0].status == 2 ? '<span>应付:</span>￥'+item[0].total : '<span>退付款:</span>￥'+item[0].total"></p>
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

