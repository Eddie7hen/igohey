<template>
    <div id="test">
        <header id="commonHead">
            <img :src="userhead" alt="头像" @click="goLogin" />
            <p @click="goSearch">
                <input type="text" placeHolder="请输入商品名称" />
                <i class="iconfont icon-search" ></i>
            </p>
        </header>
        <main id="w_main"></main>
    </div>
</template>

<script>
    import jsonp from 'jsonp';
    import http from '../../../utils/requestAjax.js';
    import '../../../scss/commonHead.scss';

    export default {
        data:function(){
            return {
                userhead:'./src/assets/userhead/defultHead.jpg',
            }
        },
        methods:{
            goLogin(){
                if(window.sessionStorage.getItem('username')){
                    this.$router.push({
                        name:'mycenter'
                    })
                }else{
                    this.$router.push({
                        name:'register'
                    })
                }
            },
            goSearch(){
                this.$router.push({
                    name:'search'
                })
            }
        }
    }
</script>