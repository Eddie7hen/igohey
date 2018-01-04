<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";  

    $active = isset($_POST['active']) ? $_POST['active'] : ''; 
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $goodsid = isset($_POST['goodsid']) ? $_POST['goodsid'] : '';
    $goodsqty = isset($_POST['goodsqty']) ? $_POST['goodsqty'] : 1;

    if($type == 'join'){
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

    }else{
        if($active == '超值力荐'){
            $sql = "select * from active where active = '$active';select * from goods order by addtime desc limit 0,14";
        }else if($active == '限时折扣'){
            $sql = "select * from active where active = '$active';select * from goods where saleprice > 0 order by addtime asc limit 0,14";
        }else if($active == '热卖专场'){
            $sql = "select * from active where active = '$active';select * from goods where saleqty order by saleqty desc limit 0,14";
        }

        $sql .= ";select * from carts where username = '$username'";

        $result = multi_query_oop($sql);
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }

?>