<template>
    <div id="paied" v-loading="this.$store.state.paied.loading"
            element-loading-text="加载ing..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            style="width: 100%" >
        <header class="headerPaied" >
            <i @click="goback" class="iconfont icon-return" ></i>
            <p>结算付款</p>
        </header>
        <main class="mainPaied" >
            <ul class="mainPaiedAdres" >
                <li class="iconfont icon-coordinates" ></li>
                <li class="adresInfo" v-for="(obj,index) in this.$store.state.shoppingCart.adres" >
                    <p><span v-text="obj.nickname" ></span><span v-text="obj.phone" ></span></p>
                    <p v-text="obj.address" ></p>
                </li>
            </ul>
            <p>
                <i class="iconfont icon-clock_fill" ></i>
                <span>收货时间：30分钟送达</span>
            </p>
            <div class="contentList" >
                <h4>普通商品</h4>
                <dl class="goodsList" >
                    <dt>
                        <ul class="imgList" :style="{width: getUlWidth() + 'rem' }" >
                            <li v-for="(obj, index) in this.$store.state.paied.dataset" ><img :key="obj.id" :src="obj.imgurl" ></li>
                        </ul>
                    </dt>
                    <dd @click="getDetails" >
                        <span>{{getTotalNumber()}}</span><span>件</span>
                        <i class="iconfont icon-enter" ></i>
                    </dd>
                </dl>
                <h5>合计:￥<span>{{getTotalMoney()}}</span></h5>
            </div>
            <div class="billService" >
                <p><span>商品总额</span><span>￥<b>0.00</b></span></p>
                <p><span>快递费</span><span>￥<b>{{getTotalMoney() > 100 ? '0.00' : '20.00'}}</b></span></p>
                <p><span>服务费</span><span>￥<b>0.00</b></span></p>
            </div>
        </main>
        <footer class="footerPaied" >
            <p>应付金额：<span class="moneyPaied" >{{getTotalMoney() >= 100 ? getTotalMoney() : (getTotalMoney()-0+20).toFixed(2) }}</span></p>
            <div class="btnPaied" @click="btnPaied" >提交订单</div>
        </footer>
    </div>
</template>

<script>
    import '../paiedComponent/paiedComponent.scss';
    export default {
        data(){
            return{
                total:0,
                username: '',
            }
        },
        methods:{
            btnPaied(){
                var totalMoney = this.getTotalMoney();
                this.$router.push({
                    name: 'billpay',
                    query: {
                        totalMoney: totalMoney
                    }
                })
            },
            goback(){
                this.$router.go(-1);
            },
            getDetails(){
                var orderno = this.$store.state.paied.dataset[0].orderno;
                this.$router.push({
                    name:'repertoire',
                    query:{
                        orderno: orderno,
                    }
                })
            },
            getTotalNumber(){
                if(this.$store.state.paied.dataset.length > 0){
                    var total =0;
                    this.$store.state.paied.dataset.forEach((item, idx)=>{
                        total += item.qty-0;
                    })
                    this.total = total;
                    return total;
                };
            },
            getUlWidth(){
                var widthLi = 170;
                var digit = this.getDigit();
                if(this.$store.state.paied.dataset.length > 0){
                    return (widthLi * this.$store.state.paied.dataset.length + 124 + digit * 20)/75
                }
            },
            getDigit(){
                if(this.total != 0){
                    var total = Number(this.total);
                    var count = 0;
                    do{
                        count++;
                        total = Math.floor(total/10);
                    } while(total > 1)
                    return count;
                }
            },
            getTotalMoney(){
                if(this.$store.state.paied.dataset.length > 0){
                    var totalMoney = 0;
                    this.$store.state.paied.dataset.forEach((item, idx)=>{
                        if(item.saleprice){
                            totalMoney += item.saleprice * item.qty;
                        }else if(item.price){
                            totalMoney +=item.price * item.qty;
                        }
                    })
                    return totalMoney.toFixed(2);
                }
            }
        },
        created(){
            this.username = window.sessionStorage.getItem('username');
        },
        beforeMount(){
            var params = {
                orderno: this.$route.query.orderno,
                username: this.$route.query.username,
                type: 'query',
            }
            this.$store.dispatch('getOrderNo', params);
            var getAdres = {
                username: this.username,
                type: 'defaultAdres',
                status: '1'
            }
            this.$store.dispatch('getAdres', getAdres);
        }
    }
</script>

