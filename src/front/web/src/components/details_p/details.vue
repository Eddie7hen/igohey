<template>
    <div class="details_p" v-loading="this.$store.state.details.loading"
        element-loading-text="加载ing..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%;" v-if="dataset">
        <div class="header">
            <i class="iconfont icon-return" @click="getBack"></i>
            {{dataset.name}}
            <i class="iconfont icon-share_fill" @click="show = !show"></i>
        </div> 
        <div class="main">
            <div>
                <div>
                    <img :src="dataset.imgurl" alt="" />
                </div>
                <p>{{dataset.details}}</p>
                <p><span>￥{{dataset.saleprice || dataset.price}}</span><span v-if="dataset.saleprice">￥{{dataset.price}}</span></p>
            </div>
            <div>
                <div>
                    <p></p>
                    <p>• 商品详情 •</p>
                </div>
                <div class="detailsMain_p">
                    <p>规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：<i>{{dataset.standard}}</i></p>
                    <p>存储条件：<i>冷藏0-10度</i></p>
                    <p>保 质&nbsp; 期：<i>7天</i></p>
                    <p>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地：<i>{{dataset.area}}</i></p>
                </div>
            </div>
            <div>
                <div>
                    <p></p>
                    <p>• 温馨提示 •</p>
                </div>
                <div class="hintmain">
                    <div>果汇科技所售商品均经过严格的供应商资质审查、商品审查、入库全检、出货全检流程。由于部分商品存在厂家更换包装、不同批次、不同生产日期、不同生产工厂等情况，导致商品实物与图片存在微小差异，因此请您以收到的商品实物为准，同时我们会尽量做到及时更新，由此给您带来不便敬请谅解，谢谢！</div>
                </div>
            </div>
            <div>
                <div>
                    <img src="src/assets/images/logo.png" alt="" />
                </div>
                <div>
                    掌上便利店
                </div>
            </div>
        </div> 
        <div class="footer">
            <div class="foot_l" @click="enshrine">
                <p><i class="iconfont icon-like"></i></p>
                <p><i>收藏商品</i></p>
            </div>
            <div class="foot_c" @click="skipCart">
                <p><i class="iconfont icon-publishgoods_fill"></i></p>
                <p><i>购物车</i></p>
            </div>
            <div class="foot_r">
                <span>添加商品：</span>
                <i @click="qtyChange('sub')">&minus;</i>
                <span class="qty" ref="qty">0</span>
                <i @click="qtyChange('add')">&plus;</i>
            </div>
        </div> 
        <div class="showupWin">
        </div>
        <div class="maleArea"  v-show="show">
            <div :class="{maleCont: show}">
                <div class="transition-box" >微信好友</div>
                <div class="transition-box" >微信朋友圈</div>
                <div class="transition-box" >腾讯微博</div>
                <div class="transition-box" >QQ空间</div>
                <div class="transition-box" @click="show = !show">取消</div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import http from "../../utils/requestAjax.js";
    import './details.scss';
    import wx from 'weixin-js-sdk'
    export default {
        data(){
            return {
                dataset:{},
                collect:[],
                cart:[],
                params:{},
                show:false,
            }
        },
        methods:{
            enshrine(){
                var collect = document.querySelector('.foot_l');
                var win = document.querySelector('.showupWin');
                if(window.sessionStorage.getItem('username') != null){
                    if(collect.classList.contains('active')){
                        this.params['type'] = 'del';
                        http.post({url:'details_p.php',params:this.params}).then(res => {
                            if(res.data == 'ok'){
                                collect.classList.remove('active'); 
                                win.innerHTML = '取消收藏';
                            }else{
                                win.innerHTML = '取消失败';
                            }
                            win.classList.add('win_active');    
                        })
                    }else{
                        this.params['type'] = 'inc';
                        http.post({url:'details_p.php',params:this.params}).then(res => {
                            if(res.data == 'ok'){
                                collect.classList.add('active'); 
                                win.innerHTML = '已收藏';
                            }else{
                                win.innerHTML = '收藏失败';
                            }
                            win.classList.add('win_active');   
                        })
                    }

                    setTimeout(function(){
                        win.classList.remove('win_active');
                    },1000)
                }else{
                    this.$router.push({
                        name:'login'
                    })
                }
            },
            qtyChange(txt){
                var goodsQty = this.$refs.qty.innerHTML*1;
                if(txt == 'sub'){
                    goodsQty--;
                    if(goodsQty <= 0){
                        goodsQty = 0;
                    }
                    this.$refs.qty.innerHTML = goodsQty;
                }else if(txt == 'add'){
                    goodsQty ++;
                    this.$refs.qty.innerHTML = goodsQty;
                }
            },
            skipCart(){
                if(window.sessionStorage.getItem('username') != null){
                    this.params['type'] = 'cartChange';
                    this.params['username'] = window.sessionStorage.getItem('username');
                    this.params['goodsqty'] = this.$refs.qty.innerHTML;
                    http.post({url:'details_p.php',params:this.params}).then(res => {
                        this.$router.push({
                            name:'cart',
                        })
                    })
                }else{
                    this.$router.push({
                        name:'login'
                    })
                }
            },
            getBack(){
                if(this.$route.query.classify){
                    this.$router.push({
                        name:'classify',
                        query:{type:this.$route.query.classify}
                    })
                }else{
                    if(window.sessionStorage.getItem('username') != null){
                        this.params['type'] = 'cartChange';
                        this.params['username'] = window.sessionStorage.getItem('username');
                        this.params['goodsqty'] = this.$refs.qty.innerHTML;
                        http.post({url:'details_p.php',params:this.params}).then(res => {
                            this.$router.go(-1);
                        })
                    }else{
                        this.$router.go(-1);
                    } 
                }
            }
        },
        updated(){
            this.collect = this.$store.state.details.collect;
            this.dataset = this.$store.state.details.dataDetails;
            this.cart = this.$store.state.details.cart;
            if(this.collect.length > 0){
                document.querySelector('.foot_l').classList.add('active');
            }else{
                document.querySelector('.foot_l').classList.remove('active');
            }
            if(this.cart.length>0){
                document.querySelector('.foot_r .qty').innerHTML = this.$store.state.details.cart[0].goodsqty;
            }else{
                document.querySelector('.foot_r .qty').innerHTML = 0;
            }
        },
        beforeMount(){
            var goodsid = this.$route.query.goodsid;
            this.params['goodsid'] = goodsid;
            this.params['username'] = window.sessionStorage.getItem('username');;
            this.$store.dispatch('detailsData',this.params);
        }
    }

</script>