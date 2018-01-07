<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $goodsid = isset($_POST['goodsid']) ? $_POST['goodsid'] : '';
    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $goodsqty = isset($_POST['goodsqty']) ? $_POST['goodsqty'] : '';

    if($type){

        if($type == 'del'){
            $sql1 = "delete from collect where goodsid='$goodsid' and username='$username'";
            $result1 = excute($sql1);
            if($result1){
                echo 'ok';
            }else {
                echo 'no';
            }
        }else if($type == 'inc'){
            $sql2 = "insert into collect (username,goodsId) values ('$username','$goodsid')";
            $result2 = excute($sql2);
            if($result2){
                echo 'ok';
            }else {
                echo 'no';
            }
        }else if($type == 'cartChange'){
            if($goodsqty >0){
                //加入购物车
                $sql3 = "select * from carts where goodsid='$goodsid' and username='$username'";
                $result3 = query($sql3);        
                if($result3){
                    //同种商品只添加数量
                    $sql4 = "update carts set goodsqty='$goodsqty' where goodsid='$goodsid' and username='$username'";
                    $result4 = excute($sql4);
                }else{
                    //不同种商品添加
                    $sql5 = "insert into carts (username,goodsid,goodsQty) values ('$username','$goodsid','$goodsqty')";
                    $result5 = excute($sql5);
                }
            }else if($goodsqty <=0){
                $sql6 = "delete from carts where goodsid='$goodsid' and username='$username'";
                $result6 = excute($sql6);
            }
            
        }
    }else{
        $sql = "select * from goods where id = '$goodsid';select * from collect where goodsId='$goodsid' and username='$username';select * from carts where goodsid='$goodsid' and username='$username'";

        $result = multi_query_oop($sql);
        // var_dump($result);
        
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
        
    }



?>