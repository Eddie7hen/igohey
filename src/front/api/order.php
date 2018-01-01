<?php
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*');
    $type = isset($_POST["type"]) ? $_POST["type"] : "";
    $status = isset($_POST["status"]) ? $_POST["status"] : "";  
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
    }

?>