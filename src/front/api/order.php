<?php
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*');
    $type = isset($_POST["type"]) ? $_POST["type"] : "";
<<<<<<< HEAD
    $status = isset($_POST["status"]) ? $_POST["status"] : "";  
=======
    $status = isset($_POST["status"]) ? $_POST["status"] : "";//1:已支付,2:未支付,3:退货
>>>>>>> a4c5a5ee7fcc303c5d2178dd437e063f341898d1
    $orderno = isset($_POST["orderno"]) ? $_POST["orderno"] : "";
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    
    $params = isset($_POST["dataset"]) ? $_POST["dataset"] : "";
    if($type=="get"){
        $sql = "select * from goods join orders on orders.goodsid=goods.id where username='$username'";
        if($status){
            $sql.=" and status='$status'";
        }
        $result = query($sql);
        if(count($result) > 0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo "fail";
        }
    }else if($type=="del" && $orderno){
        $sql = "delete from orders where orderno='$orderno'";
        $result = excute($sql);
        echo $result;
    }else if($type=="add"){
        $sql = "";
<<<<<<< HEAD
        for($i = 0;$i < count($params);$i++){
            $sql .= "insert into orders "
=======
        for($i = 0;$i < count($array);$i++){
            $sql.= "insert into orders (username,status,orderno,goodsid)values('$username','$status','$orderno','$array[$i]');";
        }
        $result = multi_query_oop($sql);
        if($result){
            echo "ok";
        }else{
            // 输出失败;
            echo "Error: " .$sql ."<br>" .$cont->error; 
>>>>>>> a4c5a5ee7fcc303c5d2178dd437e063f341898d1
        }
    }

?>