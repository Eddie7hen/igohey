<template>
    <div id="setting">
        <header id="w_header">
            <i class="iconfont icon-return" @click="goBack"></i>
            <h1>个人设置</h1>
        </header>
        <main id="w_main">
            <div class="myCont">
                <div class="userImg">
                    <span>头像</span>
                    <div @click="changeHead">
                        <img :src="userhead" alt="头像" title="头像" />
                        <i class="iconfont icon-enter"></i>
                    </div>
                </div>
                <div>
                    <span class="nickName">昵称</span>
                    <div>
                        <span v-text="this.$store.state.setting.userData.username"></span>
                    </div>
                </div>
                <div>
                    <span>性别</span>
                    <div>
                        <span @click="show = !show;save=true" >{{this.$store.state.setting.userData.male ? this.$store.state.setting.userData.male : this.male}}</span>
                        <i class="iconfont icon-enter"></i>
                    </div>
                </div>
                <div>
                    <span>年龄</span>
                    <div>
                        <el-date-picker v-if="this.$store.state.setting.userData.birthday || !showData ?  false : true"
                        v-model="dataVal"
                        type="date"
                        placeholder="选择日期" 
                        class="dataChange">
                        </el-date-picker>
                        <span>{{this.$store.state.setting.userData.birthday || dataVals}}</span>                  
                    </div>
                </div>
            </div>
            <div class="myVip">
                <p>
                    <span>会员等级</span>
                    <em>V{{parseInt(this.$store.state.setting.userData.integral/1000) || 0}}会员</em>
                </p>
                <p>
                    <span>会员积分</span>
                    <em>{{this.$store.state.setting.userData.integral || 0}}积分</em>
                </p>
            </div>
        </main>
        <footer id="w_footer">
            <p v-if="save" @click="saveData">保存当前修改</p>
            <p v-else @click="loginOut">退出当前帐号</p>
        </footer>
        <div class="maleArea"  v-show="show">
            <div :class="{maleCont: show}">
                <div class="transition-box" @click="changeMale($event)">男</div>
                <div class="transition-box" @click="changeMale($event)">女</div>
                <div class="transition-box" @click="show = !show">取消</div>
            </div>
        </div>
        <DialogComponent></DialogComponent>
    </div>
</template>

<script>
    import './setting.scss';
    import wx from 'weixin-js-sdk';
    import axios from 'axios';
    import qs from 'qs';
    import DialogComponent from '../dialogComponent/dialogComponent';
    export default {
        data(){
            return{
                userhead:'./src/assets/userhead/defultHead.jpg',
                save:false,
                show:false,
                dataShow:true,
                male:'请选择',
                showData:true,
                dataVal:'',
                username:''
            }
        },
        components:{
            DialogComponent
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            changeMale(ev){
                this.male = event.target.innerText;
                this.show = !this.show;
            },
            changeHead(){
                axios.get('http://www.igohey.com/index/sample.php').then((res) => {
                    wx.config({debug: true,
                                appId: res[0],
                                timestamp: res[1],
                                nonceStr: res[2],
                                signature: res[3],
                                jsApiList:['chooseImage']
                    })
                    wx.ready(()=>{
                        wx.chooseImage({
                            count: 1, // 默认9
                            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                            success: function (res) {
                            this.userhead = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                }
                        });        
                    })
                })
            },
            saveData(){
                let params = {
                    username:this.username,
                    type:'upd'
                };
                if(this.dataVal != ""){
                     params.birthday = this.dataVals;
                }
                if(this.male.length == 1){
                    params.male = this.male;
                }
                let sendData = {
                    url:'useData.php',
                    params
                }
                this.save = false;
                this.$store.dispatch('saveData',sendData);
            },
            loginOut(){
                window.sessionStorage.clear();
                this.$store.dispatch('pageInit');
                this.$router.push({
                    name:'index'
                })
            }
        },
        computed:{
            dataVals(){
                var timer = new Date(this.dataVal);  
                var getYears = timer.getFullYear() + '-' + (timer.getMonth() + 1) + '-' + timer.getDate();
                if(this.dataVal!=""){
                    this.save = true;
                    this.dataShow = false;
                    return getYears;
                }
            }
        },
        updated(){
            if(this.dataVal != ''){
                this.showData = false;
            }
        },
        mounted(){
            if(window.sessionStorage.getItem('username')){
                this.username = window.sessionStorage.getItem('username');
            }
            
        }
    }
</script>
