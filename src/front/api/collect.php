<?php
    include './DBHelper.php';
    /*
        url:http://10.3.135.254:1717/collect.php;
        method:post;
        参数:username:'',goodsid:'',type:"true",
        如果goodsid已经添加过, 返回has,没有则返回hasn't;
        添加成功返回ok;
        添加失败返回fail;
    */
    $type = isset($_POST["type"]) ? $_POST["type"] : "";
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $goodsid = isset($_POST["goodsid"]) ? $_POST["goodsid"] : "";
    $sql = "select * from collect where username='$username'";
    if($type){
        $sql .= " and goodsid='$goodsid';";
        $result = query($sql);
        if(count($result)>0){
            echo "has";
        }else{
            echo "hasn't";
        }
    }else if($goodsid){
        $sql = "insert into collect (username,goodsid)values('$username','$goodsid');";
        $result = excute($sql);
        if($result == 1){
            echo "ok";
        }else{
            echo "fail";
        }
    }else{
        $sql= "select * from collect join goods on goods.id=collect.goodsid where username='$username' order by collect.addtime desc";
        $result = query($sql);
        if(count($result)>0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo "fail";
        }
    }

?>