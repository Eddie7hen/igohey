<template>
    <div class="activity_p" v-loading="this.$store.state.activity.loading"
        element-loading-text="加载ing..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%;">
        <div class="header">
            <i class="iconfont icon-return" @click="getBack"></i>
            {{activeData.active}}
            <i class="iconfont icon-refresh" @click="getCurrent"></i>
        </div>
        <div class="main">
            <div class="activeimg">
                <img :src="activeData.imgurl" alt="" />
            </div>
            <div class="activeMain" :style="{backgroundColor:activeData.color}">
                <div :style="{color:activeData.titlecolor}">{{activeData.active}}</div>
                <ul>
                    <li v-for="(obj, idx) in goodsData" :key="idx" :data-id="obj.id" @click="skipdetails(obj.id)">
                        <div class="productimg">
                            <img :src="obj.imgurl" alt="" />
                        </div>
                        <p>{{obj.details}}</p>
                        <p><span>￥{{obj.saleprice || obj.price}}</span><span v-if="obj.saleprice">￥{{obj.price}}</span></p>
                        <div class="shop">
                            <span @click="joinCart(obj.id)">立即购买</span>
                        </div>
                    </li>
                </ul>
                <div class="rule">
                    <p :style="{color:activeData.titlecolor}">活动规则</p>
                    <p>本次活动新老用户均可参与，最终解释权归爱果汇所有</p>
                </div>
            </div>
            <div class="carts" @click="skipCart">
                <i class="iconfont icon-publishgoods_fill"></i>
                <span class="qty"></span>
            </div>
        </div>
        <div class="showupWin">
                已加入购物车
        </div>
    </div>
</template>

<script type="text/javascript">
    import './activity.scss';
    import http from '../../utils/requestAjax.js';

    export default {
        data(){
            return {
                goodsData: [],
                activeData: {},
                activeCart: []
            }
        },
        methods:{
            skipdetails(goodsid){
                if(event.target.innerHTML !== '立即购买'){
                    this.$router.push({
                        name:'details',
                        query:{goodsid:goodsid}
                    })
                }
            },
            joinCart(goodsid){
                var upwin = document.getElementsByClassName('showupWin')[0];
                http.post({url:'active_p.php', params:{type:'join', username:'Ed', goodsid:goodsid}}).then(res => {
                    if(res.data == 'ok'){
                        upwin.classList.add('win_active');  
                        var active = this.$route.query.active || '超值力荐';
                        var params = {active: active, username: 'Ed'};
                        this.$store.dispatch('initactive',params);
                    }else{
                        upwin.innerHTML = '加入购物车失败';
                        upwin.classList.add('win_active');  
                    }
                })
                setTimeout(function(){
                    upwin.classList.remove('win_active');
                },1000)
            },
            skipCart(){
                this.$router.push({
                    name:'shoppingcart'
                })
            },
            getBack(){
                this.$router.go(-1);
            },
            getCurrent(){
                this.$router.go(0);
            }
        },
        updated(){
            this.goodsData = this.$store.state.activity.goodsData;
            this.activeData = this.$store.state.activity.activeData[0];
            this.activeCart = this.$store.state.activity.activeCart;
            if(this.activeCart.length>0){
                var Qty = 0;    
                for(var i=0;i<this.activeCart.length;i++){
                    Qty += this.activeCart[i].goodsqty*1;
                }
                document.querySelector('.carts .qty').innerHTML = Qty;
            }else{
                document.querySelector('.carts .qty').innerHTML = 0;
            }
        },
        beforeMount(){
            var active = this.$route.query.active || '限时折扣';
            var params = {active: active, username: 'Ed'};
            this.$store.dispatch('initactive',params);
        }
    }

</script>