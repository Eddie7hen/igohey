<?php
/**
 * @Author: Marte
 * @Date:   2017-12-17 14:06:19
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-12-17 14:18:24
 */
    header('Access-Control-Allow-Origin:*');
    $Urlcnt = file_get_contents("http://2017.ip138.com/ic.asp");
    $Urlcnt = iconv("gb2312","utf-8",$Urlcnt);
    // 通过正则,获取一个ip;
    preg_match("/\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]/",$Urlcnt,$res);
    // 输入ip;
    echo $res[1]; 
?>