<template>
    <div id="test">
        <header id="commonHead">
            <span>
                <i class="iconfont icon-wangwang"></i>
            </span>
            <p>配送至:<s v-text="iCur"></s><i class="el-icon-caret-bottom"></i></p>
            <span>
                <i class="iconfont icon-search"></i>
            </span>
        </header>
        <main id="w_main"></main>
    </div>
</template>

<script>
    import jsonp from 'jsonp';
    import http from '../../../utils/reqAjax.js';
    import '../../../scss/commonHead.scss';

    export default {
        data:function(){
            return {
                iCur:''
            }
        },
        methods:{
            leaveICur(idx){
                this.$store.dispatch('leaveIcur',{icur:idx,route:this.$router})
            }
        },
        mounted(){
            // this.limit = this.$store.limit;
            console.log(this.$router)
            http.get({url:'http://10.3.135.254:1993/getIp.php'}).then((res)=>{
                if(res.data){ 
                    let url = 'https://api.map.baidu.com/location/ip?ip=' + res.data + '&ak=u0ButxxjGgLFZKgv8GSTRuQ8gERRXdU3&coor=bd09ll';
                    jsonp(url, (err, data)=>{
                        if (err) {
                            console.error(err.message);
                        } else {
                            this.iCur = data.content.address;
                        }
                    });
                }
            })

        }
    }
</script>