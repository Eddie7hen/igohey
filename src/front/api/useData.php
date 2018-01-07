<?php
    include './DBHelper.php';
    header('Access-Control-Allow-Origin:*');
    $type = isset($_POST["type"]) ? $_POST["type"] : "";
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $nickname = isset($_POST["nickname"]) ? $_POST["nickname"] : "";
    $birthday = isset($_POST["birthday"]) ? $_POST["birthday"] : "";
    $male = isset($_POST["male"]) ? $_POST["male"] : "";

    if($type == "get"){
        $sql = "select * from users where username='$username'";
        $result = query($sql);
        if(count($result) > 0){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo "fail";
        }
    }else if($type == "upd"){
        $sql = "update users set username='$username'";
        if($nickname){
            $sql.=",nickname='$nickname'";
        }
        if($birthday){
            $sql.=",birthday='$birthday'";
        }
        if($male){
            $sql.=",male='$male'";
        }
        $res = excute_oop($sql);
        if($res=="1"){
            echo 'ok';
        }else{
            echo 'fail';
        }
    }
    
?>