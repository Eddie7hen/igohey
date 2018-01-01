<template>
    <!-- <div class="classifyChild_p">
        <div class="main_rt">
            <ul>
                <li @click="sortCut('综合')">综合排序</li>
                <li @click="sortCut(sortType)">
                    按价格
                    <div>
                        <i class="el-icon-caret-top"></i>
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                </li>
                <li @click="sortCut('销量')">按销量</li>
            </ul>
        </div> -->
        <div class="main_rb" ref="box">
            <ul>
                <li v-for="(val,idx) in this.$store.state.classifyChild.dataset" :key="idx">
                    <div class="goodsimg">
                        <img :src="val.imgurl" alt="" />
                    </div>
                    <div class="goodsdetils">
                        <p>{{val.details}}</p>
                        <div>
                            <p v-if="val.saleprice">原价：￥<span v-text="val.price" style="text-decoration:line-through;"></span></p>
                            <p>现价：￥<span v-text="val.saleprice || val.price"></span></p>
                        </div>
                        <i class="iconfont icon-add"></i>
                    </div>
                </li>
                
            </ul>
        </div>
    <!-- </div> -->
</template>


<script type="text/javascript">
    import './classifyChild.scss';
    import http from '../../utils/requestAjax.js';
    export default {
        data(){
            return {
                sortType:0,
                data: [],
                param:'',
            }
        },
        props:['params'],
        beforeUpdate(){
            this.$refs.box.scrollTop = 0;
        }
    }   
</script>