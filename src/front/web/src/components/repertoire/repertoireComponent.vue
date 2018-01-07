<template>
    <div class="repertoire_p" v-loading="this.$store.state.repertoire.loading"
        element-loading-text="加载ing..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%;">
        <div class="header">
            <i @click="goback" class="iconfont icon-return"></i>
            商品清单
        </div>
        <div class="main">
            <ul>
                <li  v-for="(obj, idx) in dataset" :key="idx" :data-id="obj.id">
                    <div>
                        <img :src="obj.imgurl" alt="" />
                    </div>
                    <div>
                        <p>{{obj.details}}</p>
                        <p><span>￥{{obj.saleprice || obj.price}}</span><span v-if="obj.saleprice">￥{{obj.price}}</span><i>X {{obj.qty}}</i></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './repertoireComponent.scss';
    export default {
        data(){
            return {
                dataset: [],
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            }
        },
        updated(){
            this.dataset = this.$store.state.repertoire.dataset;
        },
        beforeMount(){
            var orderno = this.$route.query.orderno;
            var username = window.sessionStorage.getItem('username');
            var params = {orderno:orderno,username};
            this.$store.dispatch('initRep',params);
        }
    }


</script>