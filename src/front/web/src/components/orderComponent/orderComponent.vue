<template>
    <div id="allOrder">
        <header id="w_header">
            <i class="iconfont icon-return" @click="goBack"></i>
            <h1>我的订单</h1>
        </header>
        <nav id="w_nav">
            <ul class="main_tips">
                <li v-for="(item,index) in orderTips" :key="index" :class="{active :iCurTips == index } " @click="changeTips(index)">
                    {{item}}
                </li>
            </ul>
        </nav>
        <main id="w_main"> 
            <AllOrder v-if="iCurTips == 0" :allList="this.$store.state.orders.orderList"></AllOrder>
            <Paid v-if="iCurTips == 1" :paidList="this.$store.state.orders.paidList"></Paid>
            <Pending v-if="iCurTips == 2" :pend="this.$store.state.orders.pendList"></Pending>
            <OutOrder v-if="iCurTips == 3" :outList="this.$store.state.orders.outList"></OutOrder>
        </main>
    </div>
</template>
<script>
    import AllOrder from './allOrder/allOrder.vue';
    import Paid from './paidOrder/paidOrder.vue';
    import Pending from './pendOrder/pendOrder.vue';
    import OutOrder from './outOrder/outOrder.vue';
    import './orderComponent.scss';
    export default {
        data:function(){
            return {
                orderTips:['全部','已支付','待支付','退款/售后'],
                iCurTips:0
            }
        },
        components:{
            AllOrder,
            Paid,
            Pending,
            OutOrder
        },
        methods:{
            changeTips(idx){
                this.iCurTips = idx;
            },
            goBack(){
                this.$router.push({name:'mycenter'})
            }
        },
        mounted(){
            this.iCurTips = this.$route.query.iCurShow;
            this.$store.dispatch('selectOrder',{ url: 'order.php', params: { type: 'get', username: 222 } });
        }

    }
</script>