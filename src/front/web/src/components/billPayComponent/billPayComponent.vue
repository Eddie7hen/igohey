<template>
    <div id="billpay" >
        <header class="billpayHeader" >
            <i class="iconfont icon-return" ></i>
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
                确认支付￥18.00
            </div>
        </footer>
    </div>
</template>

<script>
    import '../billPayComponent/billPayComponent.scss';
    export default {
        data(){
            return{}
        }
    }
</script>

