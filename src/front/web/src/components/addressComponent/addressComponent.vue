<template>
    <div id="Address" >
        <header class="headerAdres" >
            <i class='iconfont icon-return' ></i>
            <p>用户地址</p>
        </header>
        <main class="mainAdres" v-loading="this.$store.state.address.loading"
            element-loading-text="加载ing..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            style="width: 100%"
        >
            <!-- <img src="../../assets/nonAdres.png" > -->
            <ul class="adresList" v-if="this.$store.state.address.dataset.length > 0" >
                <li v-for="(obj, index) in this.$store.state.address.dataset" :key="index" :id="obj.id" >
                    <div class="adresDefault" :class="{'adresActive':obj.status == 1}" ></div>
                    <p class="adresInfo">
                        <span><a v-text="obj.nickname" ></a><a v-text="obj.phone" ></a></span>
                        <span><a v-text="obj.address" ></a></span>
                    </p>
                    <div class="btnEdt" @click="changeAdres" ><i class="iconfont icon-editor" ></i></div>
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
                username:'Ed',
            }
        },
        methods:{
            plusAdres(){
                var toolBar = [{
                    title:'添加地址',
                    text:'保存',
                    AddEvent:()=>{
                        if(!this.$store.state.cretAdres.opt.nickname){
                            alert('收货名不能为空')
                        }
                        // var params = {
                        //     username:this.username,
                        // }
                        // this.$store.dispatch('createAdres', params)
                    },
                    username:'Ed'
                }]
                this.$store.dispatch('plusAdres', toolBar);
                this.$router.push({name:'createaddress'});
            },
            changeAdres(){
                
            }
        },
        beforeMount(){
            var params = {
                username:this.username,
                type:'query',
            }
            this.$store.dispatch('getAddress', params);
        },
    }
</script>

