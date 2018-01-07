<?php
     header('Access-Control-Allow-Origin:*');
     
     include "DBHelper.php";

     $type = isset($_POST['type']) ? $_POST['type'] : ''; //操作类型query,add,update,delete defaultAdres(获取默认地址)

     $id = isset($_POST['id']) ? $_POST['id'] : '';
     $username = isset($_POST['username']) ? $_POST['username'] : '';
     $address = isset($_POST['address']) ? $_POST['address'] : '';
     $status = isset($_POST['status']) ? $_POST['status'] : '';//1:表示默认地址,0:表示未默认
     $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
     $nickname = isset($_POST['nickname']) ? $_POST['nickname'] : '';

     switch($type){
        case 'query':
        $sql = "SELECT * FROM useraddress AS uad WHERE uad.username = '$username'";
        $result = query_oop($sql);
        break;
        case 'update':
        $sqlAll = "UPDATE useraddress SET status='0' WHERE username='$username'";
        $sql = "UPDATE useraddress SET status='$status' WHERE username='$username' AND id='$id'";
        $res = excute_oop($sqlAll);
        if($res){
            $result = excute_oop($sql);
        }
        break;
        case 'defaultAdres':
        $sql = "SELECT * FROM useraddress WHERE username='$username' AND status='1'";
        $result = query_oop($sql);
        break;
     }

    echo json_encode($result, JSON_UNESCAPED_UNICODE);


?>