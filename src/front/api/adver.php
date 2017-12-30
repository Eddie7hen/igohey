<?php
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*');
    $type = isset($_POST["type"]) ? $_POST["type"] : "";

    $sql = "select * from adver where ";
    if($type){
        $sql.="type='$type'";
    }
    $result = query($sql);
    if(count($result) > 0){
        echo json_encode($result,JSON_UNESCAPED_UNICODE);
    }else{
        echo "fail";
    }
?>