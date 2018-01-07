<template>
    <div id="w_login" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)">
        <header id="w_header">
            <span class="el-icon-arrow-left" @click="goBack"></span>    
            <span>帮助</span>    
        </header>
        <main id="w_main">
            <h2>
                <img :src="imgUrl"/>
            </h2>
            <div class="form">
                <p>
                    <input type="text" ref="userName" placeHolder="手机/邮箱" v-model="user.userName" @input="testName" @blur="clearClose('userName')" />
                    <i class="el-icon-circle-close-outline" v-if="show.userName" @click="clearVal('userName')"></i>
                </p>
                <p>
                    <input :type="type" ref="password" placeHolder="输入密码" v-model="user.password" @input="testpsw" @blur="clearClose('password')" />
                    <i class="el-icon-circle-close-outline" v-if="show.password" @click="clearVal('password')" ></i>
                    <i class="el-icon-view" @click="viewPsw"></i>
                </p>
                <p><a href="#">忘记密码?</a></p>
            </div>
        </main>
        <footer id="w_loginFoot">
            <el-button class="login dislogin" type="success" disabled v-if="btn">登录</el-button>
            <el-button class="login" type="success" v-else @click="clickLogin">登录</el-button>
        </footer>
        <DialogComponent></DialogComponent>
    </div>
</template>

<script>
    import './login.scss';
    import DialogComponent from '../dialogComponent/dialogComponent.vue';
    import http from '../../utils/requestAjax.js';
    export default{
        data:function(){
            return {
                imgUrl:require('../../assets/images/logo.png'),
                user:{
                    userName:'',
                    password:''
                },
                show:{
                    userName:false,
                    password:false
                },
                type:'password',
                num:1,
                btn:true,
                loading:false
            }
        },
        components:{
            DialogComponent
        },
        methods:{
            goBack:function(){
                this.$router.push({name:'register'})
            },
            testName:function(){
                this.show.userName = true;
                this.show.password = false;
                this.btn = this.$options.methods.testBtn(this.user.userName,this.user.password);
            },
            testpsw:function(){
                this.show.password = true;
                this.show.userName = false;
                this.btn = this.$options.methods.testBtn(this.user.userName,this.user.password);
            },
            testBtn:function(userName,password){
                if(userName!='' && password!=''){
                    return false;
                }else{
                    return true;
                }
            },
            clickLogin:function(){
                this.loading = true;
                this.show.password = false;
                this.show.userName = false;
                var opt = {
                    url:'user.php',
                    params:{
                        type:'login',
                        username:this.user.userName,
                        password:this.user.password
                    }
                }
                http.post(opt).then((response)=>{
                    this.loading = false;
                    if(response.data == "ok"){
                        // 登录成功后存下用户名,跳转到主页;
                        window.sessionStorage.setItem("username",this.user.userName);
                        let go = this.$store.state.footComponent.routeList[this.$store.state.footComponent.limit];
                        this.$router.push({
                            name:go
                        })
                    }else{
                        // 您输入的帐号或密码有误,请重新输入!
                        this.$store.dispatch('createDialog',{
                                iCon:'iconfont icon-delete',
                                content:'您输入的帐号或密码有误,请重新输入!',
                        })
                    }
                })
            },
            clearVal:function(parmas){
                this.user[parmas] = '';
                this.show[parmas] = false;
            },
            clearClose:function(parmas){
                this.show[parmas] = false;
            },
            viewPsw:function(){
                if(this.type === 'password'){
                    this.type = 'text';
                }else{
                    this.type = 'password';
                }
            }
        }
    }
</script>