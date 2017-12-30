<template>
    <div class="main_cont">
        <div v-for="item in pend" :key="item.orderno">
            <p>
                <span>{{item.addTime}}</span>
                <s>待支付</s>
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
                <p v-html="'<span>应付:</span>￥'+item.price"></p>
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
        props:['pend']
    }
</script>

