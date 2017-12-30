<template>
    <div id="Edcart" >
        <div class='EdCartHeader' >
            <p>购物车</p>
        </div>
        <div class='EdCartContent' >
            <div class='EdCartAddress' >
                <div class='EdCartNon' >
                    <P class='Nonp' >iGo瞎需要您的地址坐标</P>
                     <i class="iconfont icon-enter Nonenter"></i>
                </div>
                <!-- <div class='EdCart' >
                    <h5>
                        <h2><i class="iconfont icon-coordinates" ></i></h2>
                        <h3>
                            <p><span>Eddie Chen</span><span>15625142968</span></p>
                            <p><span>智汇创意园Park</span><span>E座五楼</span></p>
                        </h3>
                        <h4>
                            <span>修改</span>
                            <i class="iconfont icon-enter enter"></i>
                        </h4>
                    </h5>
                </div> -->
            </div>
            <div class='EdflashSend'>
                <img src="../../assets/flashSend.png" alt="">
            </div>
            <ul class='goodsList' v-if="dataset.length > 0" >
                <li v-for="(obj, index) in dataset" :key="index" :id="obj.goodsid" >
                    <h2 @click='iChecks' ><i class='iconfont icon-success iCheck' ></i></h2>
                    <h3>
                        <img :src="obj.imgurl" alt="">
                    </h3>
                    <h4>
                        <em v-text="obj.details" ></em>
                        <em>￥<span>{{obj.price*obj.goodsqty}}</span></em>
                    </h4>
                    <h5>
                        <a>&minus;</a>
                        <span v-text="obj.goodsqty" ></span>
                        <a>&plus;</a>   
                    </h5>
                </li>
            </ul>
            <dl class='settle' >
                <dd @click='iChecksAll' ><i class='iconfont icon-success iCheckAll'></i></dd>
                <dd>全选</dd>
                <dd>
                    共￥<span class='money' >0</span>
                </dd>
                <dd>选好了</dd>
            </dl>
        </div>
        <Ed-footer></Ed-footer>
    </div>
</template>

<script>
    import '../shoppingCart/shoppingCartComponent.scss';
    import footer from '../commonHtml/commonFoot/commonFoot.vue';
    import http from '../../utils/requestAjax';
    export default {
        components:{
            'Ed-footer': footer,
        },
        data(){
            return{
                username:'Ed',
                dataset:[],
                url:'EdCart.php',
                iConActive:0,
            }
        },
        methods:{
            iChecks(event){
                if(event.target.classList.contains('icon-success')){
                    event.target.classList.remove('icon-success');
                    event.target.classList.add('icon-success_fill');
                    event.target.classList.add('iCheckActive');
                }else if(event.target.classList.contains('icon-success_fill')){
                    event.target.classList.remove('icon-success_fill');
                    event.target.classList.remove('iCheckActive');
                    event.target.classList.add('icon-success');
                }
            },
            iChecksAll(event){
                console.log(event);
                if(event.target.classList.contains('icon-success')){
                    event.target.classList.remove('icon-success');
                    event.target.classList.add('icon-success_fill');
                    event.target.classList.add('iCheckAllActive');
                }else if(event.target.classList.contains('icon-success_fill')){
                    event.target.classList.remove('icon-success_fill');
                    event.target.classList.remove('iCheckAllActive');
                    event.target.classList.add('icon-success');
                }
            }
        },
        beforeMount(){
            var params = {
                username:this.username,
                status:'query',
            }
            http.post({url:this.url, params:params}).then((res)=>{
                console.log(res);
                //将返回的数据赋给dataset
                if(res.status == '200' && res.data.length > 0){
                    this.dataset = res.data;
                }
            })
        }
    }
</script>

