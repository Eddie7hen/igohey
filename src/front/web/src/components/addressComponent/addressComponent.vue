<template>
    <div id="Address" >
        <header class="headerAdres" >
            <i @click="goback" class='iconfont icon-return' ></i>
            <p>用户地址</p>
        </header>
        <main class="mainAdres" v-loading="this.$store.state.address.loading"
            element-loading-text="加载ing..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            style="width: 100%"
        >
            <img src="../../assets/nonAdres.png" v-if="this.$store.state.address.dataset.length <= 0" >
            <ul class="adresList" v-if="this.$store.state.address.dataset.length > 0" >
                <li v-for="(obj, index) in this.$store.state.address.dataset" :key="index" :id="obj.id" >
                    <div class="adresDefault" :class="{'adresActive':obj.status == 1}" ></div>
                    <p @click="defaultAdres(obj.id)" class="adresInfo">
                        <span><a v-text="obj.nickname" ></a><a v-text="obj.phone" ></a></span>
                        <span><a v-text="obj.address" ></a></span>
                    </p>
                    <div class="btnEdt" @click="changeAdres(obj.id)" ><i class="iconfont icon-editor" ></i></div>
                </li>
            </ul>
        </main>
        <footer class="footerAdres" >
            <p @click="plusAdres" >&plus; 新增地址</p>
        </footer>
    </div>
</template>

<script>
    import './addressComponent.scss';
    export default {
        data(){
            return{
                username:'',
            }
        },
        methods:{
            plusAdres(){
                var toolBar = [{
                    title:'添加地址',
                    text:'保存',
                    AddEvent:()=>{
                        if(!this.$store.state.cretAdres.opt.nickname || !this.$store.state.cretAdres.opt.phone || !this.$store.state.cretAdres.opt.address ){
                            var opt = {
                                iCon:'iconfont icon-delete',
                                content:'联系人,电话或者收货地址不能为空'
                            }
                            this.$store.dispatch('createDialog', opt);
                            return false;
                        }
                        var params = {
                            username:this.username,
                            type:'insert',
                        }
                        this.$store.dispatch('createAdres', params)
                    },
                    jumpEvent:()=>{
                        this.$router.push({name:'address'});
                    }
                }]
                this.$store.dispatch('plusAdres', toolBar);
                this.$router.push({name:'createaddress'});
            },
            changeAdres(idx){
                var toolBar = [{
                    title:'修改地址',
                    text:'保存',
                    id:idx,
                    username: this.username,
                    type:'query',
                    AddEvent:()=>{
                        var params = {
                            type:'update'
                        };
                        this.$store.dispatch('createAdres', params);
                    },
                    DelEvent:()=>{
                        var params = {
                            type: 'delete'
                        };
                        this.$store.dispatch('createAdres', params);
                    },
                    jumpEvent:()=>{
                        this.$router.push({name:'address'});                        
                    },
                    jumpChangeEvent:()=>{
                        this.$router.push({name:'createaddress'});   
                    }
                }];
                this.$store.dispatch('alterAdres', toolBar);
            },
            defaultAdres(idx){
                var params = {
                    username: this.username,
                    id: idx,
                    status: '1',
                    type: 'update',
                    jumpEvent:()=>{
                        this.$router.push({name:'cart'})
                    }
                }
                this.$store.dispatch('chgDefaultAdres', params);
            },
            goback(){
                this.$router.go(-1);
            }
        },
        created(){
            this.username = window.sessionStorage.getItem('username');
        },
        beforeMount(){
            var params = {
                username:this.username,
                type:'query',
            };
            this.$store.dispatch('getAddress', params);
        },
    }
</script>

