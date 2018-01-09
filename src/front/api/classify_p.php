<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $sortType = isset($_POST['sortType']) ? $_POST['sortType'] : '';
    $season = isset($_POST['season']) ? $_POST['season'] : '';
    $addtime = isset($_POST['addtime']) ? $_POST['addtime'] : '';

    if($type == 'hot'){
        $sql = "select * from goods where saleqty > 5000 order by";
    }else if($type == 'discount'){
        $sql = "select * from goods where saleprice > 0 order by";
    }else if($type == 'new'){
        if($sortType >=0){
            $sql = "select * from goods order by";
        }else{
            $sql = "select * from goods order by addtime";
        }
    }else if($type == 'entrance'){
        $sql = "select * from goods where area != '中国' order by";
    }else if($type == 'domestic'){
        $sql = "select * from goods where area = '中国' order by";
    }else if($type == 'tropic'){
        $sql = "select * from goods where area = '中国' order by";
    }else if($type == 'seasonal'){
        if($season == 1){
            $sql = "select * from goods where season = '春季' order by";
        }else if($season == 2){
            $sql = "select * from goods where season = '夏季' order by";
        }else if($season == 3){
            $sql = "select * from goods where season = '秋季' order by";
        }else if($season == 4){
            $sql = "select * from goods where season = '冬季' order by";
        }

    }


    if($sortType == 'synthesize'){
        $sql .= " id desc";
    }else if($sortType == 'sales'){
        $sql .= " saleqty desc";
    }else if($sortType == '1'){
        $sql .= " price desc";
    }else if($sortType == '0'){
        $sql .= " price asc";
    }
    if($type == 'new'){
        $sql .= " limit 0,20";
    }

    $result = query($sql);
    echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>