/* 
* @Author: Marte
* @Date:   2017-12-07 17:33:59
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-08 15:20:01
*/
import axios from 'axios';
import qs from 'qs';
// var baseUrl = 'http://112.74.61.111/index/api/';
var baseUrl = 'http://10.3.135.253:1993/'
var fliterUrl = function (url) {
    if (url.startsWith('http')) {
        return url;
    }
    return baseUrl + url;
}
export default {
    get: (opt) => {
        return new Promise((resolve, reject) => {
            axios.get(fliterUrl(opt.url), { params: opt.params }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    },
    post: (opt) => {
        return new Promise((reslove, reject) => {
            axios({
                url: fliterUrl(opt.url),
                data: qs.stringify(opt.params),
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                reslove(response);
            }).catch((error) => {
                reject(error);
            });
        })
    }
}
