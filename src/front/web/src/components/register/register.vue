<template>
    <div id="register" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)">
        <header id="w_header">
            <span :class="icon" @click="goBack"></span>    
            <h1>注册</h1>
            <span>帮助</span>    
        </header>
        <main id="w_main">
            <div class="form">
                <p>
                    <label>帐号</label>
                    <input type="text" placeHolder="手机" v-model="registMation.username" @blur="testName" />
                    <span v-if="test.name">
                        <i v-if="show.name" class="el-icon-success"></i>
                        <i v-else class="el-icon-error"></i>      
                    </span>
                </p>
                <p>
                    <label>密码</label>
                    <input type="password" placeHolder="输入密码" v-model="registMation.password" @input="testPsw" />
                    <span v-if="test.psw">
                        <i v-if="show.psw" class="el-icon-success"></i>
                        <i v-else class="el-icon-error"></i>      
                    </span>
                </p>
                <p>
                    <input type="text" @blur="testCode($event)" v-model="userCode" placeHolder="请输入验证码" />
                    <em @click="getCode" :class="{active: this.codeStatus == '已发送'}">{{codeStatus}}</em>
                </p>
            </div>
            <p class="disUser" v-if="disName">该帐号已注册,请直接登录!</p>
            <p>
                <span>* 帐号注册请输入手机注册</span>    
                <span>* 密码长度7-12个字符,支持下数字、字母、下划线</span>    
            </p>
        </main>
        <footer id="w_loginFoot">
            <p>
            用户在使用帐号期间，须遵守与互联网信息发布相关的法律、法规及通常适用的互联网一般道德和礼仪的规范，用户将自行承担用户所发布的信息内容所产生的所有法律责任,<b>用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户</b>
            </p>
            <el-button class="regist disregist" type="success" disabled v-if="btn">同意协议并注册</el-button>
            <el-button class="regist" type="success" v-else @click="clickLogin">同意协议并注册</el-button>
        </footer>
        <DialogComponent></DialogComponent>
    </div> 
</template>

<script>
    import './register.scss';
    import md5 from 'js-md5';
    import getDate from '../../utils/getDate.js';
    import http from '../../utils/requestAjax.js';
    import DialogComponent from '../dialogComponent/dialogComponent.vue';
    export default{
        data:function(){
            return {
                icon:'el-icon-arrow-left',
                test:{
                    name:false,
                    psw:false
                },
                show:{
                    name:false,
                    psw:false
                },
                disName:false,
                btn:true,
                loading:false,
                registMation:{
                    username:'',
                    password:'',
                    checkcode:''
                },
                codeStatus:'获取验证码',
                code:'',
                userCode:''
            }
        },
        components:{
            DialogComponent
        },
        methods:{
            testName:function(ev){
                var reg = /(^1[34578]{1}\d{9}$)/;
                if(reg.test(this.registMation.username)){
                    var opt = {
                        url:'user.php',
                        params:{
                            type:'register',
                            username:this.registMation.username
                        }
                    }
                    http.post(opt).then((response)=>{
                        if(response.data == "ok"){
                            this.test.name = true;
                            this.show.name = true;
                            this.disName = false; 
                        }else{
                            this.test.name = true;
                            this.show.name = false;
                            this.disName = true;
                            
                        }
                        if(this.test.name && this.test.psw){
                            this.btn = false; 
                        }else{
                            this.btn = true;
                        }
                    })
                }else{
                    ev.target.focus();
                    this.test.name = true;
                    this.show.name = false;
                    this.btn = true;
                }

            },
            goBack:function(){
                this.$router.go(-1);
            },
            testPsw:function(){
                var reg = /^[\d\w\/]{7,12}$/;
                if(reg.test(this.registMation.password)){
                    this.test.psw = true;
                    this.show.psw = true;
                    if(this.test.name && this.test.psw){
                        this.btn = false; 
                    }else{
                        this.btn = true;
                    }
                }else{
                    this.test.psw = true;
                    this.show.psw = false;
                    this.btn = true;
                }
            },
            getCode:function(){
                if(this.registMation.username == ""){
                    this.$store.dispatch('createDialog',{
                        iCon:'iconfont icon-delete',
                        content:'您还未输入手机号码!'
                    })
                    return;
                }
                this.codeStatus = "已发送"; 
                var accountSid = '320ebf2ce0424066ab250dc181d8daa6';
                var token = 'a6af8d19cb6947599b170bc51fdac7ab';
                var times = getDate();
                var md55 = accountSid + token + times;
                var codes = this.randomNumber(999999,100000);
                this.code = codes;
                var time = '30';
                this.registMation.checkcode = codes;
                let opt = {
                    url:'https://api.miaodiyun.com/20150822/industrySMS/sendSMS',
                    params:{
                        accountSid:accountSid,
                        to:this.registMation.username,
                        timestamp:times,
                        sig:md5(md55),
                        templateid: '146790384',
                        param: `${codes}`,
                    }
                }
                this.$store.dispatch('getCode',opt);
            },
            randomNumber(min,max){
                return parseInt(Math.random()*(max-min+1)+min);
            },
            clickLogin:function(){
                if(this.userCode != this.code){
                    this.$store.dispatch('createDialog',{
                        iCon:'iconfont icon-delete',
                        content:'您输入的验证码有误,请重新输入!'
                    })
                }else{
                    this.loading = true;
                    var opt = {
                        url:'user.php',
                        params:{
                            type:'register',
                            username:this.registMation.username,
                            password:this.registMation.password
                        }
                    }
                    http.post(opt).then((res)=>{
                        this.loading = false;
                        if(res.data === 'ok'){
                            this.$router.push({name:'login'});
                        }
                    })
                }
            }
        }
    }
</script>