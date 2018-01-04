<?php
    include './DBHelper.php';
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $goodsid = isset($_POST["goodsid"]) ? $_POST["goodsid"] : "";
    if($goodsid){
        $sql = "select * from viewhistory where goodsid='$goodsid' and username='$username'";
        $result = query($sql);
        if(count($result)>0){
            echo "has";
        }else{
            $sql = "insert into viewhistory (username,goodsid)values('$username','$goodsid');";
            $result = excute($sql);
            echo $result;
        }
    }else{
        $sql = "select * from viewhistory where username='$username'";
        $result = query($sql);
        if(count($result) > 0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'nothing';
        }
    }

?>