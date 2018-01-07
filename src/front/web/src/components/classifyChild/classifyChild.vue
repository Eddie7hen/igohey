<template>
        <div class="main_rb" ref="box">
            <ul>
                <li v-for="(val,idx) in this.$store.state.classifyChild.dataset" :key="idx" @click="skipDetails(val.id)">
                    <div class="goodsimg">
                        <img :src="val.imgurl" alt="" />
                    </div>
                    <div class="goodsdetils">
                        <p>{{val.details}}</p>
                        <div>
                            <p v-if="val.saleprice">原价：￥<span v-text="val.price" style="text-decoration:line-through;"></span></p>
                            <p>现价：￥<span v-text="val.saleprice || val.price"></span></p>
                        </div>
                        <i class="iconfont icon-add" @click="joinCart(val.id)"></i>
                    </div>
                </li>
            </ul>
            <div class="showupWin">
            </div>
        </div>
</template>


<script type="text/javascript">
    import './classifyChild.scss';
    import http from '../../utils/requestAjax.js';
    export default {
        data(){
            return {
                sortType:0,
                data: [],
                params:{},
            }
        },
        methods:{
            skipDetails(goodsid){
                if(event.target.tagName.toLowerCase() == 'i'){
                    return;
                }
                this.$router.push({
                    name:'details',
                    query:{goodsid: goodsid}
                })
            },
            joinCart(id){
                if(window.sessionStorage.getItem('username') != null){
                    var win = document.querySelector('.showupWin');
                    this.params['goodsid'] = id;
                    this.params['username'] = window.sessionStorage.getItem('username');
                    this.params['goodsqty'] = 1;
                    this.params['type'] = 'join';
                    http.post({url:'indexMain.php',params:this.params}).then(res=>{
                        if(res.data == 'ok'){
                            win.innerHTML = '加入成功';
                            win.classList.add('win_active');
                        }else if(res.data == 'no'){
                            win.innerHTML = '加入失败';
                            win.classList.add('win_active'); 
                        }

                        setTimeout(function(){
                            win.classList.remove('win_active'); 
                        },1000)
                    })
                    
                }else{
                    this.$router.push({
                        name:'login'
                    })
                }
            }
        },
        beforeUpdate(){
            this.$refs.box.scrollTop = 0;
        }
    }   
</script>