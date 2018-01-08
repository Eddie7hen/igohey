<template>
    <div id="searchGoods">
        <header id="w_header">
            <i class="iconfont icon-return" v-if="backSearch" @click="goback"></i>
            <p>
                <i class="iconfont icon-search"></i>
                <input type="text" placeHolder="请输入商品名称" @input="clear=true" @blur="hideClear" @click="upload" v-model="keyWord" /><i class="iconfont icon-delete" v-if="clear" @click="clearWord"></i></p>
            <span @click="goback">取消</span>
        </header>
        <router-view></router-view>
    </div> 
</template>
<script>
    import './search.scss';
    import http from '../../utils/requestAjax.js';
    export default {
        data:function(){
            return{
                clear:false,
                keyWord:'',
                user:'',
                backSearch:false,
                url:'keyWord.php'
            }
        },
        methods:{
            hideClear:function(){
                // 当输入框失去焦点时候,清除icon隐藏;
                this.clear = false;
                if(this.keyWord === ""){
                    return;
                }
                this.backSearch = true;
                this.$router.push({name:'searchlist',params:{
                    url:this.url,
                    type:'syn',
                    keyWord:this.keyWord
                }});
            },
            upload:function(){
                this.keyWord = '';
                // 点击输入框跳转到历史信息页面;
                this.$router.push({name:'historysearch'});
            },
            clearWord:function(){
                // 更新data数据;
                this.keyWord = '';
                this.$children[0].history = [];
            },
            goback:function(ev){
                // 点击的源对象是span的时候,跳回主页;
                if(ev.target.tagName.toLowerCase() == 'span'){
                    this.$router.push({name:'index'});
                }else{
                    this.$router.go(-1);
                }
                this.backSearch = false;
            }
        },
        mounted(){
            // 获取当前登录用户;
           if(window.sessionStorage.getItem('username')){
               this.user = window.sessionStorage.getItem('username');
           }
        }
    }

</script>