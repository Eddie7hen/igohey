<template>
    <div id="Edcart">
        <div class='EdCartHeader' >
            <p>购物车</p>
        </div>
        <div class='EdCartContent' v-loading="this.$store.state.shoppingCart.loading"
            element-loading-text="加载ing..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            style="width: 100%"
        >
            <p class="EdCartNothing" v-if="this.$store.state.shoppingCart.dataset.length <= 0"  >
                <i class="iconfont icon-publishgoods_fill" ></i>
                <span>亲，购物车空空的耶~赶紧去挑好吃的吧</span>
                <em>去逛逛</em>
            </p>
            <div class='EdCartAddress' v-if="this.$store.state.shoppingCart.dataset.length > 0" >
                <div class='EdCartNon' v-if="this.$store.state.shoppingCart.adres.length < 0" >
                    <P class='Nonp' >iGo瞎需要您的地址坐标</P>
                    <i class="iconfont icon-enter Nonenter"></i>
                </div>
                <div class='EdCart' v-for="(obj,index) in this.$store.state.shoppingCart.adres" >
                    <h5>
                        <h2><i class="iconfont icon-coordinates" ></i></h2>
                        <h3>
                            <p><span>{{obj.nickname}}</span><span>{{obj.phone}}</span></p>
                            <p><span>{{obj.address}}</span></p>
                        </h3>
                        <h4 @click="jumpRouter" >
                            <span>修改</span>
                            <i class="iconfont icon-enter enter"></i>
                        </h4>
                    </h5>
                </div>
            </div>
            <ul class='goodsList' v-if="this.$store.state.shoppingCart.dataset.length > 0" >
                <li v-for="(obj, index) in this.$store.state.shoppingCart.dataset" :key="index" :id="obj.goodsid" >
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

            <dl class='settle' v-if="this.$store.state.shoppingCart.dataset.length > 0" >
                <dd @click='iChecksAll' ><i ref='All' class='iconfont icon-success iCheckAll'></i></dd>
                <dd>全选</dd>
                <dd>
                    共￥<span class='money' >0.00</span>
                </dd>
                <dd @click="createBill">选好了</dd>
            </dl>
        </div>
        <Ed-footer></Ed-footer>
        <DialogComponent></DialogComponent>
    </div>
</template>

<script>
    import '../shoppingCart/shoppingCartComponent.scss';
    import footer from '../commonHtml/commonFoot/commonFoot.vue';
    import DialogComponent from '../dialogComponent/dialogComponent.vue';
    import msec from '../../utils/getMsec';
    export default {
        components:{
            'Ed-footer': footer,
            DialogComponent,
        },
        data(){
            return{
                username:'',
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
                this.total();
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
                this.total();                     
            },
            //删除购物车商品
            deletes(event, goodsid){
                this.$store.dispatch('createDialog', {
                content:'你确定要删除吗?',
                    btnEvent:{
                        cancel:{
                            cn:'取消',
                            event:()=>{
                                this.$store.dispatch('autoClose');
                            }
                        },
                        enter:{
                            cn:'确定',
                            event:()=>{
                                var params = {
                                    goodsid:goodsid,
                                    username:this.username,
                                    status:'delete',
                                }
                                this.$store.dispatch('deleteCart', params);
                            }
                        }
                    }
                })
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
                
            },
            createBill(){
                var liAll = document.querySelectorAll('li');
                var dataset = [];
                var strId = '';
                for(var i=0;i<liAll.length;i++){
                    if(liAll[i].children[0].children[0].classList.contains('icon-success_fill')){
                        var opt  = {
                            goodsid:liAll[i].id,
                            qty:liAll[i].children[3].children[1].innerText
                        };
                        strId += liAll[i].id + ',';
                        dataset.push(opt);
                    }
                }
                var orderno = msec();
                //生成订单
                var params = {
                    type:'create',
                    orderno: orderno,
                    username:this.username,
                    status:'2',
                    dataset:JSON.stringify(dataset),
                    jumpEvent:()=>{
                        this.$router.push({
                            name:'paied',
                            query:{
                                orderno: orderno,
                                username:this.username,
                            }
                        })
                    }
                }
                this.$store.dispatch('createOrder', params);
                //生成订单后,删除购物车勾选状态的商品
                var opt = {
                    status:'delete',
                    username:this.username,
                    goodsid:strId
                }
                this.$store.dispatch('deleteCart', opt);
            },
            //跳转选择地址页面
            jumpRouter(){
                this.$router.push({name: 'address'});
            }
        },
        created(){
            if(!window.sessionStorage.getItem('username')){
                this.$store.dispatch('createDialog', {
                content:'亲，请先进行登录',
                    btnEvent:{
                        cancel:{
                            cn:'取消',
                            event:()=>{
                                this.$router.push({name: 'index'})
                            }
                        },
                        enter:{
                            cn:'确定',
                            event:()=>{
                                this.$router.push({name: 'login'})
                            }
                        }
                    }
                })
            }else if(window.sessionStorage.getItem('username')){
                this.username = window.sessionStorage.getItem('username');
            }
        },
        beforeMount(){
            console.log(this.username);
            var params = {
                username:this.username,
                status:'query',
            }
            this.$store.dispatch('getData', params);
            var getAdres = {
                username: this.username,
                type: 'defaultAdres',
                status: '1'
            }
            this.$store.dispatch('getAdres', getAdres);
        },
    }
</script>

