<template>
    <div class="classify_p" v-loading="this.$store.state.classifyChild.loading"
        element-loading-text="加载ing..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%;">
        <head_p class="head_p"></head_p>
        <div class="main">
            <div class="main_l">
                <ul>
                    <li @click="cut('hot')" class="classifyLi" ref="hot">热销果类</li>
                    <li @click="cut('discount')" class="classifyLi" ref="discount">折扣果类</li>
                    <li @click="cut('new')" class="classifyLi" ref="new">新品果类</li>
                    <li @click="cut('tropic')" class="classifyLi" ref="tropic">热带果类</li>
                    <li @click="cut('seasonal')" class="classifyLi" ref="seasonal">应季果类</li>
                    <li @click="cut('entrance')" class="classifyLi" ref="entrance">进口果类</li>
                    <li @click="cut('domestic')" class="classifyLi" ref="domestic">国产果类</li>
                </ul>
            </div>
            <div class="main_r">
                <div class="main_rt">
                    <ul>
                        <li @click="sortCut('synthesize')">综合排序</li>
                        <li @click="sortCut(sortType)">
                            按价格
                            <div>
                                <i>▲</i>
                                <i>▼</i>
                            </div>
                        </li>
                        <li @click="sortCut('sales')">按销量</li>
                    </ul>
                </div>
                <classifyChild :type="classify"></classifyChild>
            </div>
        </div>
        <foot_p class="footer_p"></foot_p>
    </div>
</template>

<script type="text/javascript">
    import './classifyMain.scss';
    import http from '../../utils/requestAjax.js';
    import dateNow from '../../utils/dateFormat.js';
    import footer from '../commonHtml/commonFoot/commonFoot.vue'
    import header from '../commonHtml/commonHead/commonHead.vue'
    import classifyChild from '../classifyChild/classifyChild.vue'
    export default {
        data(){
            return {
                type: '',
                sortType:0,
                params:{},
                classify:'',
            }
        },
        methods:{
            cut(txt){
                var classifyLi = document.querySelectorAll('.classifyLi');
                var sortLi = document.querySelectorAll('.main_rt ul li');
                var target = event.target;
                this.classify = txt;
                for(var i=0;i<classifyLi.length;i++){
                    classifyLi[i].classList.remove('li_active');
                }
                for(var j=0;j<sortLi.length;j++){
                    sortLi[j].classList.remove('liactive');
                }
                sortLi[1].firstElementChild.lastElementChild.classList.remove('iactive');
                sortLi[0].classList.add('liactive');
                target.classList.add('li_active');
                sortLi[1].firstElementChild.firstElementChild.classList.remove('iactive');
                this.params = {};
                this.params['type'] = txt;
                this.params['sortType'] = 'synthesize';
                if(txt == 'seasonal'){
                    var dateObj = dateNow();
                    this.params['season'] = Math.ceil(dateObj.month/3);
                }else if(txt == 'new'){
                    var dateObj = dateNow();
                    this.params['addtime'] = dateObj.dateNow;
                }
                this.$store.dispatch('increment',this.params);
            },
            sortCut(txt){
                var sortLi = document.querySelectorAll('.main_rt ul li');
                var target = event.target;
                for(var i=0;i<sortLi.length;i++){
                    sortLi[i].classList.remove('liactive');
                }
                if(typeof(txt) == 'number'){
                    if(event.target.tagName.toLowerCase() == 'i'){
                        return;
                    }
                    if(txt == 0){
                        target.classList.add('liactive');
                        target.firstElementChild.lastElementChild.classList.remove('iactive');
                        target.firstElementChild.firstElementChild.classList.add('iactive');
                        target.classList.add('liactive');
                        this.sortType = 1;
                    }else if(txt == 1){
                        target.classList.add('liactive');
                        target.firstElementChild.firstElementChild.classList.remove('iactive');
                        target.classList.add('liactive');
                        target.firstElementChild.lastElementChild.classList.add('iactive');
                        this.sortType = 0;
                    }
                }else{
                    sortLi[1].firstElementChild.firstElementChild.classList.remove('iactive');
                    sortLi[1].firstElementChild.lastElementChild.classList.remove('iactive');
                    target.classList.add('liactive');
                    this.sortType = 0;
                }
                this.params['sortType'] = txt;
                this.$store.dispatch('increment',this.params);
            }

        },
        mounted(){
            if(this.classify == ''){
                this.classify = this.$route.query.type;
            }
            this.params['type'] = this.classify || 'hot';
            this.params['sortType'] = 'synthesize';
            if(this.classify == 'seasonal'){
                var dateObj = dateNow();
                this.params['season'] = Math.ceil(dateObj.month/3);
            }
            this.$store.dispatch('increment',this.params);
            if(this.classify){
                this.$refs[this.classify].classList.add('li_active');
            }else{
                this.$refs.hot.classList.add('li_active');
            }
            document.querySelectorAll('.main_rt ul li')[0].classList.add('liactive');
        },
        components:{
            foot_p:footer,
            head_p:header,
            classifyChild:classifyChild,
        }
    }
</script>