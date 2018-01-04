<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    $type = isset($_POST['type']) ? $_POST['type'] : ''; //操作类型:query, insert, delete, update
    
    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $address = isset($_POST['address']) ? $_POST['address'] : '';
    $status = isset($_POST['status']) ? $_POST['status'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $nickname = isset($_POST['nickname']) ? $_POST['nickname'] : '';

    switch($type){
        case "insert":
        $sql = "INSERT INTO useraddress (username,status,phone,address,nickname)VALUES('$username','$status','$phone','$address','$nickname')";
        $result = excute_oop($sql);
        break;
        case "update":
        $sql = "UPDATE useraddress SET phone='$phone', address='$address', nickname='$nickname' WHERE id='$id' AND username='$username'";
        $result = excute_oop($sql);
        break;
        case "query":
        $sql = "SELECT * FROM useraddress WHERE id='$id' AND username='$username'";
        $result = query_oop($sql);
        break;
        case "delete":
        $sql ="DELETE FROM useraddress WHERE id='$id' AND username='$username'";
        $result = excute_oop($sql);
        break;
    }

    echo json_encode($result, JSON_UNESCAPED_UNICODE);




?>