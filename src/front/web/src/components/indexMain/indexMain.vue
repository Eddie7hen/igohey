<template>
    <div class="index_p" v-loading="this.$store.state.indexMain.loading"
        element-loading-text="加载ing..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%;" >
        <head_p class="head_p"></head_p>
        <div class="main">
        <!-- <vue-touch class="div" v-on:swipeleft="swipeleft"> -->
            <div class="block">
                <el-carousel height="4.8rem" trigger="hover">
                    <el-carousel-item v-for="(item,index) in src" :key="index">
                        <img :src="item"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
        <!-- </vue-touch> -->
            <div class="mainB" v-if="dataActive.length>0">
                <div id="new" class="mainCom">
                    <p>
                        <i></i>
                        {{dataActive[0].keyword}}区
                        <span @click="skiplist('new')">更多 <i class="iconfont icon-enter"></i></span>
                    </p>
                    <div @click="skipActive(dataActive[0].active)">
                        <img :src="dataActive[0].imgurl" />
                    </div>
                    <ul>
                        <li v-for="(obj, idx) in dataNew" :key="idx" :data-id="obj.id" @click="skipdetails(obj.id)">
                            <div class="img">
                                <img :src="obj.imgurl" alt="" />    
                            </div>
                            <p v-text="obj.details"></p>
                            <div>
                                <p v-if="obj.saleprice">原价：￥<span v-text="obj.price" style="text-decoration:line-through;"></span></p>
                                <p>现价：￥<span v-text="obj.saleprice || obj.price"></span></p>
                            </div>
                            <div>
                                <span @click="joinCart">加入购物车</span>
                            </div>
                        </li>
                        <!-- <li>
                            <img src="/src/assets/imgs/caomei.jpg" alt="" />
                            <p>sljdfjldsfjlsd</p>
                            <div>
                                <p>现价：￥<span>19.00</span></p>
                                <p>折扣价：￥<span>19.00</span></p>
                                <i class='iconfont icon-add'></i>
                            </div>-->
                    </ul>
                </div>
                <div id="discount" class="mainCom">
                    <p>
                        <i></i>
                        {{dataActive[1].keyword}}区
                        <span @click="skiplist('discount')">更多 <i class="iconfont icon-enter"></i></span>
                    </p>
                    <div @click="skipActive(dataActive[1].active)">
                        <img :src="dataActive[1].imgurl" />
                    </div>
                    <ul>
                        <li v-for="(obj, idx) in dataDiscount" :key="idx" :data-id="obj.id" @click="skipdetails(obj.id)">
                            <div class="img">
                                <img :src="obj.imgurl" alt="" />    
                            </div>
                            <p v-text="obj.details"></p>
                            <div>
                                <p v-if="obj.saleprice">原价：￥<span v-text="obj.price" style="text-decoration:line-through;"></span></p>
                                <p>现价：￥<span v-text="obj.saleprice || obj.price"></span></p>
                            </div>
                            <div>
                                <span @click="joinCart">加入购物车</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="hot" class="mainCom">
                    <p>
                        <i></i>
                        {{dataActive[2].keyword}}区
                        <span @click="skiplist('hot')">更多 <i class="iconfont icon-enter"></i></span>
                    </p>
                    <div @click="skipActive(dataActive[2].active)">
                        <img :src="dataActive[2].imgurl" />
                    </div>
                    <ul>
                        <li v-for="(obj, idx) in dataHot" :key="idx" :data-id="obj.id" @click="skipdetails(obj.id)">
                            <div class="img">
                                <img :src="obj.imgurl" alt="" />    
                            </div>
                            <p v-text="obj.details"></p>
                            <div>
                                <p v-if="obj.saleprice">原价：￥<span v-text="obj.price" style="text-decoration:line-through;"></span></p>
                                <p>现价：￥<span v-text="obj.saleprice || obj.price"></span></p>
                            </div>
                            <div>
                                <span @click="joinCart">加入购物车</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <foot_p class="footer_p"></foot_p>
        <div class="showupWin">
                已加入购物车
        </div>
    </div>
</template>

<script type="text/javascript">
    import './indexMain.scss';
    import http from '../../utils/requestAjax.js';
    import dateNow from '../../utils/dateFormat.js';
    import footer from '../commonHtml/commonFoot/commonFoot.vue'
    import header from '../commonHtml/commonHead/commonHead.vue'
    export default {
        data: function(){
           return {
                //轮播图路径
                src: ['./src/assets/images/banner1.jpg','./src/assets/images/banner2.jpg','./src/assets/images/banner3.jpg','./src/assets/images/banner4.jpg'],
                dataNew: '',//新品区ajax请求返回的结果
                dataDiscount: '',//折扣区ajax请求返回的结果
                dataHot: '',//热门区ajax请求返回的结果
                dataActive: [],
           }
        },
        updated(){
            this.dataNew = this.$store.state.indexMain.dataNew;
            this.dataDiscount = this.$store.state.indexMain.dataDiscount;
            this.dataHot = this.$store.state.indexMain.dataHot;
            this.dataActive = this.$store.state.indexMain.dataActive;
        },
        beforeMount(){
            var dateObj = dateNow();
            var params = {type: 'init',addtime:dateObj.dateNow}
            this.$store.dispatch('initData',params);
        },
        methods:{
            joinCart(event){
                // console.log(event.target);
                var upwin = document.getElementsByClassName('showupWin')[0];
                var goodsid = event.target.parentElement.parentElement.dataset.id;
                if(window.sessionStorage.getItem('username') != null){
                    http.post({url:'indexMain.php', params:{type:'join', username:'dada', goodsid:goodsid}}).then(res => {
                        if(res.data == 'ok'){
                            upwin.classList.add('win_active');  
                        }else{
                            upwin.innerHTML = '加入购物车失败';
                            upwin.classList.add('win_active');  
                        }
                    })
                    setTimeout(function(){
                        upwin.classList.remove('win_active');
                    },1000)
                    
                }else{
                    this.$router.push({
                        name:'login'
                    })
                }
            },
            skipdetails(goodsid){
                if(event.target.innerHTML !== '加入购物车'){
                    this.$router.push({
                        name:'details',
                        query:{goodsid:goodsid}
                    })
                }
            },
            skiplist(txt){
                this.$router.push({
                    name:'classify',
                    query:{type:txt}
                })
            },
            skipActive(txt){
                this.$router.push({
                    name:'activity',
                    query:{active:txt}
                })
            }
        },
        components:{
            foot_p:footer,
            head_p:header
        }
    }
</script>