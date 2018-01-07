<?php
    include './DBHelper.php';

    $type = isset($_POST["type"]) ? $_POST["type"] : "";
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $password = isset($_POST["password"]) ? $_POST["password"] : "";
    
    if($type == "register"){
        if($password){
            // 加密;
            $password = md5($password);
            $sql = "insert into users (username,password)values('$username','$password')";
             $result = excute($sql);
            if($result==1){
                echo 'ok';
            }else{
                echo 'fail';
            }
        }else{
            $sql = "select * from users where username='$username'";
            $result = query($sql);
            if(count($result)>0){
                echo 'fail';
            }else{
                echo 'ok';
            }
        }
    }else if($type == "login"){
        $password = md5($password);
        $sql = "select * from users where username='$username' and password='$password'";
        $result = query($sql);
        if(count($result)>0){
            echo 'ok';
        }else{
            echo 'fail';
        }
    }
 
?>