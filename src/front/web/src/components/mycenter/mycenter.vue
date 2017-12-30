<template>
    <div id="mycenter">
        <header id="w_main">
            <div id="headTop">
                <span><i class="iconfont icon-setup"></i></span>
                <p>
                    <img :src="userhead" />
                    <span v-text="username"></span>
                    <em>V{{member}}会员</em>
                </p>
                <span><i class="iconfont icon-systemprompt"></i></span>
            </div>
        </header>
    </div>
</template>
<script>
    import '../../scss/mycenter.scss';
    import http from '../../utils/reqAjax.js';
    export default {
        data:function(){
            return {
                userhead:'./src/assets/userhead/defultHead.jpg',
                username:'18688554911',
                member:'0'
            }
        }
    }
</script>