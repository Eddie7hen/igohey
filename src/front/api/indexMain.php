<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    // 获取前端传递的参数
    $pageNo = isset($_POST['pageNo']) ? $_POST['pageNo'] : 1;
    $qty = isset($_POST['qty']) ? $_POST['qty'] : 3;//10
    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $addtime = isset($_POST['addtime']) ? $_POST['addtime'] : '';
    $saleqty = isset($_POST['saleqty']) ? $_POST['saleqty'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $goodsqty = isset($_POST['goodsqty']) ? $_POST['goodsqty'] : 1;
    $goodsid = isset($_POST['goodsid']) ? $_POST['goodsid'] : '';

    $start = ($pageNo-1)*$qty;
    if($type == 'new'){
        $sql = "select * from goods where addtime < '$addtime' order by addtime desc limit ".$start.",".$qty;
        
        $result = query($sql);
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }else if($type == 'discount'){
        $sql = "select * from goods where saleprice > 0 order by addtime asc limit ".$start.",".$qty;

        $result = query($sql);
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }else if($type == 'hot'){
        $sql = "select * from goods where saleqty order by saleqty desc limit ".$start.",".$qty;

        $result = query($sql);
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }else if($type == 'join'){
         //加入购物车
        $sql3 = "select * from carts where goodsid='$goodsid' and username='$username'";
        $result3 = query($sql3);
        if(count($result3)>0){
            //同种商品只添加数量
            $gQty = $result3[0] -> goodsqty + $goodsqty;
            $sql4 = "update carts set goodsqty='$gQty' where goodsid='$goodsid' and username='$username'";
            $result4 = excute($sql4);
            if($result4){
                echo 'ok';
            }else{
               echo 'no';
            }
        }else{
            //不同种商品添加
            $sql5 = "insert into carts (username,goodsid,goodsqty) values ('$username','$goodsid','$goodsqty')";
            $result5 = excute($sql5);
            if($result5){
                echo 'ok';
            }else{
               echo 'no';
            }
        }
    }
?>