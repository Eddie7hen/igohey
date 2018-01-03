<?php
     header('Access-Control-Allow-Origin:*');
     
     include "DBHelper.php";

     $type = isset($_POST['type']) ? $_POST['type'] : ''; //操作类型query,add,update,delete

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
     }

    echo json_encode($result, JSON_UNESCAPED_UNICODE);


?>