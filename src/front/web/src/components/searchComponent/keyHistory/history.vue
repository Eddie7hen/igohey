<template>
    <main id="w_main">
        <h3>历史搜索<span @click="clear" v-show="this.$store.state.search.keyWord[0]">[清空历史]</span></h3>
        <p v-if="this.$store.state.search.keyWord[0]">
            <span v-for="(item,index) in this.$store.state.search.keyWord" :key="index" @click="searchWord(index)">
                {{item.keyword ? item.keyword : item}}
            </span>
        </p>
    </main>
</template>
<script>
    import './history.scss';
    export default {
        data:function(){
            return{
                history:[],
                user:''
            }
        },
        methods:{
            searchWord:function(index){
                let key;
                if(this.$store.state.search.keyWord[index].keyword){
                    key = this.$store.state.search.keyWord[index].keyword;
                }else{
                    key = this.$store.state.search.keyWord[index];
                }
                this.$parent.backSearch = true;
                this.$parent.keyWord = key;
                this.$router.push({
                    name:'searchlist',
                    params:{
                        user:this.user,
                        keyWord:key
                    }
                });
            },
            clear:function(){
                this.$store.dispatch('clearKeyWord',{
                    url:'keyWord.php',
                    params:{
                        type:'clear',
                        user:this.user
                    }
                })
            }
        },
        mounted:function(){
            // 获取当前的登录用户,并根据用户名查询搜索历史,渲染到页面;
            if(window.sessionStorage.getItem('username')){
                this.user = window.sessionStorage.getItem("username");
                this.$store.dispatch('getKeyList',{
                    url:'keyWord.php',
                    params:{
                        type:'get',
                        user:this.user
                    }
                })
            }
        }

    }

</script>