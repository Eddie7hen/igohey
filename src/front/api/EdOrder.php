<?php
    header('Access-Control-Allow-Origin:*');
    
    include "DBHelper.php";

    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $status = isset($_POST['status']) ? $_POST['status'] : '2';//1:已支付,2:未支付,3:退货
    $orderno = isset($_POST['orderno']) ? $_POST['orderno'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $goodsid = isset($_POST['goodsid']) ?    $_POST['goodsid'] : '';

    switch($type){
        case 'add':
        $array = explode(',', $goodsid);
        $sql = '';
        for($i = 0; $i < count($array); $i++){
            $sql.= "insert into orders (username,status,orderno,goodsid)values('$username','$status','$orderno','$array[$i]');";            
        }
        $result = multi_query_oop($sql);
        if($result){
            echo "ok";
        }else{
           // 输出失败;
           echo "Error: " .$sql ."<br>" .$cont->error;  
        }
        break;
    }

?>