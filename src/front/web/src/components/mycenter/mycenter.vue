<template>
    <div id="mycenter">
        <main id="w_main">
            <div id="headTop">
                <span><i class="iconfont icon-setup"></i></span>
                <p>
                    <img :src="userhead" />
                    <span v-text="username"></span>
                    <em>V{{member}}会员</em>
                </p>
                <span><i class="iconfont icon-systemprompt"></i></span>
            </div>
            <div id="main_cont">
                <div class="carousel">
                        <el-carousel height="150px">
                            <el-carousel-item v-for="item in adverList" :key="item.id">
                                <img :src="item.imgurl" />
                            </el-carousel-item>
                        </el-carousel>
                </div>
                <ul>
                    <li v-for="(item,index) in cont" :key="item.icon" @click="leaveIcur(item.goRoute,index+1)">
                        <i class="item.icon"></i>
                        <span v-text="item.text"></span>
                        <i class="iconfont icon-enter"></i>
                    </li>
                </ul>
            </div>
        </main>
        <commonFoot></commonFoot>
    </div>
</template>
<script>
    import commonFoot from '../commonHtml/commonFoot/commonFoot.vue';
    import '../../scss/mycenter.scss';
    import http from '../../utils/requestAjax.js';
    export default {
        data:function(){
            return {
                cont:[
                    {
                        icon:'iconfont icon-coupons_fill',
                        text:'已支付',
                        'goRoute':'order'
                    },
                    {
                        icon:'iconfont icon-label_fill',
                        text:'待支付',
                        'goRoute':'order'
                    },
                    {
                        icon:'iconfont icon-flag_fill',
                        text:'退货',
                        'goRoute':'order'
                    },
                    {
                        icon:'iconfont icon-collection_fill',
                        text:'商品收藏'
                    },
                    {
                        icon:'iconfont icon-coordinates',
                        text:'收货地址'
                    },
                    {
                        icon:'iconfont icon-barrage_fill',
                        text:'历史足迹'
                    }
                ],
                userhead:'./src/assets/userhead/defultHead.jpg',
                username:'18688554911',
                member:'0',
                adverList:[]
            }
        },
        components:{
            commonFoot
        },
        methods:{
            leaveIcur(target,params){
                this.$router.push({
                    name:target,
                    query:{'iCurShow':params}
                })
            }
        },
        mounted(){
            http.post({url:'adver.php',params:{type:'mycenter'}}).then((res)=>{
               this.adverList = res.data; 
            })
        }
    }
</script>