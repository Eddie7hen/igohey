<template>
    <div class="details_p">
        <div class="header">
            <i class="iconfont icon-return" @click="getBack"></i>
            {{dataset.name}}
            <i class="iconfont icon-share_fill"></i>
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
                    <div>爱果汇所售商品均经过严格的供应商资质审查、商品审查、入库全检、出货全检流程。由于部分商品存在厂家更换包装、不同批次、不同生产日期、不同生产工厂等情况，导致商品实物与图片存在微小差异，因此请您以收到的商品实物为准，同时我们会尽量做到及时更新，由此给您带来不便敬请谅解，谢谢！</div>
                </div>
            </div>
            <div>
                <div>
                    <img src="src/assets/images/logo.png" alt="" />
                </div>
                <div>
                    掌上便利店30分钟速达
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
                <i class="el-icon-minus" @click="qtyChange('sub')"></i>
                <span ref="qty">0</span>
                <i class="el-icon-plus" @click="qtyChange('add')"></i>
            </div>
        </div> 
        <div class="showupWin">
        </div>
    </div>
</template>

<script type="text/javascript">
    import http from "../../utils/requestAjax.js";
    import './details.scss';

    export default {
        data(){
            return {
                dataset:{},
                collect:[],
                cart:[],
                params:{}
            }
        },
        methods:{
            enshrine(){
                // console.log(this.params);
                var collect = document.querySelector('.foot_l');
                var win = document.querySelector('.showupWin');
                if(collect.classList.contains('active')){
                    this.params['type'] = 'del';
                    http.post({url:'details_p.php',params:this.params}).then(res => {
                        this.dataset = res.data.data1[0];
                        this.collect = res.data.data2;
                        collect.classList.remove('active');
                        win.innerHTML = '取消收藏';
                        win.classList.add('win_active');
                    })
                }else{
                    this.params['type'] = 'inc';
                    http.post({url:'details_p.php',params:this.params}).then(res => {
                        this.dataset = res.data.data1[0];
                        this.collect = res.data.data2;
                        collect.classList.add('active');
                        win.innerHTML = '已收藏';
                        win.classList.add('win_active');
                    })
                }

                setTimeout(function(){
                    win.classList.remove('win_active');
                },1000)
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
                this.params['type'] = 'cartChange';
                this.params['goodsqty'] = this.$refs.qty.innerHTML;
                http.post({url:'details_p.php',params:this.params}).then(res => {
                    this.$router.push({
                        name:'shoppingcart',
                    })
                })
            },
            getBack(){
                this.params['type'] = 'cartChange';
                this.params['goodsqty'] = this.$refs.qty.innerHTML;
                http.post({url:'details_p.php',params:this.params}).then(res => {
                    this.$router.go(-1);
                })
            }
        },
        mounted(){
            var goodsid = this.$route.query.goodsid;
            this.params['goodsid'] = goodsid || '12';
            this.params['username'] = 'Ed';
            http.post({url:'details_p.php',params:this.params}).then(res => {
                this.dataset = res.data.data1[0];
                this.collect = res.data.data2;
                this.cart = res.data.data3;
                if(this.collect.length>0){
                    document.querySelector('.foot_l').classList.add('active');
                }
                if(this.cart.length>0){
                    this.$refs.qty.innerHTML = this.cart[0].goodsqty;
                }else{
                    this.$refs.qty.innerHTML = 0;
                }
            })
        }
    }

</script>