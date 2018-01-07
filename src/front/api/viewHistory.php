<?php
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*');
    $type = isset($_POST["type"]) ? $_POST["type"] : "";
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $goodsid = isset($_POST["goodsid"]) ? $_POST["goodsid"] : "";
    if($type=="get" && $goodsid){
        $sql = "select * from viewhistory where goodsid='$goodsid' and username='$username'";
        $result = query($sql);
        if(count($result)>0){
            echo "has";
        }else{
            $sql = "insert into viewhistory (username,goodsid)values('$username','$goodsid');";
            $result = excute($sql);
            echo $result;
        }
    }else if($type=="del" && $goodsid){
        $sql = "delete from viewhistory where username='$username' and goodsid='$goodsid';";
        $result = excute($sql);
        if($result==1){
            echo 'ok';
        }else{
            echo 'fail';
        }
    }else{
        $sql = "select * from viewhistory join goods on viewhistory.goodsid=goods.id where username='$username' order by viewhistory.addtime desc";
        $result = query($sql);
        if(count($result) > 0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'nothing';
        }
    }

?>