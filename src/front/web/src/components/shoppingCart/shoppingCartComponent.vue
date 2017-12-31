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
                    <h2 @click='iChecks' ><i :ref="index+1" class='iconfont icon-success iCheck' ></i></h2>
                    <h3>
                        <img :src="obj.imgurl" alt="">
                    </h3>
                    <h4>
                        <em v-text="obj.details" ></em>
                        <em>￥<span>{{obj.price}}</span></em>
                    </h4>
                    <h5>
                        <a @click="minus($event, obj.goodsid)" >&minus;</a>
                        <span v-text="obj.goodsqty" ></span>
                        <a @click="plus($event, obj.goodsid)">&plus;</a>   
                    </h5>
                    <div @click="deletes($event, obj.goodsid)" ><i id="btnDelete" class="iconfont icon-empty" ></i></div>
                </li>
            </ul>
            <dl class='settle' >
                <dd @click='iChecksAll' ><i ref='All' class='iconfont icon-success iCheckAll'></i></dd>
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
                url:this.$store.state.shoppingCart.url,
            }
        },
        methods:{
            //勾选状态样式改变
            iChecks(event){
                var iCheck = document.querySelectorAll('.iCheck');
                if(event.target.classList.contains('icon-success')){
                    event.target.classList.remove('icon-success');
                    event.target.classList.add('icon-success_fill');
                    event.target.classList.add('iCheckActive');
                }else if(event.target.classList.contains('icon-success_fill')){
                    event.target.classList.remove('icon-success_fill');
                    event.target.classList.remove('iCheckActive');
                    event.target.classList.add('icon-success');
                }
                this.$refs.All.classList.remove('icon-success');
                this.$refs.All.classList.add('icon-success_fill');
                this.$refs.All.classList.add('iCheckAllActive');
                for(var i=0;i<iCheck.length;i++){
                    if(!iCheck[i].classList.contains('icon-success_fill')){
                        this.$refs.All.classList.remove('icon-success_fill');
                        this.$refs.All.classList.remove('iCheckAllActive');
                        this.$refs.All.classList.add('icon-success');
                    }
                }
                this.total();
            },
            //全选勾选状态样式改变            
            iChecksAll(event){
                if(event.target.classList.contains('icon-success')){
                    event.target.classList.remove('icon-success');
                    event.target.classList.add('icon-success_fill');
                    event.target.classList.add('iCheckAllActive');
                    for(var i=0;i<this.dataset.length;i++){
                        this.$refs[i+1][0].classList.remove('icon-success')
                        this.$refs[i+1][0].classList.add('icon-success_fill');
                        this.$refs[i+1][0].classList.add('iCheckActive');
                    }
                }else if(event.target.classList.contains('icon-success_fill')){
                    event.target.classList.remove('icon-success_fill');
                    event.target.classList.remove('iCheckAllActive');
                    event.target.classList.add('icon-success');
                    for(var i=0;i<this.dataset.length;i++){
                        this.$refs[i+1][0].classList.remove('icon-success_fill');
                        this.$refs[i+1][0].classList.remove('iCheckActive');
                        this.$refs[i+1][0].classList.add('icon-success');
                    }
                }
                this.total();
            },
            //数量增加
            plus(event, goodsid){
                var goodsqty = ++event.target.previousElementSibling.innerText;      
                var params = {
                    goodsid:goodsid,
                    goodsqty:goodsqty,
                    username:this.username,
                    status:'update',
                }
                this.$store.dispatch('count',params);
            },
            //数量减少
            minus(event, goodsid){
                var goodsqty = --event.target.nextElementSibling.innerText;
                if(goodsqty < 1){
                    goodsqty = 1;
                    event.target.nextElementSibling.innerText = 1;
                    return false;
                }
                var params = {
                    goodsid:goodsid,
                    goodsqty:goodsqty,
                    username:this.username,
                    status:'update',
                }
                this.$store.dispatch('count',params);             
            },
            //删除购物车商品
            deletes(event, goodsid){
                var params = {
                    goodsid:goodsid,
                    username:this.username,
                    status:'delete',
                }
                this.$store.dispatch('deleteOrder', params);
                if(this.$store.state.shoppingCart.deleteRes){
                    event.target.parentNode.parentNode.remove()
                }
            },
            //计算总价
            total(){
                var liAll = document.querySelectorAll('li');
                var total = document.querySelector('.money');
                var totalMoney = total.innerText*0;              
                for(var i=0;i<liAll.length;i++){
                    if(liAll[i].children[0].children[0].classList.contains('icon-success_fill')){
                        totalMoney +=Number(liAll[i].children[2].children[1].children[0].innerText)*Number(liAll[i].children[3].children[1].innerText);
                    }
                }
                total.innerText = totalMoney.toFixed(2);
                
            }
        },
        beforeMount(){
            var params = {
                username:this.username,
                status:'query',
            }
            http.post({url:this.url, params:params}).then((res)=>{
                //将返回的数据赋给dataset
                if(res.status == '200' && res.data.length > 0){
                    this.dataset = res.data;
                }
            })
        },
        // updated(){
        // }
    }
</script>

