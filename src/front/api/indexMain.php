<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    // 获取前端传递的参数
    $pageNo = isset($_POST['pageNo']) ? $_POST['pageNo'] : 1;
    $qty = isset($_POST['qty']) ? $_POST['qty'] : 3;//10
    $type = isset($_POST['type']) ? $_POST['type'] : null;
    $addtime = isset($_POST['addtime']) ? $_POST['addtime'] : null;
    $saleqty = isset($_POST['saleqty']) ? $_POST['saleqty'] : null;

    $start = ($pageNo-1)*$qty;
    if($type == 'new'){
        $sql = "select * from goods where addtime < '$addtime' order by addtime desc limit ".$start.",".$qty;
        
        $result = query($sql);
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }else if($type == 'discount'){
        $sql = "select * from goods where addtime < '$addtime' order by addtime asc limit ".$start.",".$qty;

        $result = query($sql);
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }else if($type == 'hot'){
        $sql = "select * from goods where saleqty order by saleqty desc limit ".$start.",".$qty;

        $result = query($sql);
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }
?>