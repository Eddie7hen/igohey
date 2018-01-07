<template>
        <main id="searchlist" v-loading="this.$store.state.search.loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.5)">
            <div class="sortTip" v-if="this.$store.state.search.searchList[0]">
                <span @click="sortList('syn')" :class="{active : limit === 'syn'}">综合</span>
                <span @click="sortList('sale')" :class="{active : limit === 'sale'}">销量</span>
                <span @click="priceSort" :class="{active : limit === 'price'}">价格<i class="el-icon-d-caret"></i></span>
            </div>
            <div v-if="this.$store.state.search.searchList[0]">
                <div class="goodsList" v-for="(item) in this.$store.state.search.searchList" :key="item.id" ref="item.id" @click="goDetails(item.id)">
                    <img :src="item.imgurl" />
                    <div>
                        <p v-text="item.details"></p>
                        <p>
                            <span>破损包退</span>
                            <span>满100包邮</span>
                        </p> 
                        <p>
                            <span>￥<s v-text="item.price"></s></span>
                            <span>{{item.saleqty}}人累计付款</span>
                        </p>   
                    </div>
                </div>
            </div>
            <div class="noneGoods" v-show="!this.$store.state.search.loading" v-else>
                <i class="el-icon-search"></i>
                <p>很抱歉,没有找到相关的宝贝</p>
            </div>
        </main>    
</template>

<script>
    import './searchlist.scss';
    export default {
        data:function(){
            return {
                limit:'syn',
                sort:'cheep',
                user:''
            }
        },
        methods:{
            sortList:function(type){
                // 点击排序的按钮时,loading显示,改变sort数据的状态,控制元素的icon的class;
                this.limit = type;
                if(this.$store.state.search.searchList.length == 1){
                    return;
                }
                this.$store.dispatch('sortList',{
                    url:'search.php',
                    params:{
                        type:type,
                        keyWord:this.$route.params.keyWord
                    }
                })
            },
            priceSort(type){
                this.limit = 'price';
                if(this.$store.state.search.searchList.length == 1){
                    return;
                }
                this.sort = this.sort == "cheep" ? "expensive" : "cheep";
                this.$store.dispatch('sortList',{
                    url:'search.php',
                    params:{
                        type:this.sort,
                        keyWord:this.$route.params.keyWord
                    }
                })
            },
            goDetails:function(id){
                // 点击生成的数据类型,跳转到详情页;
                this.$router.push({name:'goods',params:{goodId:id}});
                window.sessionStorage.setItem('save',id);
            }
        },
        mounted:function(){
            this.$store.dispatch('getSearchlist',{
                url:'search.php',
                params:{
                    type:'syn',
                    keyWord:this.$route.params.keyWord
                }
            }) 
            if(window.sessionStorage.getItem('username')){
                this.user = window.sessionStorage.getItem('username');
            }
            this.$store.dispatch('addKeyWord',{
                url:'keyWord.php',
                params:{
                    type:'add',
                    user:this.user,
                    keyWord:this.$route.params.keyWord
                }
            })
        },
        beforeDestroy(){
            this.$store.dispatch('clearList');
        }
    }
</script>