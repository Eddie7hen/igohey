<template>
    <div class="index_p">
        <div class="head"></div>
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
            <div class="mainB">
                <div id="new" class="mainCom">
                    <p>
                        <i></i>
                        新 品
                        <span>更多 <i class="iconfont icon-enter"></i></span>
                    </p>
                    <div>
                        <img src="/src/assets/images/poster1.jpg" />
                    </div>
                    <ul>
                        <li v-for="(obj, idx) in dataNew" :key="idx">
                            <div class="img">
                                <img :src="obj.imgurl" alt="" />    
                            </div>
                            <p v-text="obj.details"></p>
                            <div>
                                <p>现价：￥<span v-text="obj.price"></span></p>
                                <p>折扣价：￥<span v-text="obj.saleprice || '无'"></span></p>
                                <i class='iconfont icon-add'></i>
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
                        折 扣 区
                        <span>更多 <i class="iconfont icon-enter"></i></span>
                    </p>
                    <div>
                        <img src="/src/assets/images/poster2.jpg" />
                    </div>
                    <ul>
                        <li v-for="(obj, idx) in dataDiscount" :key="idx">
                            <div class="img">
                                <img :src="obj.imgurl" alt="" />    
                            </div>
                            <p v-text="obj.details"></p>
                            <div>
                                <p>现价：￥<span v-text="obj.price"></span></p>
                                <p>折扣价：￥<span v-text="obj.saleprice || (obj.price*0.5).toFixed(2)"></span></p>
                                <i class='iconfont icon-add'></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="hot" class="mainCom">
                    <p>
                        <i></i>
                        热 销 区
                        <span>更多 <i class="iconfont icon-enter"></i></span>
                    </p>
                    <div>
                        <img src="/src/assets/images/poster3.jpg" />
                    </div>
                    <ul>
                        <li v-for="(obj, idx) in dataHot" :key="idx">
                            <div class="img">
                                <img :src="obj.imgurl" alt="" />    
                            </div>
                            <p v-text="obj.details"></p>
                            <div>
                                <p>现价：￥<span v-text="obj.price"></span></p>
                                <p>折扣价：￥<span v-text="obj.saleprice || (obj.price*0.8).toFixed(2)"></span></p>
                                <i class='iconfont icon-add'></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script type="text/javascript">
    import './indexMain.scss';
    import http from '../../utils/reqAjax.js';
    import dateNow from '../../utils/dateFormat.js';
    export default {
        data: function(){
           return {
                //轮播图路径
                src: ['./src/assets/images/banner1.jpg','./src/assets/images/banner2.jpg','./src/assets/images/banner3.jpg','./src/assets/images/banner4.jpg'],
                dataNew: '',//新品区ajax请求返回的结果
                dataDiscount: '',//折扣区ajax请求返回的结果
                dataHot: '',//热门区ajax请求返回的结果
           }
        },
        mounted(){
            //新品区的ajax请求
            http.post({url:'indexMain.php', parmas:{type: 'new', addtime:dateNow()}}).then(res => {
                this.dataNew = res.data;
            })
            //折扣区的ajax请求
            http.post({url:'indexMain.php', parmas:{type: 'discount', addtime:dateNow()}}).then(res => {
                this.dataDiscount = res.data;
            })
            //热销区的ajax请求
            http.post({url:'indexMain.php', parmas:{type: 'hot'}}).then(res => {
                this.dataHot = res.data;
            })
        },
        methods:{
        }
    }
</script>