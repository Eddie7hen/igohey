<template>
    <div class="main_cont">
        <div v-for="item in paidList" :key="item.orderno">
            <p>
                <span>{{item.addTime}}</span>
                <s>已完成</s>
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
                <p v-html="'<span>实付:</span>￥'+item.price"></p>
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
        props:["paidList"]
    }
</script>
    
