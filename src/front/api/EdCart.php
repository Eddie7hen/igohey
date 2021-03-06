<?php
    header('Access-Control-Allow-Origin:*');
    
    include "DBHelper.php";

    $status = isset($_POST['status']) ? $_POST['status'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $goodsid = isset($_POST['goodsid']) ? $_POST['goodsid'] : '';
    $goodsqty = isset($_POST['goodsqty']) ? $_POST['goodsqty'] : '';

    switch($status){
        case 'query':
        $sql = "SELECT * FROM carts AS c INNER JOIN goods AS gds on gds.id = c.goodsid WHERE c.username ='$username'";
        $result = query($sql);
        break;
        case 'update':
        $sql = "UPDATE carts AS c SET c.goodsqty='$goodsqty' WHERE c.username='$username' AND c.goodsid='$goodsid'";
        $result = excute_oop($sql);
        break;
        case 'delete':
        $array = explode(',', $goodsid);
        $sql = "";
        for($i=0; $i<count($array); $i++){
            $sql .= "DELETE FROM carts WHERE username='$username' AND goodsid='$array[$i]'".';';
        }
        $result = multi_excute_oop($sql);
        break;
    }

    $sql = "SELECT * FROM carts AS c INNER JOIN goods AS gds on gds.id = c.goodsid WHERE c.username ='$username'";
    $result = query($sql);
    

    echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>