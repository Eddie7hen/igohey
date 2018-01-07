import http from './utils/requestAjax.js';
import wx from 'weixin-js-sdk'

export default{
    http.get({url:'http://www.igohey.com/index/sample.php'}).then(res=>{
        console.log(res)
        wx.config({
        debug: true,
        appId: res.data[0],
        timestamp:res.data[1],
        nonceStr: res.data[2],
        signature: res.data[3],
        jsApiList: [
            "menuItem:share:timeline",
            "menuItem:share:weiboApp",
            "menuItem:share:appMessage",
            "menuItem:share:qq",
            "chooseImage",
            "previewImage",
            "uploadImage"

        ]
      });
    })
}