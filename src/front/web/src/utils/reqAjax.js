/* 
* @Author: Marte
* @Date:   2017-12-07 17:33:59
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-17 17:59:26
*/
import axios from 'axios';
import qs from 'qs';
var baseUrl = 'http://localhost:1993/';
var fliterUrl = function(url){
    if(url.startsWith('http')){
        return url;
    }
    return baseUrl + url;
}
export default {
    get:(opt)=>{
        return  new Promise((resolve,reject)=>{
                    if(opt.ve){
                        opt.ve['loading'] = true;
                    }
                    axios.get(fliterUrl(opt.url)).then((response)=>{
                        if(opt.ve){
                            opt.ve['loading'] = false;
                        }
                        resolve(response);
                    }).catch((error)=>{
                        if(opt.ve){
                            opt.ve['loading'] = false;
                        }
                        reject(error);
                    })
                })
    },
    post:(opt)=>{
        return new Promise((reslove,reject)=>{
                 axios({
                    url:fliterUrl(opt.url),
                    data: qs.stringify(opt.parmas),
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((response) => {
                       reslove(response);
                    })
                    .catch((error) => {
                       reject(error);
                    }
                );
   
        })
    }
}
