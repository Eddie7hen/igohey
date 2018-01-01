<template>
    <div id="collect">
        <header id="w_header">
            <i class="iconfont icon-return" @click="goBack"></i>
            <h1>我的收藏</h1>
        </header>
        <main id="w_main">
            <div v-for="(item,index) in collectList" :key="item.id">
                <i class="iconfont icon-success" @click="clickSingle(index)"></i>
                <img :src="item.imgurl" />
                <p>
                    <span v-text="item.name"></span>
                    <span v-text="item.details"></span>
                </p>
                <p>
                    <span>当季价:￥{{item.saleprice ? item.saleprice : item.price}}</span>
                    <span v-if="item.saleprice">原价:￥{{item.price}}</span>
                </p>
            </div>
        </main>
        <footer id="w_footer">
            <p>
                <i class="iconfont icon-success"></i>
                <span>全选</span>
            </p>
            <span>删除</span>
        </footer>
    </div>
</template>

<script>
    import './collect.scss';
    export default {
        data(){
            return {
                collectList:[
                    {id: "922", name: "草莓", type: "浆果类", price: "17.00", saleprice: "15.00", details: "花果山 中国国产鲜草莓 30克/盒",imgurl:"src/assets/imgs/caomei.jpg"
                    },
                     {id: "192", name: "草莓", type: "浆果类", price: "17.00", saleprice: "15.00", details: "花果山 中国国产鲜草莓 30克/盒",imgurl:"src/assets/imgs/caomei.jpg"
                    },
                     {id: "912", name: "草莓", type: "浆果类", price: "17.00", saleprice: "15.00", details: "花果山 中国国产鲜草莓 30克/盒",imgurl:"src/assets/imgs/caomei.jpg"
                    },
                     {id: "492", name: "草莓", type: "浆果类", price: "17.00", saleprice: "15.00", details: "花果山 中国国产鲜草莓 30克/盒",imgurl:"src/assets/imgs/caomei.jpg"
                    }

                ]
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            clickSingle(idx){
                console.log(idx)
            }
        }
    }
</script>
