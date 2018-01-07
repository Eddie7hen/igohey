<template>
    <div id="billpay" >
        <header class="billpayHeader" >
            <i @click="goback" class="iconfont icon-return" ></i>
            <p>订单支付</p>
        </header>
        <main class="billpayMain" >
            <div class="completeTime" >
                请在15分钟内完成支付
            </div>
            <ul class="billpayList" >
                <li><div><img src="../../assets/images/alipay.png" ></div>
                    <p>
                        <span>支付宝支付</span>
                        <span>推荐有支付宝支付账号的用户使用</span>
                    </p>
                </li>
                <li>
                    <div><img src="../../assets/images/wechatpay.png" ></div>
                    <p>
                        <span>微信支付</span>
                        <span>推荐微信5.0及以上的版本用户使用</span>
                    </p>
                </li>
            </ul>
        </main>
        <footer class="billpayFooter" >
            <div class="billpaybtn" >
                {{ '确认支付￥' + totalMoney }}
            </div>
        </footer>
    </div>
</template>

<script>
    import '../billPayComponent/billPayComponent.scss';
    export default {
        data(){
            return{
                totalMoney:0,
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            }
        },
        beforeMount(){
            this.totalMoney = this.$route.query.totalMoney;
        }
    }
</script>

