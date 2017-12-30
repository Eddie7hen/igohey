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
            <AllOrder v-if="iCurTips == 0" :allList="orderList"></AllOrder>
            <Paid v-if="iCurTips == 1"></Paid>
            <Pending v-if="iCurTips == 2" :pend="pendList"></Pending>
            <OutOrder v-if="iCurTips == 3"></OutOrder>
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
                iCurTips:0,
                orderList:[
                    {
                        id:1,
                        'orderno':121212,
                        'status':1,
                        'addTime':'2015-09-22 11:41:20',
                        goodsId:123,
                        imgurl:'src/assets/imgs/caomei.jpg',
                        details:'花果山 中国国产鲜草莓 30克/盒',
                        'price':'11.32',
                        'saleprice':'10.12',
                        'standard':'g',
                        'area':'瑞士',
                        qty:1
                    },
                     {
                        id:1,
                        'orderno':121,
                        'status':1,
                        'addTime':'2015-09-22 11:41:20',
                        goodsId:123,
                        imgurl:'src/assets/imgs/caomei.jpg',
                        details:'花果山 中国国产鲜草莓 30克/盒',
                        'price':'11.32',
                        'saleprice':'10.12',
                        'standard':'g',
                        'area':'瑞士',
                        qty:1
                    },
                     {
                        id:1,
                        'orderno':1213434212,
                        'status':2,
                        'addTime':'2015-09-22 11:41:20',
                        goodsId:123,
                        imgurl:'src/assets/imgs/caomei.jpg',
                        details:'花果山 中国国产鲜草莓 30克/盒',
                        'price':'11.32',
                        'saleprice':'10.12',
                        'standard':'g',
                        'area':'瑞士',
                        qty:1
                    },
                     {
                        id:1,
                        'orderno':1216565212,
                        'status':2,
                        'addTime':'2015-09-22 11:41:20',
                        goodsId:123,
                        imgurl:'src/assets/imgs/caomei.jpg',
                        details:'花果山 中国国产鲜草莓 30克/盒',
                        'price':'11.32',
                        'saleprice':'10.12',
                        'standard':'g',
                        'area':'瑞士',
                        qty:1
                    }

                ],
                pendList:[
                    {
                        id:1,
                        'orderno':1987,
                        'status':1,
                        'addTime':'2015-09-22 11:41:20',
                        goodsId:123,
                        imgurl:'src/assets/imgs/caomei.jpg',
                        details:'花果山 中国国产鲜草莓 30克/盒',
                        'price':'11.32',
                        'saleprice':'10.12',
                        'standard':'g',
                        'area':'瑞士',
                        qty:1
                    },
                     {
                        id:1,
                        'orderno':9897,
                        'status':1,
                        'addTime':'2015-09-22 11:41:20',
                        goodsId:123,
                        imgurl:'src/assets/imgs/caomei.jpg',
                        details:'花果山 中国国产鲜草莓 30克/盒',
                        'price':'11.32',
                        'saleprice':'10.12',
                        'standard':'g',
                        'area':'瑞士',
                        qty:1
                    },
                     {
                        id:1,
                        'orderno':168,
                        'status':2,
                        'addTime':'2015-09-22 11:41:20',
                        goodsId:123,
                        imgurl:'src/assets/imgs/caomei.jpg',
                        details:'花果山 中国国产鲜草莓 30克/盒',
                        'price':'11.32',
                        'saleprice':'10.12',
                        'standard':'g',
                        'area':'瑞士',
                        qty:1
                    }
                ]
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
        }

    }
</script>