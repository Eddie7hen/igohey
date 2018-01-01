<?php
    header('Access-Control-Allow-Origin:*');
    
    include "DBHelper.php";

    $type = isset($_POST['type']) ? $_POST['type'] : '';//生成订单的标识符
    $status = isset($_POST['status']) ? $_POST['status'] : '2';//1:已支付,2:未支付,3:退货
    $orderno = isset($_POST['orderno']) ? $_POST['orderno'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $dataset = isset($_POST['dataset']) ? $_POST['dataset'] : '';
    

    switch($type){
        case 'create':
        $dataset = json_decode($dataset);
        $sql = '';
        for($i = 0; $i < count($dataset); $i++){
            $goodsid = $dataset[$i]->goodsid;
            $qty = $dataset[$i]->qty;
            $sql.= "insert into orders (username,status,orderno,goodsid,qty)values('$username','$status','$orderno','$goodsid','$qty');";            
        }
        $result = multi_excute_oop($sql);
        if($result){
            $result = true;
        }else{
            $result = "Error: " .$sql ."<br>" .$cont->error;  
        }
        break;
    }

    echo $result;

?>