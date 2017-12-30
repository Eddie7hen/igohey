<template>
    <footer id="w_footer">
        <div v-for="(item,index) in list" :class="{active:limit == index}" :key="index" @click="checkList(index)">
            <i :class="item.icon"></i>
            <span v-text="item.tip"></span>
        </div>
    </footer>
</template>

<script>
import '../../../scss/commonFoot.scss';
export default {
   data:function(){
        return {
            iCur:'',
            limit:0,
            list:[
                {
                    icon:'iconfont icon-homepage_fill',
                    tip:'首页'
                },
                {
                    icon:'iconfont icon-createtask_fill',
                    tip:'分类'
                },
                {
                    icon:'iconfont icon-publishgoods_fill',
                    tip:'购物车'
                },
                {
                    icon:'iconfont icon-feedback_fill',
                    tip:'我的'
                }
            ],
            router:['home','goodslist','service','cart','mycenter'],
            limit:0
        }
    },
    methods:{
        checkList:function(index){
            this.limit = index;
            // this.$router.push({name:this.router[index]});
        }
    }
}
</script>
