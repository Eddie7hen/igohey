<template>
    <div id="CreateAdres" >
        <div v-for="(obj, index) in this.$store.state.cretAdres.toolBar" >
            <header class="CretAdresHeader" >
                <div class="headerLeft iconfont icon-return" ></div>
                <div class="headerCent" >
                    <p>{{obj.title ? obj.title : '添加地址'}}</p>
                </div>
                <div @click="handler(obj.AddEvent)" class="headerRight" >
                    <p>{{obj.text ? obj.text : '保存'}}</p>
                </div>
            </header>
            <main class="CretAdresMain" >
                <ul class="CretAdresInfo" >
                    <li><h3>联系人</h3><input type="text" placeholder="收货人姓名" v-model="nickname" ></li>
                    <li><h3>手机号码</h3><input type="text" placeholder="iGo瞎联系您的电话" v-model="phone" ></li>
                    <li><h3>收货地址</h3><input type="text" placeholder="请选择您的住宅小区、大厦或学校" v-model="address" ></li>
                </ul>
            </main>
            <footer v-if="obj.DelEvent" @click="handler(obj.DelEvent)" class="CretAdresFooter" >
                <p>删除当前地址</p>
            </footer>
        </div>
        <DialogComponent></DialogComponent> 
    </div>
</template>

<script>
    import './createAddressComponent.scss';
    import DialogComponent from '../../dialogComponent/dialogComponent.vue';
    export default {
        data(){
            return{
            }
        },
        computed:{
           nickname:{
               get(){
                   return this.$store.state.cretAdres.opt.nickname
               },
               set(newVal){
                   this.$store.dispatch('changeNickname', newVal);
               }
           },
           phone:{
               get(){
                   return this.$store.state.cretAdres.opt.phone
               },
               set(newVal){
                   this.$store.dispatch('changePhone', newVal);
               }
           },
           address:{
               get(){
                   return this.$store.state.cretAdres.opt.address
               },
               set(newVal){
                   this.$store.dispatch('changeAdres', newVal);
               }
           },
        },
        methods:{
            handler(cb){
                if(typeof cb == 'function'){
                    cb();
                }
            },
        },
        components:{
            DialogComponent
        },
    }
</script>

