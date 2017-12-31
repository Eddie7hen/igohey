<?php
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*');
    $type = isset($_POST["type"]) ? $_POST["type"] : "";
    $status = isset($_POST["status"]) ? $_POST["status"] : "";//1:已支付,2:未支付,3:退货
    $orderno = isset($_POST["orderno"]) ? $_POST["orderno"] : "";
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $goodsid = isset($_POST["goodsid"]) ? $_POST["goodsid"] : "";

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
        $array = explode(',',$goodsid);
        $sql = "";
        for($i = 0;$i < count($array);$i++){
            $sql.= "insert into orders (username,status,orderno,goodsid)values('$username','$status','$orderno','$array[$i]');";
        }
        $result = multi_query_oop($sql);
        if($result){
            echo "ok";
        }else{
            // 输出失败;
            echo "Error: " .$sql ."<br>" .$cont->error; 
        }
    }

?>