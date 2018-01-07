<template>
    <div id="mycenter">
        <main id="w_main">
            <div id="headTop">
                <i class="iconfont icon-setup" @click="goSet"></i>
                <p>
                    <img :src="userhead" />
                    <span v-text="this.username"></span>
                    <em>V{{this.$store.state.setting.userData.integral?parseInt(this.$store.state.setting.userData.integral/1000):0}}会员</em>
                </p>
                <i class="iconfont icon-systemprompt"></i>
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
        <DialogComponent></DialogComponent>
    </div>
</template>
<script>
    import commonFoot from '../commonHtml/commonFoot/commonFoot.vue';
    import DialogComponent from '../dialogComponent/dialogComponent.vue';
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
                        text:'商品收藏',
                        'goRoute':'collect'
                    },
                    {
                        icon:'iconfont icon-coordinates',
                        text:'收货地址',
                        'goRoute':'address'
                    },
                    {
                        icon:'iconfont icon-barrage_fill',
                        text:'历史足迹',
                        'goRoute':'history'
                    }
                ],
                userhead:'./src/assets/userhead/defultHead.jpg',
                username:'未登录',
                adverList:[]
            }
        },
        components:{
            commonFoot,
            DialogComponent
        },
        methods:{
            leaveIcur(target,params){
                this.$router.push({
                    name:target,
                    params:{'iCurShow':params}
                })
            },
            goSet(){
                if(window.sessionStorage.getItem('username')){
                    this.$router.push({
                        name:'setting'
                    })
                }else{
                    this.$store.dispatch('createDialog',{
                        content:'你还没有登录帐号哦~',
                        btnEvent:{
                            cancel:{
                                cn:'取消',
                                event:()=>{
                                    this.checkAll = false;
                                    this.$store.dispatch('autoClose');
                                }
                            },
                            gologin:{
                                cn:'去登录',
                                event:()=>{
                                    this.checkAll = false;
                                    this.$router.push({
                                        name:'login'
                                    })
                                }
                            }
                        }
                    })
                }
                    
            }
        },
        mounted(){
            http.post({url:'adver.php',params:{type:'mycenter'}}).then((res)=>{
                this.adverList = res.data; 
            })
            if(window.sessionStorage.getItem('username')){
                this.username = window.sessionStorage.getItem('username');
                this.$store.dispatch('getUser',{
                    url:'useData.php',
                    params:{
                        type:'get',
                        username:this.username
                    }
                })
            }
        }
    }
</script>